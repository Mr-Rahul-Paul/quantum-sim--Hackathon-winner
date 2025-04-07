# Quantum Molecule Simulator

This project is a **Quantum Molecule Simulator** built using [Next.js](https://nextjs.org) and [Qiskit](https://qiskit.org). It combines quantum computing and machine learning to simulate molecular properties and predict behaviors, providing an innovative platform for researchers and students.

## Project Overview

Our platform enables users to:
- Simulate molecular energy curves using quantum algorithms like VQE (Variational Quantum Eigensolver).
- Predict molecular behavior using a trained machine learning model.
- Visualize molecular structures and energy plots.
- Explore curated lists of elements and molecules with detailed insights.

This project was developed during a hackathon by **Team Bytes**.

## Features

- **Quantum Simulations**: Leverage IBM Quantum services or local simulators to compute molecular properties.
- **Machine Learning Predictions**: Predict molecular behavior based on complexity, qubits, and other features.
- **Interactive UI**: A user-friendly interface to explore curated molecules and run simulations.
- **Caching**: Efficient caching of results to reduce redundant computations.
- **Visualization**: Generate molecular images and energy plots for better understanding.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Python (v3.9 or later)
- MongoDB (for caching simulation results)
- IBM Quantum API Token (optional for quantum hardware simulations)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/quantum-molecule-simulator.git
   cd quantum-molecule-simulator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   python main.py
   ```

4. Start the frontend:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Curated List**: Browse a collection of elements and molecules with detailed descriptions.
- **Simulations**: Navigate to the simulation page to run quantum simulations or make predictions.
- **Details Page**: View detailed information about a specific molecule or element.

## Team

- **Frontend Development**: Designed and implemented the UI using React and TailwindCSS.
- **Backend Development**: Built the API for simulations and predictions using FastAPI and Qiskit.
- **Machine Learning**: Developed the ML model for molecular behavior predictions.
- **Visualization**: Created molecular images and energy plots for better insights.

## Learn More

- [Qiskit Documentation](https://qiskit.org/documentation/)
- [Next.js Documentation](https://nextjs.org/docs) 

## License

This project is licensed under the MIT License.