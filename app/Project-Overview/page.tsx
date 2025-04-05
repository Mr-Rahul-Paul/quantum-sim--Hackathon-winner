'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function ProjectOverview() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full">
        {/* Header section */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500 leading-tight">
          Project Overview
        </h1>
        
        <p className="text-2xl md:text-lg mb-10 max-w-3xl text-foreground/80 border-l-4 border-orange-500/50 pl-4">
          Our innovative solution for college students to discover resources, opportunities, and connections
          that enhance both personal growth and professional development.
        </p>

        {/* Problem Statement Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3 group-hover:text-orange-500">Problem Statement</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="p-4 rounded-lg bg-amber-900/50 mb-4">
                <p className="font-medium">Make a product that encourages exploration and discovery.</p>
              </div>
              <p className="text-foreground/70 mb-4">
                We designed our platform to spark curiosity and guide users toward discovering new resources, 
                opportunities, and connections they wouldn't have found otherwise, creating serendipitous 
                moments of discovery throughout the college experience.
              </p>
            </div>
            <div className="flex-1">
              <div className="p-4 rounded-lg bg-amber-900/50 mb-4">
                <p className="font-medium">Make a product that helps college students personally and professionally.</p>
              </div>
              <p className="text-foreground/70 mb-4">
                Our solution bridges the gap between academic learning and real-world application, providing tools 
                for both personal growth and professional development in a unified, accessible platform tailored 
                specifically to college students' unique needs.
              </p>
            </div>
          </div>
        </div>

        {/* Project Idea Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">The Big Idea</h2>
          <p className="text-foreground/70 mb-4">
            Our project creates a comprehensive platform that helps college students discover resources, 
            opportunities, and connections they might otherwise miss. By curating both academic and extracurricular 
            options in one place, we make it easier to explore possibilities beyond the standard curriculum.
          </p>
          <p className="text-foreground/70 mb-4">
            The platform combines personalized recommendations with community-sourced hidden gems, creating a 
            dynamic ecosystem of discovery that evolves with each student's journey through college.
          </p>
        </div>

        {/* Origin Story Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">How We Got Started</h2>
          <p className="text-foreground/70 mb-4">
            The idea was born from our team's shared frustration with the disconnect between college education 
            and real-world preparation. We noticed that many valuable resources existed but were scattered across 
            different departments, websites, and word-of-mouth networks.
          </p>
          <p className="text-foreground/70 mb-4">
            During a late-night brainstorming session, we realized we could create something that would have 
            helped our past selves navigate the overwhelming world of college opportunities. What began as a 
            simple idea for a resource aggregator evolved into a comprehensive platform for exploration and growth.
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
                helping you discover opportunities you'll actually care about.
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

        {/* Team Members Section */}
        <div className="rounded-lg p-6 mb-8 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-background border border-orange-500/20">
              <h3 className="text-xl font-medium mb-2 text-orange-500">Team Member 1</h3>
              <p className="text-foreground/70 mb-2">
                <span className="font-medium">Role:</span> Frontend Development & Design
              </p>
              <p className="text-foreground/70">
                Led the UI/UX design process and implemented the responsive frontend using React and TailwindCSS,
                creating an intuitive and engaging user experience.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-orange-500/20">
              <h3 className="text-xl font-medium mb-2 text-orange-500">Team Member 2</h3>
              <p className="text-foreground/70 mb-2">
                <span className="font-medium">Role:</span> Backend Architecture
              </p>
              <p className="text-foreground/70">
                Designed and implemented the data models, API endpoints, and recommendation algorithms
                that power the platform's core discovery capabilities.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-orange-500/20">
              <h3 className="text-xl font-medium mb-2 text-orange-500">Team Member 3</h3>
              <p className="text-foreground/70 mb-2">
                <span className="font-medium">Role:</span> Research & Content Strategy
              </p>
              <p className="text-foreground/70">
                Conducted user research with college students and developed the content strategy to ensure
                the platform addresses real needs with accessible, valuable resources.
              </p>
            </div>
          </div>
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

        {/* Navigation back to home */}
        <div className="mt-12 pt-6 border-t border-foreground/20">
          <Link href="/" className="text-foreground/60 hover:text-foreground transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}