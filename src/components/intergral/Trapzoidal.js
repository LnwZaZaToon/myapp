
import { useState } from 'react'
import { evaluate } from 'mathjs';
var Algebrite = require('algebrite')

function Trapzoidal() {
    const [Func,setFunc] = useState("4x^5-3x^4+x^3-6x+2");
    const [A,setA] = useState(0);
    const [B,setB] = useState(0);
    const [resultTrap,setResultTrap] = useState(0);
    const [resultNormal,setResultNormal] = useState(0);
    const [Err,setErr] = useState(0); 


    const Calculate =(e)=>{
        e.preventDefault();
        let a = parseInt(A);
        let b = parseInt(B);
        let h = (b-a)/2;
        let I = (h)*(F(a)+F(b))
        let real = RealValue(a,b);
        //console.log(real)
        let err = Math.abs((I-real)/I)*100;
        setResultNormal(real);
        setResultTrap(I);
        setErr(err);
        

    }

    const RealValue = (a,b) =>{
        const intgr = Algebrite.integral(Algebrite.eval(Func)).toString()
        return evaluate(intgr, { x:b }) - evaluate(intgr, { x:a });
    }

    const F = (x) =>{
        return evaluate(Func, { x });
    }

    const HandleA = (e) =>{
        setA(e.target.value)
    }

    const HandleB = (e) =>{
        setB(e.target.value)
    }
    const handleFunc = (e) =>{
        setFunc(e.target.value)
    }
    return (
        <div>
            <form onSubmit={Calculate}>
                <div className='FormContainer'>
                    <input type='String' step="any" value = {Func} onChange={handleFunc} placeholder ='input function' />
                    <input type='number' step="any" onChange={HandleA} placeholder='input a' />
                    <input type='number' step="any" onChange={HandleB} placeholder='input b' />
                </div>
                <div className='FormButton'>
                    <button type='submit'>Calculate</button>
                </div>
            </form>
            <div className='Answer'>
                <h2>Answer of Trapzoidal {resultTrap.toFixed(2)}</h2>
                <h2>Answer of Exact value {resultNormal.toFixed(2)}</h2>
                <h2>Error {Err.toFixed(2)}%</h2>
            </div>

        </div>
    );

} export default Trapzoidal;

