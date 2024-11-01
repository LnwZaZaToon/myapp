import React, { useState } from "react";
import './styleLinear.css';

const GaussSeidel = () => {
  const [numRows, setNumRows] = useState(2);
  const [matrix, setMatrix] = useState([]);
  const [result, setResult] = useState([]);
  const [iterations, setIterations] = useState([]); // New state for iteration data
  const [showMatrix, setShowMatrix] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const maxMatrixSize = 10;
  const tolerance = 1e-6;
  const maxIterations = 100;

  const handleNumRowsChange = (event) => {
    const newNumRows = parseInt(event.target.value);
    if (newNumRows >= 2 && newNumRows <= maxMatrixSize) {
      setNumRows(newNumRows);
      setMatrix(Array.from({ length: newNumRows }, () =>
        Array.from({ length: newNumRows + 1 }, () => "")
      ));
      setShowMatrix(false);
      setCalculated(false); // Reset calculated state
      setIterations([]); // Reset iterations state
    } else {
      alert(`Please enter a number between 2 and ${maxMatrixSize}`);
    }
  };

  const ResetMatrix = () => {
    setNumRows(2);
    setMatrix([]);
    setResult([]);
    setIterations([]); // Reset iterations
    setShowMatrix(false);
    setCalculated(false);
  };

  const handleInputChange = (event, row, col) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = event.target.value;
    setMatrix(newMatrix);
  };

  const handleCalculate = () => {
    const matrixA = [];
    const matrixB = [];
    for (let i = 0; i < numRows; i++) {
      matrixA[i] = [];
      for (let j = 0; j < numRows; j++) {
        matrixA[i][j] = parseFloat(matrix[i][j]) || 0; // Default to 0 if NaN
      }
      matrixB[i] = parseFloat(matrix[i][numRows]) || 0; // Default to 0 if NaN
    }

    let solutions = Array(numRows).fill(0);
    let converged = false;
    let iterationData = []; // Array to store iteration data

    for (let iteration = 0; iteration < maxIterations && !converged; iteration++) {
      converged = true;
      let currentIteration = { iteration: iteration + 1 }; // Object to store current iteration data

      for (let i = 0; i < numRows; i++) {
        let sum = matrixB[i];
        for (let j = 0; j < numRows; j++) {
          if (i !== j) {
            sum -= matrixA[i][j] * solutions[j];
          }
        }
        const newSolution = sum / matrixA[i][i];
        if (Math.abs(newSolution - solutions[i]) > tolerance) {
          converged = false;
        }
        solutions[i] = newSolution;
      }

      // Save current iteration data
      currentIteration.solutions = solutions.slice(); // Store a copy of current solutions
      iterationData.push(currentIteration); // Add to iteration data array
    }

    if (!converged) {
      alert("Gauss-Seidel method did not converge within the maximum iterations.");
    } else {
      setResult(solutions);
      setIterations(iterationData); // Set iteration data state
      setCalculated(true);
    }
  };

  const renderTable = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const rowInputs = [];
      for (let j = 0; j <= numRows; j++) {
        rowInputs.push(
          <input
            key={j}
            type="text"
            value={matrix[i][j]}
            onChange={(event) => handleInputChange(event, i, j)}
            className="matrix-input"
          />
        );
      }
      rows.push(
        <div key={i} className="matrix-row">
          {rowInputs}
        </div>
      );
    }
    return rows;
  };

  const handleGenerateMatrix = (e) => {
    e.preventDefault();
    const newMatrix = Array.from({ length: numRows }, () => Array.from({ length: numRows + 1 }, () => ""));
    setMatrix(newMatrix);
    setShowMatrix(true);
  };

  return (
    <div className="calculator-container">
      <form onSubmit={handleGenerateMatrix}>
        <div className="form-container">
          <div className="form-title">
            <h1>Gauss-Seidel Method</h1>
          </div>
          <div>
            <input type="number" value={numRows} onChange={handleNumRowsChange} />
          </div>
          <div className="button-container">
            <button type="submit" className="calculate">Generate Matrix</button>
            <button type="button" className="calculate" onClick={ResetMatrix}>Reset</button>
          </div>
        </div>
      </form>
      <div className="matrix-container">
        {showMatrix && renderTable()}
      </div>
      <div className="button-container">
        {showMatrix && (<button type="button" onClick={handleCalculate} className="calculate">Calculate</button>)}
      </div>
      {calculated && (
        <div className="result-container">
          <h2>Results:</h2>
          <ul>
            {result.map((value, index) => (
              <li key={index}>X{index + 1} = {value.toFixed(6)}</li>
            ))}
          </ul>

          {/* Iteration Table */}
          <h2>Iterations:</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Iteration</th>
                {Array.from({ length: numRows }, (_, index) => (
                  <th key={index}>X{index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {iterations.map((element) => (
                <tr key={element.iteration}>
                  <td>{element.iteration}</td>
                  {element.solutions.map((solution, index) => (
                    <td key={index}>{solution.toFixed(6)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GaussSeidel;
