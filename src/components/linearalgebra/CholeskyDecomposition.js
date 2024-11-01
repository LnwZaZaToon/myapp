import React, { useState } from "react";
import './styleLinear.css';

const CholeskyDecompose = () => {
  const [numRows, setNumRows] = useState(2);
  const [calculated, setCalculated] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [matrix, setMatrix] = useState(
    Array.from({ length: numRows }, () =>
      Array.from({ length: numRows + 1 }, () => "")
    )
  );
  const [result, setResult] = useState([]);
  const maxMatrixSize = 10;

  const handleNumRowsChange = (event) => {
    const newNumRows = parseInt(event.target.value);
    if (newNumRows >= 1 && newNumRows <= maxMatrixSize) {
      setNumRows(newNumRows);
      setMatrix(
        Array.from({ length: newNumRows }, () =>
          Array.from({ length: newNumRows + 1 }, () => "")
        )
      );
    } else {
      alert(`Please enter a number between 1 and ${maxMatrixSize}`);
    }
  };

  const handleInputChange = (event, row, col) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = event.target.value;
    setMatrix(newMatrix);
  };

  const handleCalculate = () => {
    const A = matrix.map((row) => row.slice(0, -1).map((value) => parseFloat(value)));
    const B = matrix.map((row) => parseFloat(row[row.length - 1]));
    if (!isSymmetricAndPositiveDefinite(A)) {
      alert("not sysmemtric");
      return;
    }
    let L = Array.from({ length: A.length }, () =>
      Array.from({ length: A.length }, () => 0)
    );

    // Cholesky decomposition
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j <= i; j++) {
        let sum = 0;
        for (let k = 0; k < j; k++) {
          sum += L[i][k] * L[j][k];
        }

        if (i === j) {
          L[i][j] = Math.sqrt(A[i][i] - sum);
        } else {
          L[i][j] = (A[i][j] - sum) / L[j][j];
        }
      }
    }

    let Y = [];
    for (let i = 0; i < A.length; i++) {
      Y[i] = B[i];
      for (let j = 0; j < i; j++) {
        Y[i] -= L[i][j] * Y[j];
      }
      Y[i] /= L[i][i];
    }

    let resultX = [];
    for (let i = A.length - 1; i >= 0; i--) {
      resultX[i] = Y[i];
      for (let j = i + 1; j < A.length; j++) {
        resultX[i] -= L[j][i] * resultX[j];
      }
      resultX[i] /= L[i][i];
    }

    setResult(resultX);
    setCalculated(true);
  };
  const isSymmetricAndPositiveDefinite = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] !== matrix[j][i]) {
          return false;
        }
      }
    }


    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][i] <= 0) {
        return false;
      }
    }
    return true;
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
    const newMatrix = Array.from({ length: numRows }, () => Array.from({ length: numRows + 1 }, () => ""))
    setMatrix(newMatrix);
    setShowMatrix(true);
  };

  const ResetMatrix = () => {
    setNumRows(2);
    setMatrix([]);
    setResult([]);
    setShowMatrix(false);
    setCalculated(false)
  }

  return (
    <div className="calculator-container">
      <form onSubmit={handleGenerateMatrix}>
        <div className="form-container">
          <div className="form-title">
            <h1>Cholesky Decompose</h1>
          </div>
          <div>
            <input
              type="number"
              value={numRows}
              onChange={handleNumRowsChange}
              className="num-rows-input"
            />
          </div>
          <div className="button-container">
            <button type="submit" className="calculate">Generate Matrix</button>
            <button type="button" className="calculate" onClick={ResetMatrix}>Reset</button>
          </div>
        </div>
      </form>
      <div className="matrix-container">
        {showMatrix && renderTable()}
        {showMatrix && (<button type="submit" onClick={handleCalculate} className="calculate">Calculate</button>)}
      </div>
      {calculated && (
        <div className="result-container">
          {result.map((res, index) => (
            <div key={index} className="result">
              {`x${index + 1} = ${res}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CholeskyDecompose;
