import { NextRequest, NextResponse } from 'next/server';

// Dummy ML model logic (same as backend)
async function runMLModel(features: Record<string, number | string>): Promise<{ prediction: string; confidence: number }> {
  const complexity = Number(features.molecular_complexity) || 1;
  const numQubits = Number(features.num_qubits) || 1;
  const quantumScore = (complexity * 0.4 + numQubits * 0.6) / 10 + (Math.random() * 0.2 - 0.1);
  const confidence = Math.max(0, Math.min(1, quantumScore));
  const prediction = confidence > 0.5 ? 'Quantum' : 'Classical';
  return { prediction, confidence };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body.features !== 'object') {
      return NextResponse.json({ status: 'failed', error: 'Invalid input: features object is required.' }, { status: 400 });
    }
    const features = body.features;
    const { prediction, confidence } = await runMLModel(features);
    return NextResponse.json({
      status: 'success',
      prediction,
      confidence,
      features
    });
  } catch (error: any) {
    return NextResponse.json({ status: 'failed', error: error?.message || 'Internal server error' }, { status: 500 });
  }
} 