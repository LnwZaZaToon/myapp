
import './App.css';
import Website from './components/webpage/WebPage';
import Bisection from './components/RootofEquation/bisection';
import Falseposition from './components/RootofEquation/Falsepositon';
import Graphical from './components/RootofEquation/graphical';
import Home from './components/webpage/Home';
import OnePoint from './components/RootofEquation/onepoint';
import Newton from './components/RootofEquation/newton';
import Secant from './components/RootofEquation/secant';
import Taylor from './components/RootofEquation/taylor';
import Gaussian from './components/linearalgebra/gaussian';
import GaussianEliminationJordan from './components/linearalgebra/gaussianjordan';
import MatrixInversion from './components/linearalgebra/matrixinversion';
//import Footer from './components/webpage/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
    <BrowserRouter>   
      <Website/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/graphical" element={<Graphical/>} />
          <Route exact path="/bisection" element={<Bisection/>} />
          <Route exact path="/falseposition" element={<Falseposition/>} />
          <Route exact path="/onepoint" element={<OnePoint/>} />
          <Route exact path="/taylor" element={<Taylor/>} />
          <Route exact path="/newton" element={<Newton/>} />
          <Route exact path="/secant" element={<Secant/>} />
          <Route exact path="/gaussian" element={<Gaussian/>} />   
          <Route exact path="/gaussianjordan" element={<GaussianEliminationJordan/>} />   
          <Route exact path="/matrixinversion" element={<MatrixInversion/>} /> 
              
      
        </Routes>  
    </BrowserRouter>
    </div> 
  );
}

export default App;
