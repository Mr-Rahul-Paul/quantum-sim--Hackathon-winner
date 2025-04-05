from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import List, Optional, Union, Dict
import numpy as np
from qiskit.primitives import Estimator
from qiskit_algorithms.minimum_eigensolvers import NumPyMinimumEigensolver, VQE
from qiskit_algorithms.optimizers import COBYLA
from qiskit_nature.second_q.drivers import PySCFDriver
from qiskit_nature.second_q.mappers import ParityMapper
from qiskit_nature.units import DistanceUnit
from qiskit.circuit.library import EfficientSU2
from qiskit.quantum_info import Statevector
from qiskit import QuantumCircuit
from pymongo import MongoClient
from datetime import datetime
import os
from rdkit import Chem
from rdkit.Chem import Draw, rdDetermineBonds
from io import BytesIO
import base64
from qiskit_ibm_runtime import QiskitRuntimeService, Session, Options, Estimator as IBMQEstimator
from dotenv import load_dotenv
import warnings
from fastapi.middleware.cors import CORSMiddleware
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  # Set the backend to Agg for non-interactive plotting
from joblib import load
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(_name_)

# Suppress warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=UserWarning)

load_dotenv()

# Initialize services
MONGO_URI = os.getenv("MONGODB_ATLAS_URI")
client = MongoClient(MONGO_URI) if MONGO_URI else None
db = client["quantum-sim"] if client else None
results_collection = db["results"] if db else None

# Load ML model
MODEL_PATH = os.path.join(os.path.dirname(_file_), "quantum_classical_predictor.joblib")
try:
    model = load(MODEL_PATH)
    logger.info("Successfully loaded trained model")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    model = None

IBM_API_TOKEN = os.getenv("IBMQ_API_TOKEN")
ibm_service = None
if IBM_API_TOKEN:
    try:
        ibm_service = QiskitRuntimeService(channel="ibm_quantum", token=IBM_API_TOKEN)
        logger.info("Connected to IBM Quantum service")
    except Exception as e:
        logger.error(f"IBM Quantum connection error: {str(e)}")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class AtomCoord(BaseModel):
    element: str
    x: float = Field(0.0, ge=-100, le=100)
    y: float = Field(0.0, ge=-100, le=100)
    z: float = Field(0.0, ge=-100, le=100)

class MoleculeInput(BaseModel):
    atoms: List[AtomCoord]
    charge: int = Field(0, ge=-5, le=5)
    spin: int = Field(0, ge=0, le=10)
    use_quantum_hardware: bool = False
    basis_set: str = Field("sto3g", pattern=r"^[a-z0-9]+$")

class SimulationSuccess(BaseModel):
    molecule_name: str
    exact_energy: float
    vqe_energy: float
    ansatz_type: str
    status: str = "success"
    source: Optional[str] = None
    cached_at: Optional[str] = None
    molecule_image: Optional[str] = None
    energy_plot: Optional[str] = None
    backend: Optional[str] = None
    qubit_count: Optional[int] = None
    elements: Optional[List[str]] = None

class SimulationError(BaseModel):
    status: str = "failed"
    error: str
    suggestion: Optional[str] = None

class PredictionInput(BaseModel):
    num_atoms: int = Field(..., gt=0, description="Number of atoms in molecule")
    num_electrons: int = Field(..., gt=0, description="Number of electrons")
    num_qubits: int = Field(..., gt=0, description="Number of qubits required")
    basis_set_size: int = Field(..., gt=0, description="Size of basis set")
    molecular_complexity: float = Field(..., gt=0, le=10, description="Complexity score (1-10)")

class PredictionOutput(BaseModel):
    prediction: str
    confidence: float
    features: Dict[str, float]
    status: str = "success"

# Helper functions
def get_cache_key(data: MoleculeInput) -> str:
    atoms_str = ";".join(
        f"{atom.element}{atom.x:.4f}{atom.y:.4f}_{atom.z:.4f}"
        for atom in sorted(data.atoms, key=lambda x: x.element)
    )
    return f"{atoms_str}|{data.charge}|{data.spin}|{data.basis_set}|{data.use_quantum_hardware}"

def create_energy_plot(distances, exact_energies, vqe_energies) -> str:
    plt.figure(figsize=(10, 6))
    plt.plot(distances, exact_energies, 'b-', label='Exact Energy')
    plt.plot(distances, vqe_energies, 'r--', label='VQE Energy')
    plt.xlabel('Bond Distance (Å)')
    plt.ylabel('Energy (Hartree)')
    plt.title('Energy vs Bond Distance')
    plt.legend()
    plt.grid(True)
    
    buf = BytesIO()
    plt.savefig(buf, format='png', dpi=100)
    plt.close()
    buf.seek(0)
    return base64.b64encode(buf.read()).decode('utf-8')

def simulate_energy_curve(atoms, charge, spin, basis_set, use_quantum_hardware):
    distances = np.linspace(0.5, 2.0, 10)
    exact_energies = []
    vqe_energies = []
    
    for dist in distances:
        temp_atoms = [a.copy() for a in atoms]
        if len(temp_atoms) >= 2:
            temp_atoms[1].x = dist
            
        geometry = "; ".join(f"{a.element} {a.x} {a.y} {a.z}" for a in temp_atoms)
        driver = PySCFDriver(
            atom=geometry,
            unit=DistanceUnit.ANGSTROM,
            charge=charge,
            spin=spin,
            basis=basis_set
        )
        problem = driver.run()
        mapper = ParityMapper()
        qubit_op = mapper.map(problem.second_q_ops()[0])
        
        exact_energy = NumPyMinimumEigensolver().compute_minimum_eigenvalue(qubit_op).eigenvalue.real
        exact_energies.append(exact_energy)
        
        ansatz = EfficientSU2(qubit_op.num_qubits, reps=1, entanglement="linear")
        optimizer = COBYLA(maxiter=100)
        
        if use_quantum_hardware and ibm_service:
            with Session(ibm_service, "ibmq_qasm_simulator") as session:
                estimator = IBMQEstimator(session, Options(optimization_level=3))
                vqe = VQE(estimator, ansatz, optimizer)
                result = vqe.compute_minimum_eigenvalue(qubit_op)
        else:
            estimator = Estimator()
            vqe = VQE(estimator, ansatz, optimizer)
            result = vqe.compute_minimum_eigenvalue(qubit_op)
        
        vqe_energy = problem.interpret(result).total_energies[0].real
        vqe_energies.append(vqe_energy)
    
    return distances.tolist(), exact_energies, vqe_energies

def create_ansatz(num_qubits) -> QuantumCircuit:
    ansatz = EfficientSU2(
        num_qubits,
        reps=1,
        entanglement="linear",
        skip_final_rotation_layer=False
    )
    return ansatz

def generate_molecule_image(atoms: List[AtomCoord], charge: int) -> str:
    try:
        mol = Chem.RWMol()
        for atom in atoms:
            atom_obj = Chem.Atom(atom.element)
            if atom_obj.GetAtomicNum() == 0:
                atom_obj = Chem.Atom("C")
            mol.AddAtom(atom_obj)
            
        conf = Chem.Conformer(len(atoms))
        for i, atom in enumerate(atoms):
            conf.SetAtomPosition(i, (atom.x, atom.y, atom.z))
        mol.AddConformer(conf)
        
        try:
            rdDetermineBonds.DetermineBonds(mol, charge=charge)
        except Exception:
            if len(atoms) > 1:
                for i in range(len(atoms) - 1):
                    if not mol.GetBondBetweenAtoms(i, i + 1):
                        mol.AddBond(i, i + 1, Chem.BondType.SINGLE)
        
        img = Draw.MolToImage(mol, size=(400, 300))
        buffered = BytesIO()
        img.save(buffered, format="PNG")
        return base64.b64encode(buffered.getvalue()).decode()
    except Exception as e:
        logger.error(f"Molecule image error: {str(e)}")
        return ""

# Routes
@app.post("/simulate/", response_model=Union[SimulationSuccess, SimulationError])
async def simulate_molecule(data: MoleculeInput):
    cache_key = get_cache_key(data)
    
    try:
        if client and results_collection:
            cached = results_collection.find_one({"cache_key": cache_key})
            if cached and "result" in cached:
                cached_result = cached["result"]
                if cached_result.get("status") == "success":
                    cached_result["source"] = "cache"
                    cached_result["cached_at"] = cached["timestamp"].isoformat()
                    return SimulationSuccess(**cached_result)
                return SimulationError(**cached_result)
        
        elements = {a.element for a in data.atoms}
        molecule_name = "".join(f"{e}{sum(1 for a in data.atoms if a.element == e)}" for e in sorted(elements))
        
        geometry = "; ".join(f"{a.element} {a.x} {a.y} {a.z}" for a in data.atoms)
        driver = PySCFDriver(
            atom=geometry,
            unit=DistanceUnit.ANGSTROM,
            charge=data.charge,
            spin=data.spin,
            basis=data.basis_set
        )
        problem = driver.run()
        mapper = ParityMapper()
        qubit_op = mapper.map(problem.second_q_ops()[0])
        
        exact_energy = NumPyMinimumEigensolver().compute_minimum_eigenvalue(qubit_op).eigenvalue.real
        
        ansatz = EfficientSU2(qubit_op.num_qubits, reps=1, entanglement="linear")
        optimizer = COBYLA(maxiter=100)
        
        if data.use_quantum_hardware and ibm_service:
            backend = "ibmq_qasm_simulator"
            with Session(ibm_service, backend) as session:
                estimator = IBMQEstimator(session, Options(optimization_level=3))
                vqe = VQE(estimator, ansatz, optimizer)
                result = vqe.compute_minimum_eigenvalue(qubit_op)
                backend_name = "IBM Quantum"
        else:
            estimator = Estimator()
            vqe = VQE(estimator, ansatz, optimizer)
            result = vqe.compute_minimum_eigenvalue(qubit_op)
            backend_name = "Local Simulator"
        
        vqe_energy = problem.interpret(result).total_energies[0].real
        
        distances, exact_energies, vqe_energies = simulate_energy_curve(
            data.atoms, data.charge, data.spin, data.basis_set, data.use_quantum_hardware
        )
        energy_plot = create_energy_plot(distances, exact_energies, vqe_energies)
        
        molecule_image = generate_molecule_image(data.atoms, data.charge)
        
        result_data = SimulationSuccess(
            molecule_name=molecule_name,
            exact_energy=exact_energy,
            vqe_energy=vqe_energy,
            ansatz_type="EfficientSU2",
            backend=backend_name,
            qubit_count=qubit_op.num_qubits,
            elements=list(elements),
            molecule_image=molecule_image,
            energy_plot=energy_plot,
            source="computation"
        )
        
        if client and results_collection:
            results_collection.update_one(
                {"cache_key": cache_key},
                {"$set": {"result": result_data.dict(), "timestamp": datetime.utcnow()}},
                upsert=True
            )
        
        return result_data
    
    except Exception as e:
        error_message = f"{type(e)._name_}: {str(e)}"
        logger.error(f"Simulation error: {error_message}")
        
        error_data = SimulationError(
            error=error_message,
            suggestion="Try adjusting molecular geometry or using different basis set"
        )
        
        if client and results_collection:
            results_collection.update_one(
                {"cache_key": cache_key},
                {"$set": {"result": error_data.dict(), "timestamp": datetime.utcnow()}},
                upsert=True
            )
        
        return error_data

@app.post("/predict/", response_model=Union[PredictionOutput, SimulationError])
async def predict_behavior(data: PredictionInput):
    if not model:
        return SimulationError(
            error="Prediction model not available",
            suggestion="Please check if the model file exists and is properly loaded"
        )
    
    try:
        # Prepare features in correct order expected by the model
        features = [
            data.num_atoms,
            data.num_electrons,
            data.num_qubits,
            data.basis_set_size,
            data.molecular_complexity
        ]
        
        # Make prediction
        prediction = model.predict([features])[0]
        probabilities = model.predict_proba([features])[0]
        
        # Get confidence score
        confidence = round(float(max(probabilities)), 4)
        
        # Prepare feature dictionary for response
        feature_dict = {
            "num_atoms": data.num_atoms,
            "num_electrons": data.num_electrons,
            "num_qubits": data.num_qubits,
            "basis_set_size": data.basis_set_size,
            "molecular_complexity": data.molecular_complexity
        }
        
        return PredictionOutput(
            prediction="Quantum" if prediction == 1 else "Classical",
            confidence=confidence,
            features=feature_dict
        )
        
    except Exception as e:
        error_message = f"Prediction failed: {str(e)}"
        logger.error(error_message)
        return SimulationError(
            error=error_message,
            suggestion="Check your input values and try again"
        )

@app.get("/model/info")
async def get_model_info():
    if not model:
        return {"status": "error", "message": "Model not loaded"}
    
    try:
        model_info = {
            "model_type": str(type(model)._name_),
            "n_features": model.n_features_in_ if hasattr(model, 'n_features_in_') else "Unknown",
            "classes": list(model.classes_) if hasattr(model, 'classes_') else "Unknown",
            "status": "loaded"
        }
        return model_info
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/cache/stats")
async def get_cache_stats():
    if results_collection:
        return {"entries": results_collection.count_documents({})}
    return {"entries": 0}

@app.delete("/cache/clear")
async def clear_cache():
    if results_collection:
        results_collection.delete_many({})
    return {"status": "success"}

if _name_ == "_main_":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)