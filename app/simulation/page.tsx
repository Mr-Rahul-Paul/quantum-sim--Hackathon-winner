"use client";

import { useState } from "react";

// Define proper types for the data
interface Atom {
  element: string;
  x: number;
  y: number;
  z: number;
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
  const [atoms, setAtoms] = useState<Atom[]>([
    { element: "H", x: 0.0, y: 0.0, z: 0.0 },
    { element: "O", x: 0.96, y: 0.0, z: 0.0 },
    { element: "H", x: -0.24, y: 0.93, z: 0.0 }
  ]);
  const [charge, setCharge] = useState(0);
  const [spin, setSpin] = useState(0);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAtomChange = (index: number, field: keyof Atom, value: string) => {
    const newAtoms = [...atoms];
    newAtoms[index][field] = field === 'element' 
      ? value 
      : parseFloat(value) || 0; // Provide fallback for NaN
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

    try {
      const res = await fetch("http://localhost:8000/simulate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ atoms, charge, spin }),
      });

      const data: SimulationResults = await res.json();
      if (data.error) setError(data.error);
      else setResults(data);
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black text-gray-100 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">Quantum Chemistry Lab</h1>
        <p className="text-gray-300">Simulate molecular properties with classical and quantum methods</p>
      </header>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-cyan-400/20 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-orange-400 flex items-center">
            <span className="mr-2">🧪</span> Molecular Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Total Charge</label>
              <input
                type="number"
                className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-orange-500"
                value={charge}
                onChange={(e) => setCharge(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Spin Multiplicity</label>
              <input
                type="number"
                className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-orange-500"
                value={spin}
                onChange={(e) => setSpin(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="md:col-span-2 flex items-end">
              <button
                onClick={addAtom}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded-lg transition flex items-center justify-center"
              >
                <span className="mr-2">+</span> Add Atom
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium text-orange-300">Atoms</h3>
            {atoms.map((atom, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-center bg-gray-750 p-3 rounded-lg">
                <div className="col-span-2">
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                    value={atom.element}
                    onChange={(e) => handleAtomChange(index, 'element', e.target.value)}
                    placeholder="Element"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                    value={atom.x}
                    onChange={(e) => handleAtomChange(index, 'x', e.target.value)}
                    placeholder="X (Å)"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                    value={atom.y}
                    onChange={(e) => handleAtomChange(index, 'y', e.target.value)}
                    placeholder="Y (Å)"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                    value={atom.z}
                    onChange={(e) => handleAtomChange(index, 'z', e.target.value)}
                    placeholder="Z (Å)"
                  />
                </div>
                <div className="col-span-2">
                  <button
                    onClick={() => removeAtom(index)}
                    className="w-full bg-rose-600 hover:bg-rose-500 text-white py-2 px-3 rounded transition"
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

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-xl p-4">
            <h3 className="font-bold text-red-300 flex items-center">
              <span className="mr-2">⚠</span> Error
            </h3>
            <p className="text-red-100">{error}</p>
            {results?.suggestion && (
              <p className="mt-2 text-red-200">{results.suggestion}</p>
            )}
          </div>
        )}

        {results?.status === "success" && (
          <div className="space-y-6">
            {results.source === "cache" && (
              <div className="bg-amber-900/50 border border-amber-700 rounded-xl p-3 text-center text-amber-100">
                ⏳ These results were loaded from cache ({results.cached_at ? new Date(results.cached_at).toLocaleString() : ''})
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-cyan-400/20">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-500 flex items-center">
                  <span className="mr-2">📊</span> Simulation Results
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-300">Molecule:</span>
                    <span className="font-mono text-white">{results.molecule_name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-300">Qubits Required:</span>
                    <span className="font-mono text-white">{results.qubit_count}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-300">Method Used:</span>
                    <span className="font-mono text-purple-300">{results.ansatz_type}</span>
                  </div>

                  <div className="pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Exact Energy:</span>
                      <span className="font-mono text-blue-300">
                        {results.exact_energy?.toFixed(6)} Hartree
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">VQE Energy:</span>
                      <span className="font-mono text-green-300">
                        {results.vqe_energy?.toFixed(6)} Hartree
                      </span>
                    </div>
                    {results.exact_energy !== undefined && results.vqe_energy !== undefined && (
                      <div className="flex justify-between pt-2 border-t border-gray-700 font-medium">
                        <span className="text-gray-300">Difference:</span>
                        <span className="font-mono text-amber-300">
                          {Math.abs(results.exact_energy - results.vqe_energy).toFixed(6)} Hartree
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-cyan-400/20">
                <h2 className="text-2xl font-semibold mb-4 text-orange-400 flex items-center">
                  <span className="mr-2">🔬</span> Molecular Structure
                </h2>
                {results.molecule_image ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={`data:image/png;base64,${results.molecule_image}`}
                      alt={results.molecule_name || "Molecule structure"}
                      className="max-w-full h-64 object-contain border border-gray-700 rounded-lg bg-black"
                    />
                    <p className="mt-3 text-sm text-gray-400">
                      Contains: {results.elements?.join(", ")}
                    </p>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-850 rounded-lg">
                    <p className="text-gray-500">No visualization available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Energy Plot Section */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-cyan-400/20">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-500 flex items-center">
                <span className="mr-2">📈</span> Energy Analysis
              </h2>
              {results.energy_plot ? (
                <div className="flex flex-col items-center">
                  <img
                    src={`data:image/png;base64,${results.energy_plot}`}
                    alt="Energy vs Bond Distance"
                    className="w-full h-96 object-contain border border-gray-700 rounded-lg bg-black p-4"
                  />
                  <p className="mt-3 text-sm text-gray-400">
                    Energy comparison across different bond distances
                  </p>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center bg-gray-850 rounded-lg">
                  <p className="text-gray-500">Energy plot not available</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Quantum Chemistry Simulator • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}