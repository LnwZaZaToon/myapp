import { useState } from 'react';
import { evaluate } from 'mathjs';
var Algebrite = require('algebrite');

function CompositeSimpson() {
    const [Func, setFunc] = useState("x^7+2x^3-1");
    const [A, setA] = useState(-1);
    const [B, setB] = useState(2);
    const [resultSimpson, setResultSimpson] = useState(0);
    const [resultNormal, setResultNormal] = useState(0);
    const [Err, setErr] = useState(0);
    const [N, setN] = useState(2); // Number of subintervals
    const [error, setError] = useState('');

    const Calculate = (e) => {
        e.preventDefault();
        if (error) {
            return; // Prevent calculation if there's an error
        }

        let a = parseFloat(A);
        let b = parseFloat(B);
        let n = parseInt(N); // Ensure n is an integer
        if (n % 2 !== 0) {
            setError("N must be even.");
            return;
        }
        let h = ((b - a) / n)/2;
        let I = (h / 3) * (F(a) + F(b) + 4 * SumOdd(n, a, h) + 2 * SumEven(n, a, h));
        console.log(h)
        let real = RealValue(a, b);
        let err = Math.abs((I - real) / real) * 100; // Use real for error calculation
        setResultSimpson(I);
        setResultNormal(real);
        setErr(err);
    }

    const SumOdd = (n, a, h) => {
        let sum = 0;
        for (let i = 1; i < n; i += 2) {
            sum += F(a + i * h);
        }
        return sum;
    }

    const SumEven = (n, a, h) => {
        let sum = 0;
        for (let i = 2; i < n; i += 2) {
            sum += F(a + i * h);
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
        const value = e.target.value;
        setN(value);
        if (value && value % 2 !== 0) {
            setError('Please enter an even number for N.');
        } else {
            setError('');
        }
    }

    return (
        <div>
            <form onSubmit={Calculate}>
                <div className='FormContainer'>
                    <input type='text' step="any" value={Func} onChange={handleFunc} placeholder='Input function' />
                    <input type='number' step="any" value={A} onChange={HandleA} placeholder='Input a' />
                    <input type='number' step="any" value={B} onChange={HandleB} placeholder='Input b' />
                    <input type='number' step="1" value={N} onChange={handleN} placeholder='Input N (even)' />
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if N is not even */}
                </div>
                <div className='FormButton'>
                    <button type='submit' disabled={!!error}>Calculate</button> {/* Disable button if there's an error */}
                </div>
            </form>
            <div className='Answer'>
                <h2>Answer of Simpson: {resultSimpson.toFixed(2)}</h2>
                <h2>Answer of Exact value: {resultNormal.toFixed(2)}</h2>
                <h2>Error: {Err.toFixed(2)}%</h2>
            </div>
        </div>
    );
}

export default CompositeSimpson;
