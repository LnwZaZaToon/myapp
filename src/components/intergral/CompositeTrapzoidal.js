import { useState } from 'react';
import { evaluate, re } from 'mathjs';
var Algebrite = require('algebrite');

function CompositeTrapzoidal() {
    const [Func, setFunc] = useState("4x^5-3x^4+x^3-6x+2");
    const [A, setA] = useState(2);
    const [B, setB] = useState(8);
    const [resultTrap, setResultTrap] = useState(0);
    const [resultNormal, setResultNormal] = useState(0);
    const [Err, setErr] = useState(0);
    const [N, setN] = useState(2);
    const [error, setError] = useState('');

    const Calculate = (e) => {
        e.preventDefault();
        let n = parseInt(N);
        let a = parseFloat(A);
        let b = parseFloat(B);
        let h = (b-a) / n;
        let I = (h / 2) * (F(a) + F(b) + (2 * Sumodd(n, a, b)));

        let real = RealValue(a, b);
        let err = Math.abs((I - real) / I) * 100;
        setResultTrap(I);
        setResultNormal(real)
        setErr(err);
    }

    const Sumodd = (n, a, b) => {
        let sum = 0;
        for (let i=1; i<=n-1; i++) {
            sum += F(a+i*(b-a)/n);
        }
        return sum;
    }

    const RealValue = (a, b) => {
        const intgr = Algebrite.integral(Algebrite.eval(Func)).toString();
        return evaluate(intgr, { x: b }) - evaluate(intgr, { x: a });
    }

    const F = (x) => {
        return evaluate(Func, { x });
    }

    const HandleA = (e) => {
        setA(e.target.value);
    }

    const HandleB = (e) => {
        setB(e.target.value);
    }

    const handleFunc = (e) => {
        setFunc(e.target.value);
    }

    const handleN = (e) => {
        setN(e.target.value);
    }
    
    return (
        <div>
            <form onSubmit={Calculate}>
                <div className='FormContainer'>
                    <input type='text' step="any" value={Func} onChange={handleFunc} placeholder='Input function' />
                    <input type='number' step="any" value={A} onChange={HandleA} placeholder='Input a' />
                    <input type='number' step="any" value={B} onChange={HandleB} placeholder='Input b' />
                    <input type='number' step="any" value={N} onChange={handleN} placeholder='Input n' />
                </div>
                <div className='FormButton'>
                    <button type='submit'>Calculate</button>
                </div>
            </form>
            <div className='Answer'>
                <h2>Answer of Trapezoidal: {resultTrap.toFixed(2)}</h2>
                <h2>Answer of Exact value: {resultNormal.toFixed(2)}</h2>
                <h2>Error: {Err.toFixed(2)}%</h2>
            </div>
        </div>
    );
}

export default CompositeTrapzoidal;
