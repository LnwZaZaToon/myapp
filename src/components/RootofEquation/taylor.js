import { useState } from "react";
import './bisection.css';
import { evaluate ,derivative, factorial, abs, pow } from 'mathjs';
import {Chart as ChartJS} from "chart.js/auto";
import {Line} from "react-chartjs-2";

function Taylor() {
  const [xInnital, setXInnital] = useState(4);
  const [x0Innital, setX0Innital] = useState(2);
  const [N , setN] = useState(0);
  const [func, setfunc] = useState("log(x)");
  const [result, setResult] = useState(0);
  const [table, setTable] = useState([]);

  const Calculate = (e) => {
    e.preventDefault()
    let n = parseFloat(N)
    let x = parseFloat(xInnital)
    let x0 = parseFloat(x0Innital)
    let error = 0
    const Arraydata = []
    let SumTaylor = F(x0)
    let PrimeFuc = func
    for(let i = 0 ; i< n ; i++){
      if(i>0){
        PrimeFuc = derivative(PrimeFuc, 'x')
        let term = PrimeFuc.evaluate({ x:x0 })*(pow((x-x0),i)/factorial(i))
        SumTaylor += term
      }
      error = abs(F(x)-SumTaylor)  
      Arraydata.push({N:i,error:error})
    }
    setResult(error)
    setTable(Arraydata)
  

  }
  const inputN =(e) =>{
    console.log(e.target.event)
    setN(e.target.value)
  }
  const F = (x) =>{
    return evaluate(func, { x });
  }


  const inputXInnital = (e) => {
    console.log(e.target.value)
    setXInnital(e.target.value);
  }
  const inputX0Innital = (e) => {
    console.log(e.target.value)
    setX0Innital(e.target.value);
  }
  const inputFunc = (e) => {
    console.log(e.target.value)
    setfunc(e.target.value);
  }
  const ResetNew = () =>{
    setXInnital(4)
    setX0Innital(2)
    setN(3)
    setfunc("log(x)");
    setResult(0);
    setTable([]);
  }

  return (
    <div>
      <h1 className="form-title">Taylor Series</h1>
      <form onSubmit={Calculate}>
        <div className="formcontainer">
       
        <div>
          <input type="string" value={func} step="any" id="func" placeholder="input function"  onChange={inputFunc} />
        </div>
        <div>
          <input type="number" value={N} step="any" id="xr" placeholder="input n" onChange={inputN} />
        </div>
        <div>
          <input type="number" value={xInnital} step="any" id="xr" placeholder="input x" onChange={inputXInnital} />
        </div>
        <div>
          <input type="number" value={x0Innital}step="any" id="epsilon" placeholder="input x0" onChange={inputX0Innital} />
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
                <th width = "30%"scope="col">N</th>
                <th width="30%">Error</th>
              </tr>
            </thead>
            <tbody>
              {table.map((element, index) => (
                <tr key={index}>
                  <td>{element.N}</td>
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
                label: 'Error value',
                data: table.map((element) => element.error),
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

export default Taylor;


