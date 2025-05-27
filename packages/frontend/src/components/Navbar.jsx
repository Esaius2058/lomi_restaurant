import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={"/lomi_logo.svg"} alt={"lomi_logo"} className="lomi-logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/auth/signup">Sign Up</Link>
      </div>
    </nav>
  );
}

function AdminNavbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={"/lomi_logo.svg"} alt={"lomi_logo"} className="lomi-logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="">Menu</Link>
        <Link to="">About</Link>
        <Link to="">Sign Up</Link>
      </div>
    </nav>
  );
}

export { NavBar, AdminNavbar };
