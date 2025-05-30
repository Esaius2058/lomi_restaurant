import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    const navigateToMenu = () => {
        navigate("/menu")
    }
  return (
    <div className="error-page">
      <div className="error-container">
        <h1>404</h1>
        <h2>The page you're looking for doesn't exist.</h2>
        <button className="primary-btn" onClick={navigateToMenu}>
            Back to Menu
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
