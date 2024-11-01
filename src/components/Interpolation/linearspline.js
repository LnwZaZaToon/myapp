import { useState } from "react";

function LinearSpline() {
  const [Xtarget, setXtarget] = useState(0);
  const [result, setResult] = useState(0);
  const [pointCount, setPointCount] = useState(2);
  const [points, setPoints] = useState([{ x: "", y: "" }, { x: "", y: "" }]);

  const Calculate = (e) => {
    e.preventDefault();
    let xFind = parseFloat(Xtarget); // Value for which we want to interpolate
    let size = points.length;
    let result = null;

    // Find the segment containing xFind
    for (let i = 0; i < size - 1; i++) {
      let x1 = parseFloat(points[i].x);
      let x2 = parseFloat(points[i + 1].x);
      let y1 = parseFloat(points[i].y);
      let y2 = parseFloat(points[i + 1].y);

      // Check if xFind is between x1 and x2
      if (xFind >= x1 && xFind <= x2) {
        // Linear interpolation formula
        result = y1 + ((y2 - y1) / (x2 - x1)) * (xFind - x1);
        break;
      }
    }

    // If result is still null, it means xFind is outside the range of x values
    if (result === null) {
      result = NaN; // or handle out-of-bounds case as needed
    }

    setResult(result); // Update the result state
  };

  const ResetNew = () => {
    setResult(0);
    setPointCount(2); // Reset to 2 points
    setPoints([{ x: "", y: "" }, { x: "", y: "" }]); // Reset points
  };

  const handlePointCountChange = (e) => {
    const count = parseInt(e.target.value);
    setPointCount(count);
    const newPoints = Array(count).fill({ x: "", y: "" });
    setPoints(newPoints);
  };

  const handlePointChange = (index, axis, value) => {
    const updatedPoints = [...points];
    updatedPoints[index] = { ...updatedPoints[index], [axis]: value };
    setPoints(updatedPoints);
  };

  const handleXtarget = (e) => {
    setXtarget(e.target.value);
  };

  const logData = () => {
    console.log(points);
  };

  return (
    <div>
      <h1 className="form-title">Linear Spline Interpolation</h1>
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
        <button type="button" className="calculate" onClick={logData}>log</button>
        <h1>Answer: {isNaN(result) ? "Out of Bounds" : result.toFixed(6)}</h1>
      </form>
    </div>
  );
}

export default LinearSpline;
