'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ItemDetails {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
}

export default function DetailsPage() {
  const searchParams = useSearchParams();
  
  // State for item details
  const [details, setDetails] = useState<ItemDetails>({
    id: '',
    name: '',
    category: '',
    description: '',
    imageUrl: '/placeholder.png',
  });
  
  const [loading, setLoading] = useState(true);
  
  // Extract query parameters
  useEffect(() => {
    setLoading(true);
    
    const id = searchParams.get('id') || '';
    const name = searchParams.get('name') || '';
    const category = searchParams.get('category') || '';
    const description = searchParams.get('description') || '';
    const imageUrl = searchParams.get('imageUrl')|| '';
    
    // Update details with query parameters
    setDetails({
      id,
      name,
      category,
      description,
      imageUrl,
    });
    
    setLoading(false);
  }, [searchParams]);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
          Item Details
        </h1>
        
        <div className="mb-8">
          <Link href="/curated-list" className="text-foreground/60 hover:text-foreground transition-colors">
            &larr; Back to Curated List
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : details.id ? (
          <div className="rounded-lg p-8 transition-all duration-300 bg-background text-foreground border border-orange-500/30 shadow-md">
            <div className="w-full">
              <div className="flex flex-wrap items-center justify-between mb-4">
                <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 text-orange-600 dark:text-orange-400 font-medium mb-3 md:mb-0 inline-block">
                  {details.category}
                </span>
                
                <div className="flex gap-2">
                  <Link 
                    href={{
                      pathname: '/simulation',
                      query: {
                        id: details.id,
                        name: details.name,
                        category: details.category,
                        description: details.description,
                        imageUrl: details.imageUrl,
                      },
                    }}
                    className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-amber-500 to-red-500 text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Try Simulation
                  </Link>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold mb-6">{details.name}</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-foreground/70 leading-relaxed">{details.description}</p>
              </div>
              
              {details.category === 'Element' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-background/50 p-6 rounded-lg border border-orange-500/20 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-xl text-orange-600 dark:text-orange-400 mb-3">Atomic Structure</h4>
                    <p className="text-foreground/70">
                      Elements have unique atomic structures defined by their proton count.
                      Their electron configurations determine their chemical properties and reactivity patterns.
                      The nucleus contains protons and neutrons, while electrons orbit in specific energy levels.
                    </p>
                  </div>
                  
                  <div className="bg-background/50 p-6 rounded-lg border border-orange-500/20 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-xl text-orange-600 dark:text-orange-400 mb-3">Properties</h4>
                    <p className="text-foreground/70">
                      Each element has characteristic physical properties including melting point, boiling point, 
                      density, and conductivity. Chemical properties determine how elements react with other substances
                      to form compounds. These properties follow patterns in the periodic table.
                    </p>
                  </div>
                </div>
              )}
              
              {details.category === 'Molecule' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-background/50 p-6 rounded-lg border border-orange-500/20 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-xl text-orange-600 dark:text-orange-400 mb-3">Molecular Structure</h4>
                    <p className="text-foreground/70">
                      Molecules consist of atoms bonded together in specific arrangements. 
                      Their three-dimensional structure influences properties like solubility,
                      reactivity, and biological function. The geometry is determined by electron
                      interactions between constituent atoms.
                    </p>
                  </div>
                  
                  <div className="bg-background/50 p-6 rounded-lg border border-orange-500/20 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-xl text-orange-600 dark:text-orange-400 mb-3">Chemical Bonds</h4>
                    <p className="text-foreground/70">
                      Chemical bonds in molecules include covalent, ionic, hydrogen, and van der Waals interactions.
                      The type of bonding affects the molecules stability, reactivity, and physical properties.
                      Bond strength and polarity are key factors in chemical behavior.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-orange-500/20">
                <h3 className="text-xl font-semibold mb-4">Applications</h3>
                <ul className="list-disc pl-5 space-y-2 text-foreground/70">
                  <li>Used in various industrial processes and manufacturing</li>
                  <li>Important component in scientific research and development</li>
                  <li>Found in many everyday products and materials</li>
                  <li>Critical for understanding fundamental chemistry and physics</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-foreground/20 rounded-lg">
            <p className="text-xl text-foreground/60">
              No item selected. Please select an item from the curated list.
            </p>
            <Link 
              href="/curated-list" 
              className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-md"
            >
              Go to Curated List
            </Link>
          </div>
        )}
        
        <div className="mt-12 pt-6 border-t border-foreground/20">
          <div className="flex justify-between w-full">
            <Link href="/curated-list" className="text-foreground/60 hover:text-foreground transition-colors">
              &larr; To Curated List
            </Link>
            <Link href="/simulation" className="text-foreground/60 hover:text-foreground transition-colors">
              To Simulation &rarr;
            </Link>
          </div>
        </div>
        
        <div className="text-gray-400 text-sm mt-8 justify-center text-center">
          • HackIIIT • Team - Bytes • <a className='underline hover:no-underline hover:font-bold' href='https://github.com/Qiskit/textbook/blob/main/notebooks/ch-applications/vqe-molecules.ipynb'>Click here to read research paper 📃</a>
        </div>
      </div>
    </main>
  );
}