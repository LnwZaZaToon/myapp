import './Webpage.css';
import { Link } from 'react-router-dom';

function WebPage() {
  return (
    <div className="OutHeader">
      <div className="InHeader">
        <div className="navBar">     
          <div className="dropdown">
            <a href="#"><li>Root of equation</li></a>
            <div className="dropdown-content">
              <Link to="/bisection">Bisection</Link>
              <Link to="/falseposition">Falseposition</Link>
              <Link to="#">Secant</Link>
            </div>
          </div>
            <div className="dropdown">
              <a href="#"><li>Linear Algebra</li></a>
                <div className="dropdown-content">
                <a href="#">Bisection</a>
                <a href="#">Newton-Raphson</a>
                <a href="#">Secant</a>
              </div>
            </div>
            <a href="#"><li>Interpolation</li></a>
            
        </div>        
      </div>
    </div>
  );
}

export default WebPage;
