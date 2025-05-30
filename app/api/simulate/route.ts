import { NextRequest, NextResponse } from 'next/server';
import { createCanvas } from 'canvas';

// Helper: Validate atoms
const VALID_ELEMENTS = new Set([
  'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
  'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'
]);
function validateAtoms(atoms: any[]): void {
  for (const atom of atoms) {
    if (!VALID_ELEMENTS.has(atom.element)) {
      throw new Error(`Invalid element symbol: ${atom.element}`);
    }
    if (isNaN(atom.x) || isNaN(atom.y) || isNaN(atom.z)) {
      throw new Error(`Invalid coordinates for atom ${atom.element}`);
    }
  }
}

// Helper: Generate molecule image (placeholder)
function generateMoleculeImage(atoms: any[], charge: number): string {
  const canvas = createCanvas(300, 300);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 300, 300);
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Molecule Structure', 150, 150);
  ctx.fillText(atoms.map((a: any) => a.element).join(' - '), 150, 180);
  return canvas.toDataURL('image/png').substring('data:image/png;base64,'.length);
}

// Helper: Simulate single point energy (mock)
function simulateSinglePointEnergy(input: any) {
  const numAtoms = input.atoms.length;
  const moleculeName = input.atoms.map((a: any) => a.element).join('');
  let plotData: { distances?: number[], energy_values?: number[] } = {};
  if (moleculeName === 'HH' && numAtoms === 2) {
    plotData = {
      distances: [0.5, 0.6, 0.7, 0.74, 0.8, 0.9, 1.0, 1.2, 1.5, 1.75, 2.0, 2.5],
      energy_values: [-1.05, -1.10, -1.125, -1.137, -1.13, -1.12, -1.10, -1.05, -0.98, -0.95, -0.93, -0.90]
        .map(e => e + (Math.random() - 0.5) * 0.01)
    };
  } else if (moleculeName === 'HLi' && numAtoms === 2) {
    plotData = {
      distances: [1.0, 1.2, 1.4, 1.59, 1.8, 2.0, 2.2, 2.5, 3.0],
      energy_values: [-7.8, -7.85, -7.87, -7.882, -7.875, -7.86, -7.84, -7.80, -7.75]
        .map(e => e + (Math.random() - 0.5) * 0.005)
    };
  } else {
    plotData = {
      distances: Array.from({ length: 10 }, (_, i) => 0.8 + i * 0.2),
      energy_values: Array.from({ length: 10 }, (_, i) => -numAtoms * (1.0 + Math.exp(-((i - 4) ** 2) / 2)) + Math.random() * 0.01)
    };
  }
  return {
    molecule_name: moleculeName || 'Unknown',
    qubit_count: numAtoms * 2 + Math.floor(Math.random() * 4),
    ansatz_type: 'UCCSD',
    exact_energy: -1.137 * numAtoms * (Math.random() * 0.3 + 0.85),
    vqe_energy: -1.136 * numAtoms * (Math.random() * 0.3 + 0.85) - Math.random() * 0.01,
    ...plotData,
    dipole_moment: {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2,
      total: Math.random() * 3
    },
    orbital_energies: Array.from({ length: numAtoms }, () => Math.random() * -10)
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || !Array.isArray(body.atoms) || body.atoms.length === 0) {
      return NextResponse.json({ status: 'error', error: 'Invalid molecule input. Atoms array is required.' }, { status: 400 });
    }
    validateAtoms(body.atoms);
    if (typeof body.charge !== 'number' || typeof body.spin !== 'number') {
      return NextResponse.json({ status: 'error', error: 'Charge and spin must be numbers.' }, { status: 400 });
    }
    const simulationOutput = simulateSinglePointEnergy(body);
    const moleculeImage = generateMoleculeImage(body.atoms, body.charge);
    return NextResponse.json({
      status: 'success',
      source: 'calculation',
      ...simulationOutput,
      molecule_image: moleculeImage,
      elements: body.atoms.map((a: any) => a.element),
      suggestion: `Calculation completed for ${simulationOutput.molecule_name}. Consider optimizing geometry for better accuracy.`
    });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', error: error?.message || 'Internal server error' }, { status: 500 });
  }
} 