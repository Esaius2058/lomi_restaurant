import NavBar from "./Navbar";
import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <NavBar />
      <div className="home-intro-container">
        <div className="home-intro">
          <div className="home-intro-text">
            <h1>Lomi Restaurant</h1>
            <h2>Kula Local, Kula Fresh</h2>
            <Link to="/orders">
            <button>Order Now</button></Link>
          </div>
          <div className="home-intro-image">
            <img src="/food.jpg" alt="animation" />
          </div>
        </div>
      </div>
      <div className="menu-preview">

      </div>
    </div>
  );
};

export default HomePage;