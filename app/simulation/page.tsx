/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from 'next/link';

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
    if (field === 'element') {
      newAtoms[index][field] = value as string;
    } else {
      newAtoms[index][field] = parseFloat(value) || 0 as number;
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
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="z-10 max-w-6xl w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
          Quantum Chemistry Lab
        </h1>
        <p className="text-2xl md:text-lg mb-10 max-w-3xl text-foreground/80 border-l-4 border-orange-500/50 pl-4">
          Simulate molecular properties with classical and quantum methods. Design molecules and analyze their energy characteristics.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-orange-500 flex items-center">
          <span className="mr-2">🧪</span> Molecular Configuration
        </h2>
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background text-foreground border border-orange-500/30 shadow-sm">


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/70">Total Charge</label>
              <input
                type="number"
                className="w-full bg-background text-foreground p-2 rounded-lg border border-orange-500/30 focus:ring-2 focus:ring-orange-500"
                value={charge}
                onChange={(e) => setCharge(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/70">Spin Multiplicity</label>
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
              <div key={index} className="grid grid-cols-12 gap-3 items-center bg-background p-3 rounded-lg border border-orange-500/20">
                <div className="col-span-2">
                  <input
                    type="text"
                    className="w-full bg-background text-foreground p-2 rounded border border-orange-500/30"
                    value={atom.element}
                    onChange={(e) => handleAtomChange(index, 'element', e.target.value)}
                    placeholder="Element"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-background text-foreground p-2 rounded border border-orange-500/30"
                    value={atom.x}
                    onChange={(e) => handleAtomChange(index, 'x', e.target.value)}
                    placeholder="X (Å)"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-background text-foreground p-2 rounded border border-orange-500/30"
                    value={atom.y}
                    onChange={(e) => handleAtomChange(index, 'y', e.target.value)}
                    placeholder="Y (Å)"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-background text-foreground p-2 rounded border border-orange-500/30"
                    value={atom.z}
                    onChange={(e) => handleAtomChange(index, 'z', e.target.value)}
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

        {/* Navigation back to previous pages */}
        <div className="mt-12 pt-6 border-t border-foreground/20">
          <div className="flex justify-between w-full">
            <Link href="/curated-list" className="text-foreground/60 hover:text-foreground transition-colors">
              &larr; Back to Curated List
            </Link>
            <Link href="/project-overview" className="text-foreground/60 hover:text-foreground transition-colors">
              Project Overview &rarr;
            </Link>
          </div>
        </div>

        <div className="text-foreground/40 text-sm mt-8 justify-center text-center" >
          • HackIIIT • Team - Bytes  • <a className='underline hover:no-underline hover:font-bold' href='https://github.com/Qiskit/textbook/blob/main/notebooks/ch-applications/vqe-molecules.ipynb'>Click here to read research paper 📃</a>
        </div>
      </div>
    </main>
  );
}