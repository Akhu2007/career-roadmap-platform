import { Link } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  return (
    <header className="header">
      <div className="logo">PathWise AI</div>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/roadmaps">Roadmaps</Link>
          </li>

          <li>
            <Link to="/opportunities">Opportunities</Link>
          </li>

          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>

          {/* Authentication */}
          <li>
            <Link to="/login" className="login-link">
              Login
            </Link>
          </li>

          <li>
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
