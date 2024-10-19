import { useState } from 'react';
import { evaluate, derivative } from 'mathjs';

function Centralh4() {
    const [Func, setFunc] = useState("e^(x/3)+x^2");
    const [X, setX] = useState(-2.5);
    const [H, setH] = useState(0.1);
    const [result, setResult] = useState(0);
    const [resultNormal, setResultNormal] = useState(0);
    const [Err, setErr] = useState(0);
    const [Degree, setDegree] = useState(1);

    const Calculate = (e) => {
        e.preventDefault();
        let degree = Degree;
        let h = parseFloat(H);
        let x = parseFloat(X);
        let real = getDerivative(x, degree);
        let ans = 0;

        switch (degree) {
            case 1:
                ans = (-F(x + 2 * h) + 8 * F(x + h) - 8 * F(x - h) + F(x - 2 * h)) / (12 * h);
                break;
            case 2:
                ans = (-F(x + 2 * h) + 16 * F(x + h) - 30 * F(x) + 16 * F(x - h) - F(x - 2 * h)) / (12 * Math.pow(h, 2));
                break;
            case 3:
                ans = (-F(x + 3 * h) + 8 * F(x + 2 * h) - 13 * F(x + h) + 13 * F(x - h) - 8 * F(x - 2 * h) + F(x - 3 * h)) / (8 * Math.pow(h, 3));
                break;
            case 4:
                ans = (-F(x + 3 * h) + 12 * F(x + 2 * h) - 39 * F(x + h) + 56 * F(x) - 39 * F(x - h) + 12 * F(x - 2 * h) + F(x - 3 * h)) / (6 * Math.pow(h, 4));
                break;
            default:
                break;
        }

        let err = Math.abs((ans - real) / ans) * 100;

        console.log(real);

        setResult(ans);
        setResultNormal(real);
        setErr(err);
    };

    const F = (x) => {
        return evaluate(Func, { x });
    };

    const getDerivative = (x, degree) => {
        let expr = Func;
        for (let i = 0; i < degree; i++) {
            expr = derivative(expr, 'x').toString();
        }
        return evaluate(expr, { x });
    };

    const HandleX = (e) => {
        setX(e.target.value);
    };

    const HandleH = (e) => {
        setH(e.target.value);
    };

    const handleFunc = (e) => {
        setFunc(e.target.value);
    };

    const handleDegree = (e) => {
        const count = parseInt(e.target.value);
        setDegree(count);
    };

    return (
        <div>
            <form onSubmit={Calculate}>
                <div className='FormContainer'>
                    <select onChange={handleDegree} value={Degree}>
                        <option value={1}>1 derivative</option>
                        <option value={2}>2 derivatives</option>
                        <option value={3}>3 derivatives</option>
                        <option value={4}>4 derivatives</option>
                    </select>
                    <input type='text' step="any" value={Func} onChange={handleFunc} placeholder='input function' />
                    <input type='number' step="any" value={X} onChange={HandleX} placeholder='input x' />
                    <input type='number' step="any" value={H} onChange={HandleH} placeholder='input h' />
                </div>
                <div className='FormButton'>
                    <button type='submit'>Calculate</button>
                </div>
            </form>
            <div className='Answer'>
                <h2>Answer of Central: {result.toFixed(6)}</h2>
                <h2>Answer of Exact value: {resultNormal.toFixed(6)}</h2>
                <h2>Error: {Err.toFixed(6)}%</h2>
            </div>
        </div>
    );
}

export default Centralh4;
