import { useState } from "react";

function GaussianJordan() {
    const [Row, setRow] = useState(2);
    const [Col, setCol] = useState(2);
    const [result, setResult] = useState([]);
    const [Matrix, setMatrix] = useState([]);

    const GenerRateMatrix = (e) => {
        e.preventDefault();
        const newMatrix = Array.from({ length: Row }, () => Array.from({ length: Col + 1 }, () => ""));
        setMatrix(newMatrix);
    }

    const inputRowCol = (e) => {
        setRow(Number(e.target.value));
        setCol(Number(e.target.value));
    }

    const handleMatrixChange = (rowIndex, colIndex, value) => {
        const updatedMatrix = [...Matrix];
        updatedMatrix[rowIndex][colIndex] = Number(value);
        setMatrix(updatedMatrix);
    }

    const ResetNew = () => {
        setRow(2);
        setCol(2);
        setResult([]);
        setMatrix([]);
    };

    const Calculate = () => {
        let A = Matrix.map(row => [...row]);  
        let X = Array(Row).fill(0);
        const n = Row;

        for (let i = 0; i<n; i++) {
            let diagElem = A[i][i];
            for (let z = i; z <= n; z++) {
                A[i][z] /= diagElem;
            }
            for (let j = i+1; j<n; j++) {
                const ratio = A[j][i]/A[i][i];
                for (let k = 0; k < n+1; k++) {
                    A[j][k] = A[j][k]-ratio* A[i][k];
                }
            }
        }

        X[n-1] = A[n-1][n] / A[n-1][n-1];
        for (let i = n-2; i >= 0; i--) {
            let sum = 0
            for (let j = i+1; j<n; j++) {
                sum += A[i][j]*X[j]
            }
            X[i] = (A[i][n]-sum)/A[i][i]
        }

        setResult(X)
    };

    return (
        <div>
            <h1 className="form-title">Gaussian Elimination Jordan</h1>
            <form onSubmit={GenerRateMatrix}>
                <div className="formcontainer">
                    <div>
                        <input
                            type="number"
                            value={Row}
                            step="1"
                            placeholder="Input row"
                            onChange={inputRowCol}
                        />
                    </div>
                    <div className="ButtonCon">
                        <button type="submit" className="calculate">
                            Generate Matrix
                        </button>
                        <button type="button" className="calculate" onClick={ResetNew}>
                            Reset
                        </button>
                    </div>
                </div>
                {Matrix.length > 0 && (
                    <div>
                        <h3>Enter Matrix Values</h3>
                        <div className="matrix-container">
                            {Matrix.map((row, rowIndex) => (
                                <div key={rowIndex} className="matrix-row">
                                    {row.map((val, colIndex) => (
                                        <input
                                            key={`${rowIndex}-${colIndex}`}
                                            type="number"
                                            value={val}
                                            onChange={(e) =>
                                                handleMatrixChange(rowIndex, colIndex, e.target.value)
                                            }
                                            className="matrix-input"
                                        />
                                    ))}
                                </div>
                            ))}
                            <button type="button" className="calculate" onClick={Calculate}>
                                Calculate
                            </button>
                        </div>
                    </div>
                )}
                <div className="result-container">
                    {result.map((res, index) => (
                        <div key={index} className="result">{`x${index + 1} = ${res.toFixed(6)}`}</div>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default GaussianJordan;
