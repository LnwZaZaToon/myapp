import { useState } from "react";
import { lusolve } from "mathjs";

function LinearRegression() {
  const [X1target, setX1target] = useState(0);
  const [result, setResult] = useState(0);
  const [regressionEquation, setRegressionEquation] = useState("");
  const [pointCount, setPointCount] = useState(2);
  const [points, setPoints] = useState([{ x: "", y: "" }, { x: "", y: "" }]);
  const [plotData, setPlotData] = useState([]);
  const [calculated, setCalculated] = useState(false)

  const Calculate = (e) => {
    e.preventDefault();
    const n = points.length;
    const matrix1 = Array(2).fill(0).map(() => Array(2).fill(0));
    const matrix2 = Array(2).fill(0);

    matrix1[0][0] = n;
    let sumX1 = 0;
    let sumX1Squared = 0;
    let sumY = 0;
    let sumX1Y = 0;

    points.forEach((point) => {
      const x1 = parseFloat(point.x) || 0;
      const y = parseFloat(point.y) || 0;
      sumX1 += x1;
      sumX1Squared += x1 * x1;
      sumY += y;
      sumX1Y += x1 * y;
    });

    matrix1[0][1] = matrix1[1][0] = sumX1;
    matrix1[1][1] = sumX1Squared;
    matrix2[0] = sumY;
    matrix2[1] = sumX1Y;

    const coefficients = lusolve(matrix1, matrix2);
    const intercept = coefficients[0][0];
    const slope = coefficients[1][0];

    setRegressionEquation(`Y = ${intercept.toFixed(4)} + ${slope.toFixed(4)}*X1`);

    const predictedY = intercept + slope * X1target;
    setResult(predictedY);

    const regressionLine = Array.from({ length: 100 }, (_, i) => {
      const x = Math.min(...points.map((p) => parseFloat(p.x) || 0)) + i * 0.1;
      return { x, y: intercept + slope * x };
    });
    setPlotData(regressionLine);
    setCalculated(true)
  };

  const ResetNew = () => {
    setResult(0);
    setRegressionEquation("");
    setPointCount(2);
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

  const handleX1target = (e) => {
    setX1target(parseFloat(e.target.value) || 0);
  };

  return (
    <div className="calculator-container">
      <div className="form-container">
        <div className="form-title">
          <h1>Linear Regression</h1>
        </div>
        <form>
          <div className="inputPoint">
            <input type="number" step="any" placeholder="Input number of points" onChange={handlePointCountChange} />
          </div>
        </form>

        <form onSubmit={Calculate}>
          <div className="formcontainer">
            <div>
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
            </div>
            <input type="number" value={X1target} step="any" placeholder="Input X1" onChange={handleX1target} />

            <div className="button-container">
              <button type="submit" className="calculate">Calculate</button>
              <button type="button" className="calculate" onClick={ResetNew}>Reset</button>
            </div>
          </div>
          <h1>Predicted Value: {result.toFixed(6)}</h1>
          <h2>Regression Equation: {regressionEquation}</h2>
        </form>
      </div>

      <div className="results-container">
        <div className="table-and-chart-graphical">
          {calculated && (
            <div className="chart-container-graphical">
              <Plot
                data={[
                  {
                    x: plotData.map(p => p.x),
                    y: plotData.map(p => p.y),
                    type: "scatter",
                    mode: "lines",
                    line: { color: "blue" },
                    name: "Regression Line",
                  },
                  {
                    x: points.map(p => parseFloat(p.x)),
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
          )}
        </div>
      </div>
    </div>
  );
}

export default LinearRegression;
