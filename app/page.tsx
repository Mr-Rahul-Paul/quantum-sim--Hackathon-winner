// app/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaGithub } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const redirect2 = () => router.push("/simulation");
  const redirect1 = () => router.push("/curated-list");
  const redirect3 = () => router.push("/Project-Overview");

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };


  const Section = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 60 } : { opacity: 1, y: 60 }} // little ambiguity remain here for me 
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={className}
      >
        {children}
      </motion.section>
    );
  };

  return (
    <>
      <div ref={containerRef} className="relative bg-black">
        <section
          ref={heroRef}
          className="relative z-10 min-h-screen bg-hidden overflow-hidden"
        >
          {/*       gradient here    */}

          <motion.nav className="relative flex justify-between items-center z-40 px-6 md:px-12 py-6">
            <h1 className="tex  t-xl font-bold text-white">VQE Simulator</h1>

            <div className="flex justify-center items-center">
              <a
                href="https://github.com/Mr-Rahul-Paul/quantum-sim-HackIIITV"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-white w-6 h-6 hover:text-orange-600 transition cursor-pointer" />
              </a>
            </div>
            <div className="hidden md:flex space-x-8 text-white/80">
              <button
                onClick={redirect3}
                className='text-xl  relative text-white after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full hover:text-amber-400'
              >
                Overview
              </button>
              <button
                onClick={redirect1}
                className='text-xl relative text-white after:content-[""] after:absolute after:-bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full hover:text-orange-400'
              >
                Molecules
              </button>
              <button
                onClick={redirect2}
                className='text-xl relative text-white after:content-[""] after:absolute after:-bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full hover:text-red-400'
              >
                Simulation
              </button>
            </div>
          </motion.nav>
          {/* navbar done now hero section here */}
          <div className="relative z-50 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-5xl space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight">
                  Quantum
                  <br />
                  <span className="font-medium bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Chemistry
                  </span>
                  <br />
                  Reimagined
                </h1>
                <br />
                <p className="text-xl md:text-2xl text-orange-300 font-light max-w-3xl mx-auto leading-relaxed">
                  Variational Quantum Eigensolvers for molecular simulation.
                  <br />
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              >
                <motion.button
                  onClick={redirect2}
                  className=" group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl "
                  whileHover={{
                    scale: 1.02,
                    boxShadow: " 10px 20px 5 0px rgba(251, 146, 60, 0.6)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    Start Simulation
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </motion.button>
                <motion.button
                  onClick={redirect1}
                  className="px-8 py-4 border-2 border-orange-400 text-orange-400 text-lg font-medium rounded-full hover:bg-orange-400/10 "
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Molecules
                </motion.button>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="text-sm pt-16 text-orange-300/60"
              >
                Compatible with curated molecular datasets
              </motion.div>
            </motion.div>
          </div>
          {/* scroll indicator component */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>
        <Section className="py-24 bg-gradient-to-b from-black to-gray-900 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
                Built for Tomorrow
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Every component designed with precision, every interaction
                crafted for excellence.
              </p>
            </motion.div>

            <div className=" grid sm:grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
              {/* card 1 */}
              <motion.div
                variants={scaleIn}
                className=" p-12 lg:p-10 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-3xl border border-yellow-400/20 hover:border-yellow-400/40 hover:shadow-xl shadow-yellow-400/20 "
                whileHover={{ y: -8 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-8 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-7 h-7 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-medium text-yellow-400 mb-4">
                  Research & Innovation
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Discover the cutting-edge research and scientific methodology
                  behind our quantum simulation platform.
                </p>
                <motion.button
                  onClick={redirect3}
                  className="inline-flex items-center gap-2 text-yellow-400 font-medium hover:gap-3 "
                  whileHover={{ x: 4 }}
                >
                  Learn more
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.button>
              </motion.div>
              {/* card 2 */}
              <motion.div
                variants={scaleIn}
                className=" p-8 lg:p-10 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-3xl border border-blue-400/20 hover:border-blue-400/40 hover:shadow-xl shadow-blue-400/20"
                whileHover={{ y: -8 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl mb-8 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-medium text-cyan-400 mb-4">
                  Molecular Database
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Access our carefully curated collection of molecules, each
                  validated for VQE compatibility and performance.
                </p>
                <motion.button
                  onClick={redirect1}
                  className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:gap-3"
                  whileHover={{ x: 4 }}
                >
                  Browse collection
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.button>
              </motion.div>
              {/* card 3 */}
              <motion.div
                variants={scaleIn}
                className="group p-8 lg:p-10 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-3xl border border-orange-400/20 hover:border-orange-400/40 hover:shadow-xl hover:shadow-orange-400/20 "
                whileHover={{ y: -8 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-8 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 32 32"
                  >
                    <circle cx="16" cy="16" r="4" fill="#fb923c" />
                    <ellipse
                      cx="16"
                      cy="16"
                      rx="11"
                      ry="5"
                      stroke="#fff"
                      strokeWidth="2"
                      opacity="0.9"
                    />
                    <ellipse
                      cx="16"
                      cy="16"
                      rx="5"
                      ry="11"
                      stroke="#fde68a"
                      strokeWidth="2"
                      opacity="0.8"
                      transform="rotate(30 16 16)"
                    />
                    <ellipse
                      cx="16"
                      cy="16"
                      rx="11"
                      ry="5"
                      stroke="#f87171"
                      strokeWidth="2"
                      opacity="0.8"
                      transform="rotate(60 16 16)"
                    />
                    <circle cx="27" cy="16" r="1.6" fill="#fde68a" />
                    <circle cx="16" cy="5" r="1.6" fill="#f87171" />
                    <circle cx="16" cy="27" r="1.6" fill="#fff" />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium text-orange-400 mb-4">
                  Quantum Engine
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Experience real-time VQE simulations powered by advanced
                  quantum algorithms and cloud computing.
                </p>

                <motion.button
                  onClick={redirect2}
                  className="inline-flex items-center gap-2 text-orange-400 font-medium hover:gap-3 "
                  whileHover={{ x: 4 }}
                >
                  Start simulation
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </Section>
        {/* third section */}

        <Section className="py-24 bg-gradient-to-b from-gray-900 to-black ">
          <div className="max-w-7xl mx-auto px-15 md:px-12 sm:mt-20">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Content */}
              <motion.div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-light text-white leading-tight tracking-tight">
                    Quantum Technology.
                    <br />
                    <span className="text-orange-400">Simplified.</span>
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Built on industry-leading quantum computing frameworks, our
                    platform makes complex molecular chemistry accessible
                    through elegant, intuitive design.
                  </p>
                </div>

                {/* stacckj part */}
                <div className="grid grid-cols-2 gap-4 ">
                  {[
                    { name: "Qiskit", desc: "Quantum SDK" },
                    { name: "VQE", desc: "Algorithms" },
                    { name: "Real-time", desc: "Analysis" },
                    { name: "Cloud", desc: "Computing" },
                  ].map((tech, index) => (
                    <motion.div
                      onClick={redirect1}
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-zinc-800/50 rounded-2xl border border-orange-400/20 hover:border-orange-400/40 hover:cursor-pointer hover:shadow-xl hover:shadow-orange-400/20"
                    >
                      <h4 className="font-medium text-orange-400">
                        {tech.name}
                      </h4>
                      <p className="text-sm text-gray-400">{tech.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={() => alert("Contact: rpaul29120@gmail.com")}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-orange-400 text-orange-400 rounded-full hover:bg-orange-400/10 "
                  whileHover={{ scale: 1.02 }}
                >
                  Get Support
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.button>
              </motion.div>

              {/* Visual Element */}
              <motion.div
                variants={scaleIn}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="relative z-10 p-12 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl border border-orange-400/20 shadow-2xl flex flex-col items-center">
                  {/* Animated Atom SVG */}
                  <div className="w-24 h-24 mb-6 flex items-center justify-center">
                    <svg
                      className="w-24 h-24 animate-spin-slow"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#fb923c"
                        strokeWidth="2"
                      />
                      <ellipse
                        cx="50"
                        cy="50"
                        rx="30"
                        ry="10"
                        stroke="#f87171"
                        strokeWidth="2"
                      />
                      <ellipse
                        cx="50"
                        cy="50"
                        rx="10"
                        ry="30"
                        stroke="#fde68a"
                        strokeWidth="2"
                        transform="rotate(45 50 50)"
                      />
                      <circle cx="50" cy="30" r="4" fill="#fb923c" />
                      <circle cx="70" cy="50" r="4" fill="#f87171" />
                      <circle cx="50" cy="70" r="4" fill="#fde68a" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-orange-400 mb-2">
                    VQE Engine
                  </h3>
                  <ul className="text-gray-300 mb-6 space-y-1 text-center">
                    <li>Quantum-classical optimization</li>
                    <li>Cloud execution</li>
                    <li>Real-time results</li>
                  </ul>
                  <button
                    onClick={redirect2}
                    className="mt-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-medium shadow hover:scale-105 transition"
                  >
                    Try VQE Engine
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>
        {/* da footer here */}
        <Section className="py-16 bg-black text-white border-t border-gray-600">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <motion.div variants={fadeInUp} className="space-y-6">
              <h3 className="text-2xl font-light text-white">
                Ready to explore quantum chemistry?
              </h3>
              <p className="text-gray-400">
                VQE Simulation Platform • HackIIIT • Team Bytes
              </p>
              <div className="flex justify-center">
                <a
                  href="https://github.com/Qiskit/textbook/blob/main/notebooks/ch-applications/vqe-molecules.ipynb"
                  className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Read the Research Paper
                </a>
              </div>
              <div className="flex justify-center items-center">
                <a
                  href="https://github.com/Mr-Rahul-Paul/quantum-sim-HackIIITV"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-white w-6 h-6 hover:text-orange-600 transition cursor-pointer" />
                </a>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </>
  );
}
