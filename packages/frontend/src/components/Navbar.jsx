import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={"/lomi_logo.svg"} alt={"lomi_logo"} className="lomi-logo"/>
      </div>
      <div className="nav-links">
        <Link>Home</Link>
        <Link>Menu</Link>
        <Link>About</Link>
        <Link>Sign Up</Link>
      </div>
    </nav>
  );
}

export default NavBar;