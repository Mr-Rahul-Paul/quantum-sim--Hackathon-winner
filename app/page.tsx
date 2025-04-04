// app/page.tsx
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black"></div>
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        {/* Animated header section */}
        <div className="animate-pulse mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            LAWDAQUE
          </h1>
          <p className="text-lg md:text-xl text-gray-300">FOR STUDENTS BISTO</p>
        </div>

        {/* Main content grid */}
        <div className="max-w-4xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-cyan-400">
              (Started or / Oddly Started)
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Expect Molecules • Not all are compatible • GET Started with materials
            </p>
          </div>

          {/* Interactive section */}
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="p-6 border border-cyan-400/20 rounded-lg bg-gray-800/50 backdrop-blur-sm">
              <h3 className="text-cyan-400 text-lg font-mono mb-4">Molecular Interface</h3>
              <p className="text-gray-300 mb-4">
                How No A Molecule are<br/>
                Read & intime disk
              </p>
              <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md font-medium transition-colors">
                Click here
              </button>
            </div>

            <div className="p-6 border border-cyan-400/20 rounded-lg bg-gray-800/50 backdrop-blur-sm">
              <h3 className="text-cyan-400 text-lg font-mono mb-4">Simulation Core</h3>
              <div className="space-y-4">
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors">
                  Start Simulating
                </button>
                <button className="w-full px-4 py-2 border border-cyan-400/40 hover:border-cyan-400/80 rounded-md font-medium transition-colors">
                  Compare us!
                </button>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-gray-400 text-sm mt-8">
            See data / EXP • Error for • Save • Molecule • later life • ce co
          </p>
        </div>
      </main>
    </div>
  );
}