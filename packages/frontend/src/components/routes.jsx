import App from "../App";
import HomePage from "./Home";

const MainRoutes = () => {
  // Define an array of route configurations
  const routes = [
    {
      path: "/", // Root path of the application
      element: <App />, // Main application component that acts as a wrapper
      children: [
        // Nested routes inside App component
        {
          index: true, // Default route when visiting "/"
          element: <HomePage />, // Home page component
        },
      ],
    },
  ];

  return routes; // Return the defined routes
};

export default MainRoutes; // Export the MainRoutes component
