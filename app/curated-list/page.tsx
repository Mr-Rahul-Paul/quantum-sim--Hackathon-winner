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
  application1?: string
  application2?: string
  application3?: string
}

// Placeholder data - you can replace this later
const placeholderItems: CuratedItem[] = [
  {
    id: '1',
    name: 'Hydrogen',
    category: 'Element',
    description: 'Lightest element, colorless gas that forms water with oxygen.',
    imageUrl: 'data:image/png;base64,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'
  },
  {
    id: '2',
    name: 'Lithium',
    category: 'Element',
    description: 'Soft, silvery metal used in batteries.',
    imageUrl: 'data:image/png;base64,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'
  },

  {
    id: '3',
    name: 'Oxygen',
    category: 'Element',
    description: 'Essential for respiration, supports combustion.',
    imageUrl: 'data:image/png;base64,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'
  },
  {
    id: '4',
    name: 'Beryllium',
    category: 'Element',
    description: 'Lightweight metal used in aerospace.',
    imageUrl: 'data:image/png;base64,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'
  },
  {
    id: '6',
    name: 'Carbon',
    category: 'Element',
    description: 'Basis of organic life, found in all living things.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbOA79bCf9HemNVnMxViAYh5_q6xwXTowJsQ&s'
  },
  {
    id: '7',
    name: 'Di-Hydrogen (H2)',
    category: 'Molecule',
    description: 'Molecular hydrogen, used as a fuel.',
    imageUrl: 'data:image/jpeg;base64,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'
  },
  {
    id: '8',
    name: 'Lithium Hydride (LiH)',
    category: 'Molecule',
    description: 'Used in hydrogen storage and batteries.',
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADFCAMAAACM/tznAAAAgVBMVEX////79/eISUn5+flkZGRfAAAZGRkmJiZYAADa2tqkpKTz8PAAAAAeHh7e1NRaAAB8fHx/Rkbq6uqtra1yLCzDw8NMAAB0dHRQAAC9np6ISkp+T09tW1tqamoQEBBRUVHMvLzh4eHDrq4yMjI3FBRZWVlrGRl2NTXj2tp8QUGSkpIZgCqPAAABIklEQVR4nO3X2U7CUBQF0GKlgy0FRQZHBkXU//9AhRZ9oC80hISy1tN+aE5Odm56c4MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgEs3n4e7WCTdBgOy0ahK6WhxnJ1OqTMeZ7tcjKcNJqR5XqVJfnOcpU4pTJK/ArKiaDAhjXpVGkRnXkAzLSogWy4bTGhRAcU0aTChTQX0y1ugUyussfk6jeLsbiObtKSAh6saj0/P13teNhdgGr3lpThuRQFh0q0zfY/3RKtgewKGpVWvFQUcfgIu/h/QugIOo4CzL+D/MXSZBXTvtz6Wv6/BfoMJ6WtUpcHrORawvi2t58Hn+qvBhMVsVqXv2fCYqwEAAAAAAAAAAAAAAAAAAAAAAAAAAADAOfoBGREQcTevbJIAAAAASUVORK5CYII='
  },

  {
    id: '9',
    name: 'Water (H2O)',
    category: 'Molecule',
    description: 'Essential for life, covers most of Earth.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa20WTUQdMxY5b1JVVzVEIlJYfmmc0pWghdQ&s'
  },
  


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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="rounded-lg p-6 transition-all duration-300 bg-background hover:bg-gradient-to-br hover:from-red-700/10 hover:to-gray-700/10 text-foreground border border-orange-500/30 shadow-sm hover:shadow-md hover:scale-[1.05]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 text-orange-600 dark:text-orange-400 font-medium mb-3 inline-block">
                    {item.category}
                  </span>
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-500">
                    {item.name}
                  </h2>

                </div>

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
                <p className="text-foreground/70 mb-4">
                  {item.description}
                </p>
                {/* filepath: c:\Users\rpaul\OneDrive\Desktop\hackathon\intro-test\app\curated-list\page.tsx */}
                <button className="px-4 py-2 text-sm rounded-lg text-grey-300 font-bold underline hover:opacity-90">
                  <Link
                    href={{
                      pathname: '/details',
                      query: {
                        id: item.id,
                        name: item.name,
                        category: item.category,
                        description: item.description,
                        imageUrl: item.imageUrl,
                      },
                    }}
                  >
                    More Details
                  </Link>
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

        <div className="text-gray-400mt-8 justify-center text-center" >
          • HackIIIT • Team - Bytes  • <a className='underline hover:no-underline hover:font-bold' href='https://github.com/Qiskit/textbook/blob/main/notebooks/ch-applications/vqe-molecules.ipynb'>Click here to read reaseach paper 📃</a>
        </div>

      </div>
    </main>
  )
}