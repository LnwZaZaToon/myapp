import React, { useState } from "react";
import './styleLinear.css';

const JacobiMethod = () => {
  const [numRows, setNumRows] = useState(2);
  const [matrix, setMatrix] = useState([]);
  const [result, setResult] = useState([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const maxMatrixSize = 10;
  const tolerance = 1e-6; // Convergence threshold
  const maxIterations = 100; // Maximum number of iterations

  const handleNumRowsChange = (event) => {
    const newNumRows = parseInt(event.target.value);

    if (newNumRows >= 2 && newNumRows <= maxMatrixSize) {
      setNumRows(newNumRows);
      setMatrix(
        Array.from({ length: newNumRows }, () =>
          Array.from({ length: newNumRows + 1 }, () => "")
        )
      );
      setShowMatrix(false); // Hide matrix until generated
    } else {
      alert(`Please enter a number between 2 and ${maxMatrixSize}`);
    }
  };

  const ResetMatrix = () => {
    setNumRows(2);
    setMatrix([]);
    setResult([]);
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
        matrixA[i][j] = parseFloat(matrix[i][j]);
      }
      matrixB[i] = parseFloat(matrix[i][numRows]);
    }

    let solutions = Array(numRows).fill(0); // Initial guess
    let prevSolutions = Array(numRows).fill(0);
    let converged = false;

    for (let iteration = 0; iteration < maxIterations && !converged; iteration++) {
      converged = true;
      for (let i = 0; i < numRows; i++) {
        let sum = matrixB[i];
        for (let j = 0; j < numRows; j++) {
          if (i !== j) {
            sum -= matrixA[i][j] * prevSolutions[j];
          }
        }
        solutions[i] = sum / matrixA[i][i];

        // Check for convergence
        if (Math.abs(solutions[i] - prevSolutions[i]) > tolerance) {
          converged = false;
        }
      }

      // Update previous solutions for the next iteration
      prevSolutions = [...solutions];
    }

    if (!converged) {
      alert("Jacobi method did not converge within the maximum iterations.");
    } else {
      setResult(solutions);
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
            <h1>Jacobi Method</h1>
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
        {showMatrix && (<button type="submit" onClick={handleCalculate} className="calculate">Calculate</button>)}
      </div>
      {calculated && (
        <div className="result-container">
          {result.map((res, index) => (
            <div key={index} className="result">
              {`x${index + 1} = ${res.toFixed(6)}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JacobiMethod;
