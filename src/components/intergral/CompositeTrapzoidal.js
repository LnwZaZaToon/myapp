import { useState , useEffect} from 'react';
import { evaluate,  } from 'mathjs';
var Algebrite = require('algebrite');

function CompositeTrapzoidal() {
    const [Func, setFunc] = useState("4x^5-3x^4+x^3-6x+2");
    const [A, setA] = useState(2);
    const [B, setB] = useState(8);
    const [resultTrap, setResultTrap] = useState(0);
    const [resultNormal, setResultNormal] = useState(0);
    const [Err, setErr] = useState(0);
    const [N, setN] = useState(2);
    const [data, setData] = useState([]);

    const Calculate = (e) => {
        e.preventDefault();
        let n = parseInt(N);
        let a = parseFloat(A);
        let b = parseFloat(B);
        let h = (b - a) / n;
        let I = (h / 2) * (F(a) + F(b) + (2 * Sumodd(n, a, b)));

        let real = RealValue(a, b);
        let err = Math.abs((I - real) / I) * 100;
        setResultTrap(I);
        setResultNormal(real)
        setErr(err);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/Integral');
                const result = await res.json();

                const filteredResult = result.filter(item => item.methodType === "ComTrapzoidal");
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
        const response = await fetch('http://localhost:4000/api/Add-Integral', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                methodType: "ComTrapzoidal",
                equation: Func,
                a: parseFloat(A),
                b: parseFloat(B),
                n: parseFloat(N),
                answer1: parseFloat(resultTrap),
                answer2: parseFloat(resultNormal),
                err: parseFloat(Err)
            }),
        });

        const dbResult = await response.json();
        console.log('Response Status:', response.status);
        console.log('Result from API:', dbResult);

        if (!response.ok) {
            console.error('Failed to save equation:', dbResult.message);
            alert("Fail");
            return;
        }
        alert("Success");
    };

    const Sumodd = (n, a, b) => {
        let sum = 0;
        for (let i = 1; i <= n - 1; i++) {
            sum += F(a + i * (b - a) / n);
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
    const ResetNew = () => {
        setA(0)
        setB(0)
        setResultNormal(0)
        setResultTrap(0)
        setErr(0)
    }
    const handleOptionChangeFunc = async (e) => {
        const selectedEquation = e.target.value;
        const selected = data.find(item => item.equation === selectedEquation);

        if (selected) {
            console.log("Selected err:", selected.err);
            setFunc(selected.equation);
            setA(selected.a)
            setB(selected.b)
            setResultTrap(selected.answer1)
            setResultNormal(selected.answer2)
            setErr(selected.err)

        } else {
            console.error("Selected equation not found in data.");
        }
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
                            <input type='text' step="any" value={Func} onChange={handleFunc} placeholder='Input function' />
                            <input type='number' step="any" value={A} onChange={HandleA} placeholder='Input a' />
                            <input type='number' step="any" value={B} onChange={HandleB} placeholder='Input b' />
                            <input type='number' step="any" value={N} onChange={handleN} placeholder='Input n' />
                        </div>
                        <select onChange={handleOptionChangeFunc} className="option-form">
                            <option value={null}>Equation example</option>
                            {data.map((data) => (
                                <option key={data.id}>
                                    {`${data.equation}`}
                                </option>
                            ))}
                        </select>
                        <div className='button-container'>
                            <button type='submit' className="calculate" >Calculate</button>
                            <button type="button" className="calculate" onClick={ResetNew}>Reset</button>
                            <button type="button" className="calculate" onClick={PostDataBase}>Add Database</button>
                        </div>
                        <div className='Answer'>
                            <h2>Answer of Trapezoidal: {resultTrap.toFixed(2)}</h2>
                            <h2>Answer of Exact value: {resultNormal.toFixed(2)}</h2>
                            <h2>Error: {Err.toFixed(2)}%</h2>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default CompositeTrapzoidal;
