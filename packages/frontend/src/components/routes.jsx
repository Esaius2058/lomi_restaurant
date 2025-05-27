import App from "../App";
import HomePage from "./Home";
import AboutPage from "./About";
import MenuPage from "./Menu";
import SignUp from "./Signup";
import Orders from "./Orders";
import AdminPage from "./Admin";
import Login from "./Login";

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
        {
          path: "about/", // Path for the About page
          element: <AboutPage />, // Placeholder for the About page component
        },
        {
          path: "menu/", // Path for the Menu page
          element: <MenuPage />, // Menu page component
          children: [
            {
              path: "orders",
              element: <Orders />, // Orders page component
            }
          ]
        },
        {
          path: "auth/login",
          element: <Login />,
        },
        {
          path: "auth/signup",
          element: <SignUp />, 
        },
        {
          path: "admin-dashboard",
          element: <AdminPage />
        }
      ],
    },
  ];

  return routes; // Return the defined routes
};

export default MainRoutes; // Export the MainRoutes component
