"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Home() {
  const [element1, setElement1] = useState("H");
  const [element2, setElement2] = useState("H");
  const [distance, setDistance] = useState(0.74);
  interface SimulationResults {
    status: string;
    suggestion?: string;
    source?: string;
    cached_at?: string;
    ansatz_type?: string;
    exact_energy?: number;
    vqe_energy?: number;
    molecule_image?: string;
  }

  const [results, setResults] = useState<SimulationResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [energyData, setEnergyData] = useState<{ distance: number; exact: number; vqe: number }[]>([]);

  const handleSimulate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:8000/simulate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          element1,
          element2,
          distance: distance
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
        // Generate energy curve after single simulationj
        simulateEnergyCurve();
      }
    } catch (err) {
      // setError("Failed to connect to the simulation server");
    } finally {
      setLoading(false);
    }
  };

  const simulateEnergyCurve = async () => {
    const distances = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2];
    const newEnergyData = [];

    for (const dist of distances) {
      try {
        const res = await fetch("http://localhost:8000/simulate/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            element1,
            element2,
            distance: dist
          }),
        });
        const data = await res.json();
        if (data.status === "success") {
          newEnergyData.push({
            distance: dist,
            exact: data.exact_energy,
            vqe: data.vqe_energy
          });
        }
      } catch (err) {
        console.error(`Error at distance ${dist}:`, err);
      }
    }

    setEnergyData(newEnergyData);
  };

  // Chart data configuration
  const chartData = {
    labels: energyData.map(item => item.distance.toFixed(2) + " Å"),
    datasets: [
      {
        label: 'Exact Energy',
        data: energyData.map(item => item.exact),
        borderColor: 'rgb(96, 165, 250)',
        backgroundColor: 'rgba(96, 165, 250, 0.5)',
        tension: 0.1
      },
      {
        label: 'VQE Energy',
        data: energyData.map(item => item.vqe),
        borderColor: 'rgb(74, 222, 128)',
        backgroundColor: 'rgba(74, 222, 128, 0.5)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: 'Energy vs Bond Distance',
        font: {
          size: 16
        }
      },
      tooltip: {

      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Energy (Hartree)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Bond Distance (Å)'
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white relative overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 ">
            Quantum chemistry Simulator 
          </h1>
        
      <div className="w-full max-w-4xl space-y-6">
        {/* Input Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Element 1</label>
              <input
                type="text"
                className="w-full p-2 text-black rounded"
                value={element1}
                onChange={(e) => setElement1(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Element 2</label>
              <input
                type="text"
                className="w-full p-2 text-black rounded"
                value={element2}
                onChange={(e) => setElement2(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Distance (Å)</label>
            <input
              type="number"
              step="0.01"
              min="0.1"
              className="w-full p-2 text-black rounded"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value))}
            />
          </div>

          <button
            className={`w-full p-3 rounded font-medium ${loading ? "bg-grey-400" : "bg-grey-600 hover:bg-grey-500"
              }`}
            onClick={handleSimulate}
            disabled={loading}
          >
            {loading ? "Running Quantum Simulation..." : "Run Simulation"}
          </button>
        </div>

        {/* Results Section */}
        {error && (
          <div className="p-4 bg-red-800 rounded">
            <h3 className="font-bold">Error</h3>
            <p>{error}</p>
            {results?.suggestion && <p className="mt-2">{results.suggestion}</p>}
          </div>
        )}

        {results?.status === "success" && (
          <div className="space-y-6">
            {/* Source Indicator */}
            {results.source === "cache" && (
              <div className="bg-yellow-800 p-3 rounded text-center">
                These results were loaded from cache ({results.cached_at ? new Date(results.cached_at).toLocaleString() : "Unknown time"})
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Numerical Results */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Simulation Results</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Molecule:</span>
                    <span className="font-mono">{element1}-{element2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span className="font-mono">{distance} Å</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Method used:</span>
                    <span className="font-mono">{results.ansatz_type}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-blue-300">
                      <span>Exact Energy:</span>
                      <span className="font-mono">{results.exact_energy?.toFixed(6)} Hartree</span>
                    </div>
                    <div className="flex justify-between text-green-300">
                      <span>VQE Energy:</span>
                      <span className="font-mono">{results.vqe_energy?.toFixed(6)} Hartree</span>
                    </div>
                  </div>
                  {results.exact_energy && results.vqe_energy && (
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex justify-between">
                        <span>Energy Difference:</span>
                        <span className="font-mono">
                          {Math.abs(results.exact_energy - results.vqe_energy).toFixed(6)} Hartree
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Molecule Visualization */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Molecule Structure</h2>
                {results.molecule_image ? (
                  <div className="flex flex-col items-center">
                    <img src={`data:image/png;base64,${results.molecule_image}`} alt={`${element1}-${element2} molecule`} className="max-w-full h-auto border border-gray-600 rounded" />
                    <p className="mt-2 text-sm text-gray-400">
                      {element1}-{element2} at {distance} Å
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400">No structure available</p>
                )}
              </div>
            </div>

            {/* Energy Curve Visualization */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Energy Curve</h2>
              {energyData.length > 0 ? (
                <div className="h-64">
                  <Line data={chartData} options={chartOptions} />
                </div>
              ) : (
                <p className="text-gray-400">Run simulation to generate energy curve</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}