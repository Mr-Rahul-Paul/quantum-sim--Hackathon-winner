/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from 'next/link';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Define proper types for the data
interface Atom {
  element: string;
  x: number;
  y: number;
  z: number;
}

interface PredictionInput {
  num_atoms: string;
  num_electrons: string;
  num_qubits: string;
  basis_set_size: string;
  molecular_complexity: string;
}

interface PredictionResult {
  prediction: string;
  confidence?: number;
  features: Record<string, number | string>;
}

interface SimulationResults {
  status?: string;
  error?: string;
  source?: string;
  cached_at?: string;
  molecule_name?: string;
  qubit_count?: number;
  ansatz_type?: string;
  exact_energy?: number;
  vqe_energy?: number;
  molecule_image?: string;
  energy_plot?: string;
  elements?: string[];
  suggestion?: string;
}

export default function Home() {
  // Simulation states
  const [atoms, setAtoms] = useState<Atom[]>([
    { element: "H", x: 0.0, y: 0.0, z: 0.0 },
    { element: "O", x: 0.96, y: 0.0, z: 0.0 },
    { element: "H", x: -0.24, y: 0.93, z: 0.0 },
  ]);
  const [charge, setCharge] = useState(0);
  const [spin, setSpin] = useState(0);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prediction states
  const [predictionInput, setPredictionInput] = useState<PredictionInput>({
    num_atoms: "",
    num_electrons: "",
    num_qubits: "",
    basis_set_size: "",
    molecular_complexity: ""
  });
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [predLoading, setPredLoading] = useState(false);
  const [predError, setPredError] = useState<string | null>(null);

  // Simulation helper functions
  const handleAtomChange = (index: number, field: keyof Atom, value: string) => {
    const newAtoms = [...atoms];
    if (field === "element") {
      newAtoms[index][field] = value;
    } else {
      newAtoms[index][field] = parseFloat(value) || 0;
    }
    setAtoms(newAtoms);
  };

  const addAtom = () => {
    setAtoms([...atoms, { element: "H", x: 1.0, y: 1.0, z: 1.0 }]);
  };

  const removeAtom = (index: number) => {
    if (atoms.length > 1) {
      setAtoms(atoms.filter((_, i) => i !== index));
    }
  };

  const handleSimulate = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      // To this
      const res = await fetch(`${API_URL}/simulate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ atoms, charge, spin }),
      });
      const data: SimulationResults = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  // Prediction helper functions
  const handlePredict = async () => {
    setPredLoading(true);
    setPredError(null);
    setPrediction(null);

    try {
      // To this
      const res = await fetch(`${API_URL}/predict/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          num_atoms: parseInt(predictionInput.num_atoms),
          num_electrons: parseInt(predictionInput.num_electrons),
          num_qubits: parseInt(predictionInput.num_qubits),
          basis_set_size: parseInt(predictionInput.basis_set_size),
          molecular_complexity: parseFloat(predictionInput.molecular_complexity)
        }),
      });

      const data = await res.json();
      if (data.error) {
        setPredError(data.error);
      } else {
        setPrediction(data);
      }
    } catch (err) {
      setPredError("Server connection failed");
      console.error(err);
    } finally {
      setPredLoading(false);
    }
  };

  const handlePredictionInputChange = (field: keyof PredictionInput, value: string) => {
    setPredictionInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="z-10 max-w-6xl w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
          Quantum Chemistry Lab
        </h1>
        <p className="text-2xl md:text-lg mb-10 max-w-3xl text-foreground/80 border-l-4 border-orange-500/50 pl-4">
          Simulate molecular properties and predict classical/quantum behavior
        </p>

        {/* Simulation Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500 flex items-center">
            <span className="mr-2">🧪</span> Molecular Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/70">
                Total Charge
              </label>
              <input
                type="number"
                className="w-full bg-background text-foreground p-2 rounded-lg border border-orange-500/30 focus:ring-2 focus:ring-orange-500"
                value={charge}
                onChange={(e) => setCharge(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/70">
                Spin Multiplicity
              </label>
              <input
                type="number"
                className="w-full bg-background text-foreground p-2 rounded-lg border border-orange-500/30 focus:ring-2 focus:ring-orange-500"
                value={spin}
                onChange={(e) => setSpin(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/70">Molecule Structure</label>
              <button
                onClick={addAtom}
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg transition flex items-center justify-center"
              >
                <span className="mr-2">+</span> Add Atom
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium text-orange-500">Atoms</h3>
            {atoms.map((atom, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-3 items-center bg-background p-3 rounded-lg border border-orange-500/20"
              >
                <div className="col-span-2">
                  <input
                    type="text"
                    className="w-full bg-background text-foreground p-2 rounded border border-orange-500/30"
                    value={atom.element}
                    onChange={(e) =>
                      handleAtomChange(index, "element", e.target.value)
                    }
                    placeholder="Element"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-background text-foreground p-2 rounded border border-orange-500/30"
                    value={atom.x}
                    onChange={(e) =>
                      handleAtomChange(index, "x", e.target.value)
                    }
                    placeholder="X (Å)"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-background text-foreground p-2 rounded border border-orange-500/30"
                    value={atom.y}
                    onChange={(e) =>
                      handleAtomChange(index, "y", e.target.value)
                    }
                    placeholder="Y (Å)"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-background text-foreground p-2 rounded border border-orange-500/30"
                    value={atom.z}
                    onChange={(e) =>
                      handleAtomChange(index, "z", e.target.value)
                    }
                    placeholder="Z (Å)"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <button
                    onClick={() => removeAtom(index)}
                    className="w-full bg-red-600 text-white py-2 px-3 rounded transition"
                    disabled={atoms.length <= 1}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSimulate}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl font-medium transition ${loading
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-500 shadow-lg"
              } flex items-center justify-center`}
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">🌀</span>
                Simulating...
              </>
            ) : (
              <>
                <span className="mr-2">⚛</span>
                Run Quantum Simulation
              </>
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-rose-950/20 text-foreground border border-rose-500/30 shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-rose-500 flex items-center">
              <span className="mr-2">⚠</span> Error
            </h3>
            <p className="text-foreground/80">{error}</p>
            {results?.suggestion && (
              <p className="mt-2 text-foreground/80">{results.suggestion}</p>
            )}
          </div>
        )}

        {/* Results Display */}
        {results?.status === "success" && (
          <div className="space-y-6">
            {results.source === "cache" && (
              <div className="rounded-lg p-3 mb-8 transition-all duration-300 bg-amber-950/20 text-foreground border border-amber-500/30 text-center shadow-sm">
                ⏳ These results were loaded from cache ({results.cached_at ? new Date(results.cached_at).toLocaleString() : ''})
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-orange-500 flex items-center">
                  <span className="mr-2">📊</span> Simulation Results
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-foreground/20">
                    <span className="text-foreground/70">Molecule:</span>
                    <span className="font-mono text-foreground">{results.molecule_name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-foreground/20">
                    <span className="text-foreground/70">Qubits Required:</span>
                    <span className="font-mono text-foreground">{results.qubit_count}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-foreground/20">
                    <span className="text-foreground/70">Method Used:</span>
                    <span className="font-mono text-orange-500">{results.ansatz_type}</span>
                  </div>

                  <div className="pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Exact Energy:</span>
                      <span className="font-mono text-blue-500">
                        {results.exact_energy?.toFixed(6)} Hartree
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">VQE Energy:</span>
                      <span className="font-mono text-green-500">
                        {results.vqe_energy?.toFixed(6)} Hartree
                      </span>
                    </div>
                    {results.exact_energy !== undefined && results.vqe_energy !== undefined && (
                      <div className="flex justify-between pt-2 border-t border-foreground/20 font-medium">
                        <span className="text-foreground/70">Difference:</span>
                        <span className="font-mono text-amber-500">
                          {Math.abs(results.exact_energy - results.vqe_energy).toFixed(6)} Hartree
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-orange-500 flex items-center">
                  <span className="mr-2">🔬</span> Molecular Structure
                </h2>
                {results.molecule_image ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={`data:image/png;base64,${results.molecule_image}`}
                      alt={results.molecule_name || "Molecule structure"}
                      className="max-w-full h-64 object-contain border border-orange-500/20 rounded-lg bg-background"
                    />
                    <p className="mt-3 text-sm text-foreground/60">
                      Contains: {results.elements?.join(", ")}
                    </p>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-background rounded-lg border border-orange-500/20">
                    <p className="text-foreground/50">No visualization available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Energy Plot Section */}
            <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-orange-500 flex items-center">
                <span className="mr-2">📈</span> Energy Analysis
              </h2>
              {results.energy_plot ? (
                <div className="flex flex-col items-center">
                  <img
                    src={`data:image/png;base64,${results.energy_plot}`}
                    alt="Energy vs Bond Distance"
                    className="w-full h-96 object-contain border border-orange-500/20 rounded-lg bg-background p-4"
                  />
                  <p className="mt-3 text-sm text-foreground/60">
                    Energy comparison across different bond distances
                  </p>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center bg-background rounded-lg border border-orange-500/20">
                  <p className="text-foreground/50">Energy plot not available</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI Prediction Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500 flex items-center">
            <span className="mr-2">🤖</span> AI Prediction
          </h2>
          <p className="mb-4 text-foreground/80">
            Predict whether this molecule should be simulated classically or quantumly
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/70">
                Number of Atoms
              </label>
              <input
                type="number"
                className="w-full bg-background text-foreground p-2 rounded-lg border border-orange-500/30 focus:ring-2 focus:ring-orange-500"
                value={predictionInput.num_atoms}
                onChange={(e) => handlePredictionInputChange("num_atoms", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/70">
                Number of Electrons
              </label>
              <input
                type="number"
                className="w-full bg-background text-foreground p-2 rounded-lg border border-orange-500/30 focus:ring-2 focus:ring-orange-500"
                value={predictionInput.num_electrons}
                onChange={(e) => handlePredictionInputChange("num_electrons", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/70">
                Qubits Required
              </label>
              <input
                type="number"
                className="w-full bg-background text-foreground p-2 rounded-lg border border-orange-500/30 focus:ring-2 focus:ring-orange-500"
                value={predictionInput.num_qubits}
                onChange={(e) => handlePredictionInputChange("num_qubits", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/70">
                Basis Set Size
              </label>
              <input
                type="number"
                className="w-full bg-background text-foreground p-2 rounded-lg border border-orange-500/30 focus:ring-2 focus:ring-orange-500"
                value={predictionInput.basis_set_size}
                onChange={(e) => handlePredictionInputChange("basis_set_size", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/70">
                Molecular Complexity (1-10)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                className="w-full bg-background text-foreground p-2 rounded-lg border border-orange-500/30 focus:ring-2 focus:ring-orange-500"
                value={predictionInput.molecular_complexity}
                onChange={(e) => handlePredictionInputChange("molecular_complexity", e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={predLoading}
            className={`w-full py-3 px-4 rounded-xl font-medium transition ${predLoading
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-500 shadow-lg"
              } flex items-center justify-center`}
          >
            {predLoading ? (
              <>
                <span className="animate-spin mr-2">🌀</span>
                Predicting...
              </>
            ) : (
              <>
                <span className="mr-2">🔮</span>
                Run Prediction
              </>
            )}
          </button>

          {predError && (
            <div className="rounded-lg p-6 mt-4 transition-all duration-300 bg-rose-950/20 text-foreground border border-rose-500/30 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-rose-500 flex items-center">
                <span className="mr-2">⚠</span> Error
              </h3>
              <p className="text-foreground/80">{predError}</p>
            </div>
          )}

          {prediction && (
            <div className="mt-4 rounded-lg p-4 transition-all duration-300 bg-background text-foreground border border-orange-500/30 shadow-sm">
              <h3 className="font-bold text-orange-500 mb-2">Prediction Result</h3>
              <div className={`p-3 rounded-lg ${prediction.prediction === "Quantum"
                ? "bg-purple-900/20 border border-purple-500/30"
                : "bg-green-900/20 border border-green-500/30"
                }`}>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-foreground">
                    {prediction.prediction === "Quantum" ? "Quantum Recommended" : "Classical Recommended"}
                  </span>
                  <span className="text-sm bg-background px-2 py-1 rounded text-foreground/70">
                    {prediction.confidence && `Confidence: ${(prediction.confidence * 100).toFixed(1)}%`}
                  </span>
                </div>
                {prediction.prediction === "Quantum" ? (
                  <p className="mt-2 text-foreground/80">
                    This molecules complexity suggests quantum simulation would be more effective.
                  </p>
                ) : (
                  <p className="mt-2 text-foreground/80">
                    Classical methods should be sufficient for this molecule.
                  </p>
                )}
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-foreground/70 mb-2">Input Features:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(prediction.features).map(([key, value]) => (
                    <div key={key} className="flex justify-between bg-background/50 px-3 py-2 rounded border border-orange-500/10">
                      <span className="text-foreground/70">{key.replace(/_/g, ' ')}:</span>
                      <span className="font-mono text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-foreground/40 text-sm mt-8 justify-center text-center">
          • HackIIIT • Team - Bytes • <a className='underline hover:no-underline hover:font-bold' href='https://github.com/Qiskit/textbook/blob/main/notebooks/ch-applications/vqe-molecules.ipynb'>Click here to read research paper 📃</a>
        </div>
      </div>
    </main>
  );
}