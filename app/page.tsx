// app/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();

  const redirect2 = () => {
    router.push('/simulation');
  };

  const redirect1 = () => {
    router.push('/curated-list');
  };
  const redirect3 = () => {
    router.push('/Project-Overview');
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: .5 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black"></div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        {/* Animated header section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            VQE Equations Simulation
          </h1>
        </motion.div>

        {/* Main content grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-8"
        >
          <motion.div variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              [ Start simulating now! ]
            </h2>
            <p className="text-orange-300 text-sm leading-relaxed">
              *Not all molecules are compatible • GET Started with materials
            </p>
          </motion.div>

          {/* Interactive section */}
          {/* ------------------------------------------------------- */}
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <motion.div
              variants={fadeIn}
              className="p-6 border border-cyan-400/20 rounded-lg bg-zinc-800/50 backdrop-blur-sm"
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <h3 className="text-yellow-500 text-lg font-mono mb-4">Project Overview</h3>
                <p className="text-gray-300 mb-4 font-serif tracking-wide">
                  Discover the team behind this innovation<br/>
                  <span>More BTS and process here</span>
                </p>
              <motion.button
                onClick={redirect3}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md font-medium transition-colors"
                whileHover={{ backgroundColor: "#b45309", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Click here
              </motion.button>
            </motion.div>
            {/* ------------------------------------------------------- */}
            <motion.div
              variants={fadeIn}
              className="p-6 border border-cyan-400/20 rounded-lg bg-zinc-800/50 backdrop-blur-sm"
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <h3 className="text-yellow-600 text-lg font-mono mb-4">Molecular Interface</h3>
              <p className="text-gray-300 mb-4">
                Not all molecules are compatible. <br />
                Select from a curated list.
              </p>
              <motion.button
                onClick={redirect1}
                className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium transition-colors"
                whileHover={{ backgroundColor: "#b45309", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Click here
              </motion.button>
            </motion.div>
            {/* ---------------------------------------------------------- */}
            <motion.div
              variants={fadeIn}
              className="p-6 border border-cyan-400/20 rounded-lg bg-zinc-800/50 backdrop-blur-sm"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h3 className="text-orange-500 text-lg font-mono mb-4">Simulation Core</h3>
              <div className="space-y-4">
                <motion.button
                  onClick={redirect2}
                  className="w-full px-4 py-2 bg-orange-600 rounded-md font-medium transition-colors"
                  whileHover={{ backgroundColor: "#c2410c", scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Simulating
                </motion.button>
                <motion.button
                  className="w-full px-4 py-2 border border-orange-400 rounded-md font-medium transition-colors"
                  whileHover={{ borderColor: "#f87171", scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Compare us!
                </motion.button>
              </div>
            </motion.div>
            {/* ---------------------------------------------------------- */}
          </div>

          {/* Footer text */}
          <motion.p
            variants={fadeIn}
            className="text-gray-400 text-sm mt-8"
          >
            VQE simulation • HackIIIT • Team - Bytes  • <a className='underline hover:no-underline hover:font-bold' href='https://github.com/Qiskit/textbook/blob/main/notebooks/ch-applications/vqe-molecules.ipynb'>Click here to read reaseach paper 📃</a>
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}