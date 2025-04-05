// app/page.tsx
'use client';
import { useRouter } from 'next/navigation';
export default function HomePage() {
  const router = useRouter();

  const redirect2 = () => {
    router.push('/simulation');
  };

  const redirect1 = () => {
    router.push('/curated-list');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black"></div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        {/* Animated header section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            VQE Equations Simulation
          </h1>
          {/* <p className="text-lg md:text-xl text-gray-300">FOR STUDENTS BY STUDENTS</p> */}
        </div>

        {/* Main content grid */}
        <div className="max-w-4xl space-y-8">
          <div className="space-y-4 ">
            <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              [ Start simulating now! ]
            </h2>
            <p className="text-orange-300 text-sm leading-relaxed">
              *Not all molecules are compatible • GET Started with materials
            </p>
          </div>

          {/* Interactive section */}
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="p-6 border border-cyan-400/20 rounded-lg bg-zinc-800/50 backdrop-blur-sm">
              <h3 className="text-yellow-500 text-lg font-mono mb-4">Molecular Interface</h3>
              <p className="text-gray-300 mb-4">
                Not all molecules are compatible. <br/>
                Select from a curated list .
              </p>
              {/* on click redirect to /simulation */}
              <button onClick={redirect1} className="px-4 py-2 bg-yellow-600  text-white rounded-md font-medium transition-colors hover">
                Click here
              </button>
            </div>

            <div className="p-6 border border-cyan-400/20 rounded-lg bg-zinc-800/50 backdrop-blur-sm">
              <h3 className="text-orange-400 text-lg font-mono mb-4">Simulation Core</h3>
              <div className="space-y-4">
                <button onClick={redirect2} className="w-full px-4 py-2 bg-orange-500  rounded-md font-medium transition-colors">
                  Start Simulating
                </button>
                <button className="w-full px-4 py-2 border border-orange-400 hover:border-red-400/80 rounded-md font-medium transition-colors">
                  Compare us!
                </button>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-gray-400 text-sm mt-8">
            VQE simulation • HackIIIT • Team - Bytes  • <a className='no-underline hover:underline ' href='https://github.com/Qiskit/textbook/blob/main/notebooks/ch-applications/vqe-molecules.ipynb '>Click here to read reaseach paper 📃</a>
          </p>
        </div>
      </main>
    </div>
  );
}