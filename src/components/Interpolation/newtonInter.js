import { useState } from "react";

function NewtonInter() {
    const [Xtarget, setXtarget] = useState(0);
    const [result, setResult] = useState(0);
    const [pointCount, setPointCount] = useState(2);
    const [points, setPoints] = useState([{ x: "", y: "" }, { x: "", y: "" }]); // Default to 2 points

    const CNewton = (x, y, i, j) => {
        if (i === j) {
            return y[i];
        }
        return (CNewton(x, y, i + 1, j) - CNewton(x, y, i, j - 1)) / (x[j] - x[i]);
    };

    const Calculate = (e) => {
        e.preventDefault();

        const xValues = points.map(point => parseFloat(point.x));
        const yValues = points.map(point => parseFloat(point.y));
        let resultLocal = yValues[0];
        let term = 1;

        for (let i = 1; i < pointCount; i++) {
            term *= (Xtarget - xValues[i - 1]);
            resultLocal += CNewton(xValues, yValues, 0, i) * term;
        }

        setResult(resultLocal);
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
        setXtarget(parseFloat(e.target.value));
    };

    const logData = () => {
        console.log(points);
    };

    const ResetNew = () => {
        setXtarget(0);
        setPoints(Array(pointCount).fill({ x: "", y: "" }));
        setResult(0);
    };

    return (
        <div>
            <h1 className="form-title">Newton Interpolation</h1>
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
                    <input type="number" value={Xtarget} step="any" placeholder="Input x" onChange={handleXtarget} />

                    <div className="ButtonCon">
                        <button type="submit" className="calculate">Calculate</button>
                        <button type="button" className="calculate" onClick={ResetNew}>Reset</button>
                    </div>
                </div>
                <button type="button" className="calculate" onClick={logData}>Log</button>
                <h1>Answer: {result.toFixed(6)}</h1>
            </form>
        </div>
    );
}

export default NewtonInter;
