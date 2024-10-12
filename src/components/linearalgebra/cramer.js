import React, { useState } from "react";
import { det } from "mathjs";

const CramerRule = () => {
  const [numRows, setNumRows] = useState(2);
  const [matrix, setMatrix] = useState([]
  );
  const [result, setResult] = useState([]);
  const [showMatrix, setShowMatrix] = useState(false); // New state to control matrix visibility
  const maxMatrixSize = 10;

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

  const ResetMatrix =()=>{
      setNumRows(2);
      setMatrix([]);
      setResult([]);
      setShowMatrix(false);
  }

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
        matrixA[i][j] = parseFloat(matrix[i][j]) ;
      }
      matrixB[i] = parseFloat(matrix[i][numRows]) ; 
    }

    const detA = det(matrixA);

    if (detA === 0) {
      alert("The determinant is zero. The system may have no solution or infinitely many solutions.");
      return;
    }

    const detX = [];
    for (let i = 0; i < matrixB.length; i++) {
      const newArr2D = JSON.parse(JSON.stringify(matrixA));
      for (let j = 0; j < matrixA.length; j++) {
        newArr2D[j][i] = matrixB[j];
      }
      detX.push(det(newArr2D));
    }

    const solutions = detX.map((det, index) => {
      return det / detA;
    });

    setResult(solutions);
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

  const handleGenerateMatrix = () => {
    const newMatrix =  Array.from({ length: numRows }, () => Array.from({ length: numRows+1}, () => ""))
    setMatrix(newMatrix);
    setShowMatrix(true); 
  };

  return (
    <div className="cramers-rule">
      <h2>Cramer's Rule</h2>
      <input
        type="number"
        min="2"
        value={numRows}
        onChange={handleNumRowsChange}
        className="num-rows-input"
      />
      <div className="matrix-container">
        <button onClick={handleGenerateMatrix}>Generate Matrix</button>
        <button onClick={ResetMatrix}>Reset</button>
        {showMatrix && renderTable()} {/* Render the matrix if showMatrix is true */}
      </div>

      <button className="calculate-button" onClick={handleCalculate}>
        Calculate
      </button>

      <div className="result-container">
        {result.map((res, index) => (
          <div key={index} className="result">
            {`x${index + 1} = ${res}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CramerRule;
