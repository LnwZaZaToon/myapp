import { useState } from "react";
import './bisection.css';
import { evaluate ,derivative } from 'mathjs';
import {Chart as ChartJS} from "chart.js/auto";
import {Line} from "react-chartjs-2";

function Secant() {
  const [XZero, setXZero] = useState(2);
  const [XOne, setXOne] = useState(3);
  const [epsilon, setEpsilon] = useState(0.0001);
  const [func, setfunc] = useState("x^2-7");
  const [result, setResult] = useState(0);
  const [table, setTable] = useState([]);

  const Calculate = (e) => {
    e.preventDefault()
    let eps = epsilon
    let x0 = parseFloat(XZero)
    let x1 = parseFloat(XOne)
    let xI = 0;
    let error = 1, i = 0
    const Arraydata = []
    Arraydata.push({iteration: i ,xI,error})
    while (error > eps) {
        xI = Formula(x0,x1)
        error = Math.abs(xI-x1)
        Arraydata.push({iteration:i+1,xI,error})
        x0 = x1
        x1 = xI
        i++
    }
    setResult(xI)
    setTable(Arraydata)

  }
  const F = (x) =>{
    return evaluate(func, { x });
  }
  const Formula = (x0 , x1) => {
    return x1 - ((F(x1)*(x0-x1))/(F(x0)-F(x1)));
  }

  const inputXZero = (e) => {
    console.log(e.target.value)
    setXZero(e.target.value);
  }

  const inputXOne = (e) => {
    console.log(e.target.value)
    setXOne(e.target.value);
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
    setXZero(2);
    setXOne(3);
    setEpsilon(0.0001);
    setfunc("x^2-7");
    setResult(0);
    setTable([]);
  }

  return (
    <div>
      <h1 className="form-title">Secant  Method Calculator</h1>
      <form onSubmit={Calculate}>
        <div className="formcontainer">
       
        <div>
          <input type="string" value={func} step="any" id="func" placeholder="input function"  onChange={inputFunc} />
        </div>
        <div>
          <input type="number" value={XZero} step="any" id="xr" placeholder="input innitial x" onChange={inputXZero} />
        </div>
        <div>
          <input type="number" value={XOne} step="any" id="xr" placeholder="input innitial x" onChange={inputXOne} />
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

export default Secant;


