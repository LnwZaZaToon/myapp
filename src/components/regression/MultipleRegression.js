import { useState , useEffect} from "react";
import { lusolve } from "mathjs";
import { Line } from "react-chartjs-2";

function MultipleRegression() {
  const [X1target, setX1target] = useState(0);
  const [X2target, setX2target] = useState(0);
  const [result, setResult] = useState(0);
  const [regressionEquation, setRegressionEquation] = useState("");
  const [pointCount, setPointCount] = useState(2);
  const [points, setPoints] = useState([{ x1: "", x2: "", y: "" }, { x1: "", x2: "", y: "" }]);
  const [plotData, setPlotData] = useState([]);
  const [calculated, setCalculated] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/Regression');
        const result = await res.json();

        //เช็คว่า type เหมือนกันไหม
        const filteredResult = result.filter(item => item.methodType === "MultipleRegression");
        setData(filteredResult);

        console.log(filteredResult);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  const PostDataBase = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/Add-Regression', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        methodType: "MultipleRegression",
        result,
        regressionEquation,
        points,
        plotData,
        X1target,
        X2target,
      }),
    });

    const dbResult = await response.json();
    console.log('Response Status:', response.status);
    console.log('Result from API:', dbResult);

    if (!response.ok) {
      console.error('Failed to save equation:', dbResult.message);
      alert("Fail")
      return;
    }
    alert("Success")
  }

  const Calculate = (e) => {
    e.preventDefault();
    const n = points.length;
    const k = 2; // Two predictors

    // Initialize matrices
    const matrix1 = Array(k + 1).fill(0).map(() => Array(k + 1).fill(0));
    const matrix2 = Array(k + 1).fill(0);

    // Populate matrix1 and matrix2
    matrix1[0][0] = n; // Number of points
    let sumX1 = 0;
    let sumX2 = 0;
    let sumY = 0;
    let sumX1Y = 0;
    let sumX2Y = 0;
    let sumX1Squared = 0;
    let sumX2Squared = 0;
    let sumX1X2 = 0;

    points.forEach((point) => {
      const x1 = parseFloat(point.x1) || 0;
      const x2 = parseFloat(point.x2) || 0;
      const y = parseFloat(point.y) || 0;
      sumX1 += x1;
      sumX2 += x2;
      sumY += y;
      sumX1Y += x1 * y;
      sumX2Y += x2 * y;
      sumX1Squared += x1 * x1;
      sumX2Squared += x2 * x2;
      sumX1X2 += x1 * x2;
    });

    matrix1[0][1] = matrix1[1][0] = sumX1;
    matrix1[0][2] = matrix1[2][0] = sumX2;
    matrix1[1][1] = sumX1Squared;
    matrix1[1][2] = matrix1[2][1] = sumX1X2;
    matrix1[2][2] = sumX2Squared;
    matrix2[0] = sumY;
    matrix2[1] = sumX1Y;
    matrix2[2] = sumX2Y;

    const coefficients = lusolve(matrix1, matrix2);
    const intercept = coefficients[0][0];
    const slopeX1 = coefficients[1][0];
    const slopeX2 = coefficients[2][0];

    const predictedValue = intercept + slopeX1 * parseFloat(X1target) + slopeX2 * parseFloat(X2target);
    setResult(predictedValue);

    const regressionEq = `Y = ${intercept.toFixed(2)} + ${slopeX1.toFixed(2)} * X1 + ${slopeX2.toFixed(2)} * X2`;
    setRegressionEquation(regressionEq);

    // Generate plot data
    const newPlotData = points.map((point) => {
      const x1 = parseFloat(point.x1) || 0;
      const x2 = parseFloat(point.x2) || 0;
      const yPredicted = intercept + slopeX1 * x1 + slopeX2 * x2;
      return { x1, x2, y: yPredicted };
    });

    setPlotData(newPlotData);
    setCalculated(true);
  };

  const ResetNew = () => {
    setResult(0);
    setRegressionEquation("");
    setPointCount(2);
    setPoints([{ x1: "", x2: "", y: "" }, { x1: "", x2: "", y: "" }]);
    setPlotData([]);
    setCalculated(false);
  };

  const handlePointCountChange = (e) => {
    const count = parseInt(e.target.value) || 2;
    setPointCount(count);
    const newPoints = Array.from({ length: count }, () => ({ x1: "", x2: "", y: "" }));
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

  const handleX2target = (e) => {
    setX2target(e.target.value);
  };

  const chartData = {
    datasets: [
      {
        label: 'Predicted Values',
        data: plotData.map((point) => ({ x: point.x1, y: point.y })),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
        showLine: true,
      },
      {
        label: 'Data Points',
        data: points.map((point) => ({ x: parseFloat(point.x1) || 0, y: parseFloat(point.y) || 0 })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointRadius: 4,
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'X1'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Y'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Multiple Regression Plot'
      },
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  const handleOptionChangeFunc = async (e) => {
    const selectedEquation = e.target.value;
    const selected = data.find(item => item.regressionEquation === selectedEquation);

    if (selected) {
      setX1target(selected.X1target);
      setX2target(selected.X2target);
      setPoints(selected.points);
      setResult(selected.result);
      setPointCount(selected.points.length);
      setRegressionEquation(selected.regressionEquation);
      setPlotData(selected.plotData)
      setCalculated(true)
    } else {
      console.error("Selected equation not found in data.");
    }
  };


  return (
    <div className="calculator-container">
      <div className="form-container">
        <div className="form-title">
          <h1>Linear Regression</h1>
        </div>
        <form onSubmit={Calculate}>
          <div className="inputPoint">
            <select value={pointCount} onChange={handlePointCountChange}>
              <option value={2}>2 Points</option>
              <option value={3}>3 Points</option>
              <option value={5}>5 Points</option>
            </select>
          </div>
          <div className="formcontainer">
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
                  value={point.x2}
                  step="any"
                  placeholder={`X2${index + 1}`}
                  onChange={(e) => handlePointChange(index, "x2", e.target.value)}
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
            <input type="number" value={X2target} step="any" placeholder="Input X2" onChange={handleX2target} />
            <select onChange={handleOptionChangeFunc} className="option-form">
              <option value="">Equation example</option>
              {data.map((item) => (
                <option key={item.id} value={item.regressionEquation}>
                  {`Answer: ${item.regressionEquation}`}
                </option>
              ))}
            </select>
            <div className="button-container">
              <button type="submit" className="calculate">Calculate</button>
              <button type="button" className="calculate" onClick={ResetNew}>Reset</button>
              <button type="button" className="calculate" onClick={PostDataBase}>Add Database</button>
            </div>
          </div>
          <h1>Predicted Value: {result.toFixed(6)}</h1>
          <h2>Regression Equation: {regressionEquation}</h2>
        </form>

        <div className="table">
          {calculated && (
            <Line data={chartData} options={options} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MultipleRegression;
