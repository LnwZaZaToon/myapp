import { useState } from "react";
import './styleInterpolation.css';

function Lagrange() {
  const [Xtarget, setXtarget] = useState(0);
  const [result, setResult] = useState(0);
  const [pointCount, setPointCount] = useState(2); // State to track the selected number of points
  const [points, setPoints] = useState([{ x: "", y: "" }, { x: "", y: "" }]); // State to track points for interpolation

  const Calculate = (e) => {
    e.preventDefault();
    let xFind = parseFloat(Xtarget); // Value for which we want to interpolate
    let result = 0;
    let size = points.length;

    for (let i = 0; i < size; i++) {
      let term = parseFloat(points[i].y); // Get the y value of the current point and convert it to a number
      for (let j = 0; j < size; j++) {
        if (j !== i) {
          term *= (xFind - parseFloat(points[j].x)) / (parseFloat(points[i].x) - parseFloat(points[j].x));
        }
      }
      result += term;
    }

    setResult(result); // Update the result state
  };

  const ResetNew = () => {

    setResult(0);
    setPointCount(2); // Reset to 1 point
    setPoints([{ x: "", y: "" },{ x: "", y: "" }]); // Reset points
  };

  // Update number of points when user changes the selection
  const handlePointCountChange = (e) => {
    const count = parseInt(e.target.value);
    setPointCount(count);
    const newPoints = Array(count).fill({ x: "", y: "" });
    setPoints(newPoints); // Adjust the points array based on the selected number of points
  };

  // Handle input change for each point
  const handlePointChange = (index, axis, value) => {
    const updatedPoints = [...points];
    updatedPoints[index] = { ...updatedPoints[index], [axis]: value };
    setPoints(updatedPoints);
  };

  const handleXtarget = (e) => {
    setXtarget(e.target.value)
  }

  const logData = () => {
    console.log(points)
  }

  return (
    <div className="calculator-container">
      <div className="form-container">
        <div className="form-title" >
          <h1 >Lagrange Method Calculator</h1>
        </div>
        <div className="inputPoint">
          <select value={pointCount} onChange={handlePointCountChange}>
            <option value={2}>2 Point</option>
            <option value={3}>3 Points</option>
            <option value={5}>5 Points</option>
          </select>
        </div>

        <form onSubmit={Calculate}>
          <div className="formcontainer">
            {/* Render input fields dynamically based on the selected number of points */}
            <div>
              {points.map((point, index) => (
                <div key={index} className="pointInputs" style={{ display: 'flex' }}>
                  <input
                    type="number"
                    value={point.x}
                    step="any"
                    placeholder={`x${index + 1}`}
                    onChange={(e) => handlePointChange(index, "x", e.target.value)}
                  />
                  <input
                    type="number"
                    value={point.y}
                    step="any"
                    placeholder={`y${index + 1}`}
                    onChange={(e) => handlePointChange(index, "y", e.target.value)}
                  />
                </div>
              ))}
            </div>
            <input type="number" value={Xtarget} step="any" placeholder="input x" onChange={handleXtarget} />

            <div className="ButtonCon">
              <button type="submit" className="calculate">Calculate</button>
              <button type="button" className="calculate" onClick={ResetNew}>Reset</button>
            </div>
          </div>
          <h1>Answer: {result.toFixed(6)}</h1>
        </form>
      </div>

    </div>

  );
}

export default Lagrange;
