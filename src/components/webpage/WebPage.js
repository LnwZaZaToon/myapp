import './Webpage.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function WebPage() {
  return (
    
    <div className="OutHeader">
      <div className="InHeader">
        <div className="navBar">     
          <div className="dropdown">
            <a href="#"><li>Root of equation</li></a>
            <div className="dropdown-content">
              <Link to="/graphical">graphical</Link>
              <Link to="/bisection">Bisection</Link>
              <Link to="/falseposition">Falseposition</Link>
              <Link to="/onepoint">Onepoint</Link>
              <Link to="/taylor">Taylor Series</Link>
              <Link to="/newton">Newton</Link>
              <Link to="/secant">Secant</Link>
            </div>
          </div>
            <div className="dropdown">
              <a href="#"><li>Linear Algebra</li></a>
              <div className="dropdown-content">
              <Link to="/cramer">Cramer</Link>
                <Link to="/gaussian">GaussianElimation</Link>
                <Link to="/gaussianjordan">GaussianElimationJordan</Link>
                <Link to="/matrixinversion">MatrixInversion</Link>
                
                
              </div>
            </div>
            <div className="dropdown">
              <a href="#"><li>Linear Algebra</li></a>
              <div className="dropdown-content">
                <Link to="/lagrange">lagrange</Link>
                <Link to="/newtonInterpolation">Newton</Link>
                
                
              </div>
            </div>
            <div className="dropdown">
              <a href="#"><li>Integral</li></a>
              <div className="dropdown-content">
                <Link to="/Trapzoidal">Trapzoidal</Link>
                <Link to="/CompositeTrapzoidal">CompositeTrapzoidal</Link>
                <Link to="/Simpson">Simpson</Link>
                <Link to="/CompositeSimpson">CompositeSimpson</Link>
                
                
              </div>
            </div>
            
        </div>        
      </div>
    </div>
    
  );
}

export default WebPage;
