import { useState } from "react";
import './bisection.css';
import { evaluate ,derivative } from 'mathjs';
import {Chart as ChartJS} from "chart.js/auto";
import {Line} from "react-chartjs-2";

function Newton() {
  const [xInnital, setXInnital] = useState(2);
  const [epsilon, setEpsilon] = useState(0.0001);
  const [func, setfunc] = useState("x^2-7");
  const [result, setResult] = useState(0);
  const [table, setTable] = useState([]);

  const Calculate = (e) => {
    e.preventDefault()
    let innitial = parseFloat(xInnital)
    let eps = epsilon
    let xI = innitial
    let xold = 0
    let error = 1, i = 0
    const Arraydata = []
    Arraydata.push({iteration: i ,xI,error})
    while (error > eps) {
        xold = xI
        xI = xI-(F(xI)/FDerivative(xI))
        error = Math.abs(xI-xold)
        Arraydata.push({iteration:i+1,xI,error})
        i++
    }
    setResult(xI)
    setTable(Arraydata)

  }
  const F = (x) =>{
    return evaluate(func, { x });
  }
  const FDerivative = (x) => {
    const expr = derivative(func, 'x')
    return expr.evaluate({ x })
  }

  const inputXInnital = (e) => {
    console.log(e.target.value)
    setXInnital(e.target.value);
  }
  const inputEp = (e) => {
    console.log(e.target.value)
    setEpsilon(e.target.value);
  }
  const inputFunc = (e) => {
    console.log(e.target.value)
    setfunc(e.target.value);
  }
  const ResetNew = () =>{
    setXInnital(2);
    setEpsilon(0.0001);
    setfunc("x^2-7");
    setResult(0);
    setTable([]);
  }

  return (
    <div>
      <h1 className="form-title">Newton  Method Calculator</h1>
      <form onSubmit={Calculate}>
        <div className="formcontainer">
       
        <div>
          <input type="string" value={func} step="any" id="func" placeholder="input function"  onChange={inputFunc} />
        </div>
        <div>
          <input type="number" value={xInnital} step="any" id="xr" placeholder="input innitial x" onChange={inputXInnital} />
        </div>
        <div>
          <input type="number" value={epsilon}step="any" id="epsilon" placeholder="input epsilon" onChange={inputEp} />
        </div>
        <div className="ButtonCon">
          <button type="submit" className="calculate">Calculate</button>
          <button type="button" className="calculate" onClick={ResetNew}>Reset</button>
        </div>
        </div>
        <h1>Answer: {result.toFixed(6)}</h1>
      </form>
      <div className="tablecon">
        {table.length > 0 && (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Iteration</th>
                <th width="30%">X</th>
                <th width="30%">Error</th>
              </tr>
            </thead>
            <tbody>
              {table.map((element, index) => (
                <tr key={index}>
                  <td>{element.iteration}</td>
                  <td>{element.xI.toFixed(6)}</td>
                  <td>{element.error.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="ChartXm">
        <div className="ChartCon">
        <Line
          data={{
            labels: table.map((_,index) => (index).toString()),
            datasets: [
              {
                label: 'X Values',
                data: table.map((element) => element.xI),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}     
        />
        </div>
      </div>
    </div>
  )

}

export default Newton;


