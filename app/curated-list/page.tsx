'use client'

import Link from 'next/link'
import { useState } from 'react'

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
]

export default function CuratedListPage() {
  const [items, setItems] = useState<CuratedItem[]>(placeholderItems)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(items.map(item => item.category)))
  
  const filteredItems = activeCategory 
    ? items.filter(item => item.category === activeCategory)
    : items

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Curated Elements & Molecules
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-3xl">
          A collection of carefully selected elements and molecules for your reference.
          You can add your curated list details here.
        </p>
        
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button 
            className={`px-4 py-2 rounded-full ${activeCategory === null ? 'bg-foreground text-background' : 'bg-background text-foreground border border-foreground'}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button 
              key={category}
              className={`px-4 py-2 rounded-full ${activeCategory === category ? 'bg-foreground text-background' : 'bg-background text-foreground border border-foreground'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Grid layout for items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="border border-foreground/20 rounded-lg p-6 hover:bg-foreground/5 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm px-2 py-1 rounded-full bg-foreground/10 mb-2 inline-block">
                    {item.category}
                  </span>
                  <h2 className="text-2xl font-semibold mb-2">
                    {item.name}
                  </h2>
                  <p className="text-foreground/80 mb-4">
                    {item.description}
                  </p>
                </div>
                
                {item.imageUrl && (
                  <div className="w-24 h-24 bg-foreground/10 rounded-md overflow-hidden flex items-center justify-center">
                    {/* You can add an actual image here */}
                    <div className="w-full h-full flex items-center justify-center text-sm text-center">
                      Image Placeholder
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-foreground/10 flex justify-end">
                <button className="px-4 py-2 text-sm rounded-md bg-foreground/10 hover:bg-foreground/20 transition-colors">
                  View Details
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
          <Link href="/" className="text-foreground/60 hover:text-foreground transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}