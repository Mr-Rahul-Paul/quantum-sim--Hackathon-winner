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

  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start start", "end start"]
  // });

  // const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  // const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const redirect2 = () => router.push("/simulation");
  const redirect1 = () => router.push("/curated-list");
  const redirect3 = () => router.push("/Project-Overview");

  // Apple-style animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1], // Apple's signature easing
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

  // Section component with Apple-style reveal
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
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
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
                className='relative text-white after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full hover:text-amber-400'
              >
                Overview
              </button>
              <button
                onClick={redirect1}
                className='relative text-white after:content-[""] after:absolute after:-bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full hover:text-orange-400'
              >
                Molecules
              </button>
              <button
                onClick={redirect2}
                className='relative text-white after:content-[""] after:absolute after:-bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full hover:text-red-400'
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
                  className=" group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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
                  className="px-8 py-4 border-2 border-orange-400 text-orange-400 text-lg font-medium rounded-full hover:bg-orange-400/10 transition-all duration-300"
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
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
        </section>
      </div>
    </>
  );
}
