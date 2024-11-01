import { useState } from "react";
import { lusolve } from "mathjs";

function PolynomialRegression() {
  const [X1target, setX1target] = useState(0);
  const [result, setResult] = useState(0);
  const [regressionEquation, setRegressionEquation] = useState("");
  const [pointCount, setPointCount] = useState(2);
  const [degree, setDegree] = useState(2); // Degree of polynomial
  const [points, setPoints] = useState([{ x: "", y: "" }, { x: "", y: "" }]);
  const [plotData, setPlotData] = useState([]);
  const [calculated, setCalculated] = useState(false);

  const calculate = (e) => {
    e.preventDefault();
    const n = points.length;
    const d = degree;

    // Initialize the matrices for polynomial regression
    const matrix1 = Array(d + 1).fill(0).map(() => Array(d + 1).fill(0));
    const matrix2 = Array(d + 1).fill(0);

    // Compute sums for matrix construction
    points.forEach((point) => {
      const x1 = parseFloat(point.x) || 0;
      const y = parseFloat(point.y) || 0;
      for (let i = 0; i <= d; i++) {
        for (let j = 0; j <= d; j++) {
          matrix1[i][j] += x1 ** (i + j);
        }
        matrix2[i] += y * x1 ** i;
      }
    });

    // Solve for coefficients
    const coefficients = lusolve(matrix1, matrix2).map((row) => row[0]);
    setRegressionEquation(
      "Y = " +
        coefficients
          .map((coeff, i) => `${coeff.toFixed(4)}*X1^${i}`)
          .join(" + ")
    );

    // Calculate the predicted Y for the given X1 target
    const predictedY = coefficients.reduce(
      (acc, coeff, i) => acc + coeff * X1target ** i,
      0
    );
    setResult(predictedY);

    // Generate plot data for the polynomial regression line
    const regressionLine = Array.from({ length: 100 }, (_, i) => {
      const x = Math.min(...points.map((p) => parseFloat(p.x) || 0)) + i * 0.1;
      const y = coefficients.reduce((acc, coeff, j) => acc + coeff * x ** j, 0);
      return { x, y };
    });
    setPlotData(regressionLine);
    setCalculated(true);
  };

  const reset = () => {
    setResult(0);
    setRegressionEquation("");
    setPointCount(2);
    setDegree(2);
    setPoints([{ x: "", y: "" }, { x: "", y: "" }]);
    setPlotData([]);
  };

  const handlePointCountChange = (e) => {
    const count = parseInt(e.target.value) || 2;
    setPointCount(count);
    const newPoints = Array.from({ length: count }, () => ({ x: "", y: "" }));
    setPoints(newPoints);
  };

  const handlePointChange = (index, axis, value) => {
    const updatedPoints = [...points];
    updatedPoints[index] = { ...updatedPoints[index], [axis]: value };
    setPoints(updatedPoints);
  };

  const handleDegreeChange = (e) => {
    const newDegree = parseInt(e.target.value) || 2;
    setDegree(newDegree);
  };

  const handleX1target = (e) => {
    setX1target(parseFloat(e.target.value) || 0);
  };

  return (
    <div className="calculator-container">
      <div className="form-container">
        <h1>Polynomial Regression</h1>
        <form>
          <div className="input-controls">
            <input type="number" placeholder="Number of points" onChange={handlePointCountChange} />
            <input type="number" placeholder="Degree of polynomial" value={degree} onChange={handleDegreeChange} />
          </div>
        </form>

        <form onSubmit={calculate}>
          <div className="formcontainer">
            {points.map((point, index) => (
              <div key={index} className="pointInputs" style={{ display: 'flex' }}>
                <input
                  type="number"
                  value={point.x}
                  step="any"
                  placeholder={`X1${index + 1}`}
                  onChange={(e) => handlePointChange(index, "x", e.target.value)}
                />
                <input
                  type="number"
                  value={point.y}
                  step="any"
                  placeholder={`Y${index + 1}`}
                  onChange={(e) => handlePointChange(index, "y", e.target.value)}
                />
              </div>
            ))}
            <input type="number" value={X1target} step="any" placeholder="Input X1" onChange={handleX1target} />

            <div className="button-container">
              <button type="submit" className="calculate">Calculate</button>
              <button type="button" className="calculate" onClick={reset}>Reset</button>
            </div>
          </div>
          <h1>Predicted Value: {result.toFixed(6)}</h1>
          <h2>Regression Equation: {regressionEquation}</h2>
        </form>
      </div>

      <div className="results-container">
        
      </div>
    </div>
  );
}

export default PolynomialRegression;
