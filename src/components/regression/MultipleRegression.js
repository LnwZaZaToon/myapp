import { useState } from "react";
import { lusolve } from "mathjs";
import Plot from "react-plotly.js";

function MultipleRegression() {
  const [X1target, setX1target] = useState(0);
  const [result, setResult] = useState(0);
  const [regressionEquation, setRegressionEquation] = useState("");
  const [pointCount, setPointCount] = useState(2);
  const [points, setPoints] = useState([{ x1: "", y: "" }, { x1: "", y: "" }]);
  const [plotData, setPlotData] = useState([]);

  const Calculate = (e) => {
    e.preventDefault();

    const n = points.length;
    const k = 1; // Only one predictor (X1)

    // Initialize matrices
    const matrix1 = Array(k + 1).fill(0).map(() => Array(k + 1).fill(0));
    const matrix2 = Array(k + 1).fill(0);

    // Populate matrix1 and matrix2
    matrix1[0][0] = n; // Number of points
    let sumX1 = 0;
    let sumX1Squared = 0;
    let sumY = 0;
    let sumX1Y = 0;

    points.forEach((point) => {
      const x1 = parseFloat(point.x1);
      const y = parseFloat(point.y);
      sumX1 += x1;
      sumX1Squared += x1 * x1;
      sumY += y;
      sumX1Y += x1 * y;
    });

    matrix1[0][1] = matrix1[1][0] = sumX1;
    matrix1[1][1] = sumX1Squared;
    matrix2[0] = sumY;
    matrix2[1] = sumX1Y;

    // Solve for coefficients
    const coefficients = lusolve(matrix1, matrix2);

    // Calculate predicted value
    const predictedValue = coefficients[0][0] + coefficients[1][0] * parseFloat(X1target);

    // Create regression equation
    const regressionEq = `Y = ${coefficients[0][0].toFixed(2)} + ${coefficients[1][0].toFixed(2)} * X1`;
    setResult(predictedValue);
    setRegressionEquation(regressionEq);

    // Prepare data for plotting
    const newPlotData = points.map((point) => {
      const x1 = parseFloat(point.x1);
      const yPredicted = coefficients[0][0] + coefficients[1][0] * x1;
      return { x: x1, y: yPredicted };
    });
    setPlotData(newPlotData);
  };

  const ResetNew = () => {
    setResult(0);
    setRegressionEquation("");
    setPointCount(2);
    setPoints([{ x1: "", y: "" }, { x1: "", y: "" }]);
    setPlotData([]);
  };

  const handlePointCountChange = (e) => {
    const count = parseInt(e.target.value);
    setPointCount(count);
    const newPoints = Array.from({ length: count }, () => ({ x1: "", y: "" }));
    setPoints(newPoints);
  };

  const handlePointChange = (index, axis, value) => {
    const updatedPoints = [...points];
    updatedPoints[index] = { ...updatedPoints[index], [axis]: value };
    setPoints(updatedPoints);
  };

  const handleX1target = (e) => {
    setX1target(e.target.value);
  };

  return (
    <div>
      <h1 className="form-title">Simple Linear Regression (One Predictor)</h1>
      <form>
        <div className="inputPoint">
          <select value={pointCount} onChange={handlePointCountChange}>
            <option value={2}>2 Points</option>
            <option value={3}>3 Points</option>
            <option value={5}>5 Points</option>
          </select>
        </div>
      </form>

      <form onSubmit={Calculate}>
        <div className="formcontainer">
          <div>
            {points.map((point, index) => (
              <div key={index} className="pointInputs" style={{ display: 'flex' }}>
                <input
                  type="number"
                  value={point.x1}
                  step="any"
                  placeholder={`X1${index + 1}`}
                  onChange={(e) => handlePointChange(index, "x1", e.target.value)}
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
          </div>
          <input type="number" value={X1target} step="any" placeholder="Input X1" onChange={handleX1target} />

          <div className="ButtonCon">
            <button type="submit" className="calculate">Calculate</button>
            <button type="button" className="calculate" onClick={ResetNew}>Reset</button>
          </div>
        </div>
        <h1>Predicted Value: {result.toFixed(6)}</h1>
        <h2>Regression Equation: {regressionEquation}</h2>
      </form>

      {/* Plotly Graph */}
      <Plot
        data={[
          {
            x: plotData.map(p => p.x),
            y: plotData.map(p => p.y),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            name: "Regression Line",
          },
          {
            x: points.map(p => parseFloat(p.x1)),
            y: points.map(p => parseFloat(p.y)),
            type: "scatter",
            mode: "markers",
            marker: { color: "red" },
            name: "Data Points",
          },
        ]}
        layout={{
          title: "Simple Regression Line",
          xaxis: { title: "X1" },
          yaxis: { title: "Y" },
        }}
      />
    </div>
  );
}

export default MultipleRegression;
