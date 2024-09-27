import { useState } from "react";
import './bisection.css';
import { evaluate } from 'mathjs';
import {Chart as ChartJS} from "chart.js/auto";
import {Line} from "react-chartjs-2";

function Graphical() {
  const [xL, setxL] = useState(0);
  const [xR, setxR] = useState(10);
  const [epsilon, setEpsilon] = useState(0.000001);
  const [func, setfunc] = useState("43x-180");
  const [result, setResult] = useState(0);
  const [table, setTable] = useState([]);

  const Calculate = (e) => {
    e.preventDefault()
    let xl = parseFloat(xL);
    let xr = parseFloat(xR);
    let eps = epsilon
    const F = (x) => evaluate(func, { x })
    const Arraydata = []
    let count = 1
    let y = 0 , z = 0
    let x = 0
    for(let i = xl ; i<= xr; i++){
      if(F(i)*F(i+1)<0){
          y = i;
          x = i
          z = i+1; 
          Arraydata.push({iteration:count++,x})
        }
        Arraydata.push({iteration:count++,x})
      }
      
      if(y==0&&z==0){
        return 0;
      }
      let resultX = 0
      let g= 0;
      for(let i = y; i<=z ; i+= eps){
        if(F(i)*F(i+eps)<0){
          resultX = i;
          x = i;
          Arraydata.push({iteration:count++,x})
          break;
        }
        console.log(g++)
      }
      setResult(resultX)
      console.log(Arraydata)
      setTable(Arraydata)
     
      

  }
  const F = (x) =>{
    return evaluate(func, { x });
  }

  const inputXL = (e) => {
    console.log(e.target.value)
    setxL(e.target.value);
  }
  const inputXR = (e) => {
    console.log(e.target.value)
    setxR(e.target.value);
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
    setxL(0);
    setxR(10);
    setEpsilon(0.000001);
    setfunc("43x-180");
    setResult(0);
    setTable([]);
  }

  return (
    <div>
      <h1 className="form-title">Graphical Method Calculator</h1>
      <form onSubmit={Calculate}>
        <div className="formcontainer">
       
        <div>
          <input type="string" value={func} step="any" id="func" placeholder="input function"  onChange={inputFunc} />
        </div>
        <div>
          <input type="number" value={xL} step="any" id="xl" placeholder="input xl" onChange={inputXL} />
        </div>
        <div>
          <input type="number" value={xR} step="any" id="xr" placeholder="input x2" onChange={inputXR} />
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
      <div className="ChartXm">
        <div className="ChartCon">
        <Line
          data={{
            labels: table.map((_,index) => (index+1).toString()),
            datasets: [
              {
                label: 'X Values',
                data: table.map((element) => element.x),
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

export default Graphical;


