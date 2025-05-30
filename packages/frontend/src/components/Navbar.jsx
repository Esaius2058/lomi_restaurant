import { Link } from "react-router-dom";
import { ShoppingCartIcon, CircleUser } from "lucide-react";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="lomi-logo">
          <img
            src={"/icons/lomi_logo.svg"}
            alt={"lomi_logo"}
          />
        </Link>
      </div>
      <div className="nav-links">
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
        <Link to="/" className="lomi-logo">
          <img
            src={"/icons/lomi_logo.svg"}
            alt={"lomi_logo"}
          />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="">Menu</Link>
        <Link to="">About</Link>
        <Link to="">Sign Up</Link>
      </div>
    </nav>
  );
}

function MenuNavbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="lomi-logo">
          <img
            src={"/icons/lomi_logo.svg"}
            alt={"lomi_logo"}
          />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/menu/orders">
          <ShoppingCartIcon size={30} />
        </Link>
        <Link to="">
          <CircleUser size={30} />
        </Link>
      </div>
    </nav>
  );
}

export { NavBar, AdminNavbar, MenuNavbar };
