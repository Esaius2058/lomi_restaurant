import NavBar from "./Navbar";

const HomePage = () => {
  return (
    <div className="home-page">
      <NavBar />
      <div className="home-intro">
        <div className="home-intro-text">
          <h1>Lomi Restaurant</h1>
          <h2>Kula Local, Kula Fresh</h2>
        </div>
        <div className="home-intro-image">
          <img src="" alt="animation" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;