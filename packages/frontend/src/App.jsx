import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";// Adjust path if needed
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;
