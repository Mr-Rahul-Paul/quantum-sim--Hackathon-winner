'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

interface CuratedItem {
  id: string
  name: string
  category: string
  description: string
  imageUrl?: string
}

// Placeholder data - you can replace this later
const placeholderItems: CuratedItem[] = [
  {
    id: '1',
    name: 'Example Element',
    category: 'Molecule',
    description: 'This is a placeholder for a curated element or molecule.',
    imageUrl: '/placeholder.png'
  },
  {
    id: '2',
    name: 'Another Element',
    category: 'Element',
    description: 'Another placeholder for your curated list.',
    imageUrl: '/placeholder.png'
  },
  {
    id: '3',
    name: 'hyrogen  molecule',
    category: 'Element',
    description: 'It jjust works my guys.',
    imageUrl: 'data:image/jpeg;base64,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'},
]

export default function CuratedListPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, setItems] = useState<CuratedItem[]>(placeholderItems)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(items.map(item => item.category)))
  
  const filteredItems = activeCategory 
    ? items.filter(item => item.category === activeCategory)
    : items

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
    <div className="z-10 max-w-5xl w-full">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
        Curated Elements & Molecules
      </h1>
      <p className="text-2xl md:text-lg mb-10 max-w-3xl text-foreground/80 border-l-4 border-orange-500/50 pl-4">
        A collection of carefully selected elements and molecules for your reference.
        You can add your curated list details here.
      </p>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button 
            className={`px-4 py-2 rounded-full ${activeCategory === null ? 'bg-orange-500 text-background ' : 'bg-background text-foreground border border-orange-500/50'}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button 
              key={category}
              className={`px-4 py-2 rounded-full ${activeCategory === category ? 'bg-orange-500 text-background ' : 'bg-background  hover:bg-red-500/20 text-foreground border border-orange-500/50 transition-colors'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
              {/* Grid layout for items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="rounded-lg p-6 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-orange-500/5 hover:to-red-500/10 text-foreground border border-orange-500/30 shadow-sm hover:shadow-md hover:scale-[1.05]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 text-orange-600 dark:text-orange-400 font-medium mb-3 inline-block">
                    {item.category}
                  </span>
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-500">
                    {item.name}
                  </h2>
                  <p className="text-foreground/70 mb-4">
                    {item.description}
                  </p>
                </div>
                i
          {item.imageUrl && (
            <div className="w-24 h-24 rounded-lg overflow-hidden flex items-center justify-center shadow-sm border border-orange-500/20">
              <div className="w-full h-full flex items-center justify-center">
                <Image 
                  src={item.imageUrl || ''} 
                  alt={item.name} 
                  width={96} 
                  height={96} 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-orange-500/20 flex justify-end">
                <button className="px-4 py-2 text-sm rounded-lg  text-grey-300 font-bold underline hover:opacity-90 ">
                  <a href="/ ">View Details</ a>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 border border-dashed border-foreground/20 rounded-lg">
            <p className="text-xl text-foreground/60">
              No items found in this category.
            </p>
          </div>
        )}
        
        <div className="mt-12 pt-6 border-t border-foreground/20">
            <div className="flex justify-between w-full">
            <Link href="/curated-list" className="text-foreground/60 hover:text-foreground transition-colors">
            &larr; To Overview
            </Link>
            <Link href="/simulation" className="text-foreground/60 hover:text-foreground transition-colors">
            To Simulation  &rarr;
            </Link>
            </div>
        </div>
      
      <div className="text-gray-400 text-sm mt-8 justify-center text-center" >
         • HackIIIT • Team - Bytes  • <a className='underline hover:no-underline hover:font-bold' href='https://github.com/Qiskit/textbook/blob/main/notebooks/ch-applications/vqe-molecules.ipynb'>Click here to read reaseach paper 📃</a>
      </div>

      </div>
    </main>
  )
}