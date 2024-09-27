
import './App.css';
import Website from './components/webpage/WebPage';
import Bisection from './components/RootofEquation/bisection';
import Falseposition from './components/RootofEquation/Falsepositon';
import Graphical from './components/RootofEquation/graphical';
import Home from './components/webpage/Home';
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
      
        </Routes>  
    </BrowserRouter>
    </div> 
  );
}

export default App;
