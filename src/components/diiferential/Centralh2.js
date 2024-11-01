import { useState } from 'react';
import { evaluate, derivative } from 'mathjs';

function Centralh2() {
    const [Func, setFunc] = useState("e^x");
    const [X, setX] = useState(2);
    const [H, setH] = useState(0.25);
    const [result, setResult] = useState(0);
    const [resultNormal, setResultNormal] = useState(0);
    const [Err, setErr] = useState(0);
    const [Degree, setDegree] = useState(1);

    const Calculate = (e) => {
        e.preventDefault();
        const num = Degree;
        const h = parseFloat(H);
        const x = parseFloat(X);
        let real = getDerivative(x, num);
        let ans = 0;
        switch (num) {
            case 1:
                ans = (F(x + h) - F(x - h)) / (2 * h);
                break;
            case 2:
                ans = (F(x + h) - 2 * F(x) + F(x - h)) / (h * h);
                break;
            case 3:
                ans = (F(x + 2 * h) - 2 * F(x + h) + 2 * F(x - h) - F(x - 2 * h)) / (2 * h * h * h);
                break;
            case 4:
                ans = (F(x + 2 * h) - 4 * F(x + h) + 6 * F(x) - 4 * F(x - h) + F(x - 2 * h)) / (h * h * h * h);
                break;
            default:
                break;
        }

        // Calculate the error percentage.
        const err = Math.abs((ans - real) / ans) * 100;

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
        const count = parseInt(e.target.value, 10);
        setDegree(count);
    };

    return (
        <div>
            <div className="calculator-container">
                <form onSubmit={Calculate}>
                    <div className="form-container">
                        <div className="form-title" >
                            <h1 >Bisection Method Calculator</h1>
                        </div>
                        <div className='FormContainer'>
                            <select onChange={handleDegree}>
                                <option value={1}>1 derivative</option>
                                <option value={2}>2 derivatives</option>
                                <option value={3}>3 derivatives</option>
                                <option value={4}>4 derivatives</option>
                            </select>
                            <input type='text' value={Func} onChange={handleFunc} placeholder='input function' />
                            <input type='number' step='any' value={X} onChange={HandleX} placeholder='input x' />
                            <input type='number' step='any' value={H} onChange={HandleH} placeholder='input h' />
                        </div>
                        <div className='FormButton'>
                            <button type='submit'>Calculate</button>
                        </div>
                        <div className='Answer'>
                            <h2>Answer of Central Difference: {result.toFixed(6)}</h2>
                            <h2>Exact Value: {resultNormal.toFixed(6)}</h2>
                            <h2>Error: {Err.toFixed(2)}%</h2>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Centralh2;
