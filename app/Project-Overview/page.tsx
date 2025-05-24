'use client'

import Link from 'next/link'
// import Image from 'next/image'
// import { motion } from 'framer-motion';


export default function ProjectOverview() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full">
        {/* Header section */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500 leading-tight">
          Project Overview 📜
        </h1>

        <p className="text-2xl md:text-lg mb-10 max-w-3xl text-foreground/80 border-l-8 border-orange-500/50 pl-4">
          This project, developed as part of an Open Innovation initiative, provides a platform for calculating the ground state energy of elements using computational methods provided by IBM and their Quantum computers. 
        </p>

        {/* Problem Statement Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-red-700/10 hover:to-gray-700/10 text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3 group-hover:text-orange-500 ">Problem Statement</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div>
                <div className="p-4 rounded-lg mb-4 bg-gradient-to-r from-rose-500/15 to-orange-400/15 shadow-sm">
                <p className="font-bold">Make a product that encourages exploration and discovery under the topic ' Open Innovation ' .</p>
                </div>
              <p className="text-foreground/70 mb-4">
                We designed our platform to spark curiosity and guide users toward discovering new resources,
                opportunities, and connections they wouldnt have found otherwise, creating serendipitous
                moments of discovery throughout the college experience.
              </p>
            </div>

          </div>
        </div>
        {/* Team Members Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-red-700/10 hover:to-zinc-700/10 text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-background border border-orange-500/20">
              <h3 className="text-xl font-medium mb-2 text-orange-500">Rahul</h3>
              <p className="text-foreground/70 mb-2">
                <span className="font-medium">Role:</span> Frontend Development
              </p>
              <p className="text-foreground/70">
                Led the UI/UX design process and implemented the responsive frontend using React and TailwindCSS,
                creating an intuitive and engaging user experience.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-orange-500/20">
              <h3 className="text-xl font-medium mb-2 text-orange-500">Naman & Dhruv</h3>
              <p className="text-foreground/70 mb-2">
                <span className="font-medium">Role:</span> Backend Architecture
              </p>
              <p className="text-foreground/70">
                Designed and implemented the data models, API endpoints, and core platform functionality
                that powers the discovery capabilities and user interactions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-orange-500/20">
              <h3 className="text-xl font-medium mb-2 text-orange-500">Manini</h3>
              <p className="text-foreground/70 mb-2">
                <span className="font-medium">Role:</span> AI/ML Development
              </p>
              <p className="text-foreground/70">
                Developed the AI/ML components for personalized recommendations and implemented intelligent
                algorithms to enhance the user experience with smart discovery features.
              </p>
            </div>
          </div>
        </div>
        {/* Project Idea Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">The Big Idea</h2>
          <p className="text-foreground/70 mb-4">
            Weve created a platform that helps college students discover valuable resources and opportunities
            that are often hidden or scattered. Our solution brings together academic and extracurricular options
            in one centralized place, making exploration beyond the standard curriculum simple and engaging.
          </p>
        </div>

        {/* Origin Story Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">How We Got Started</h2>
          <p className="text-foreground/70 mb-4">
            Our idea emerged from personal frustrations with fragmented college resources. We realized many
            valuable opportunities exist but are difficult to discover. What started as a simple resource
            aggregator evolved into a comprehensive discovery platform to enhance the college experience.
          </p>
        </div>


        {/* Impact Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Impact & Vision</h2>
          <p className="text-foreground/70 mb-4">
            We believe our platform can fundamentally change how students experience college by breaking down
            silos of information and creating pathways to opportunities that align with their unique interests and goals.
          </p>
          <p className="text-foreground/70 mb-4">
            By encouraging curiosity, exploration, and intentional growth, we help students develop not just the
            skills they need for future careers, but also the self-awareness and direction to choose paths that
            truly resonate with who they are.
          </p>
          <p className="text-foreground/70">
            Our vision is to expand to campuses nationwide, creating a network effect where each new user
            enriches the platform for everyone while benefiting from the collective knowledge of the community.
          </p>
        </div>

        {/* Features & Benefits Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Key Features & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-background border border-orange-500/20">
              <h3 className="text-xl font-medium mb-2 text-orange-500">Personalized Discovery</h3>
              <p className="text-foreground/70">
                AI-powered recommendations that adapt to your interests, goals, and past engagement,
                helping you discover opportunities youll actually care about.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-orange-500/20">
              <h3 className="text-xl font-medium mb-2 text-orange-500">Community Curation</h3>
              <p className="text-foreground/70">
                Student-sourced recommendations and reviews, creating a trusted ecosystem of peer insights about
                resources, classes, and opportunities.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-orange-500/20">
              <h3 className="text-xl font-medium mb-2 text-orange-500">Growth Tracking</h3>
              <p className="text-foreground/70">
                Tools to document your journey, set goals, and track progress across both personal and
                professional development areas.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-orange-500/20">
              <h3 className="text-xl font-medium mb-2 text-orange-500">Connection Platform</h3>
              <p className="text-foreground/70">
                Features that facilitate meaningful connections with peers, mentors, and alumni
                who share your interests or career path.
              </p>
            </div>
          </div>
        </div>


        {/* Navigation back to home */}
        <div className="mt-12 pt-6 border-t border-foreground/20">
          <div className="flex justify-between w-full">
            <Link href="/" className="text-foreground/60 hover:text-foreground transition-colors">
              &larr; Back to Home
            </Link>
            <Link href="/curated-list" className="text-foreground/60 hover:text-foreground transition-colors">
              To Interface &rarr;
            </Link>
          </div>
        </div>


      </div>
    </main>
  )
}