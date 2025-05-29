import App from "../App";
import HomePage from "./Home";
import AboutPage from "./About";
import MenuPage from "./Menu";
import SignUp from "./Signup";
import Orders from "./Orders";
import AdminPage from "./AdminPage";
import Login from "./Login";
import RouteWrapper from "./RouteWrapper";
import ErrorPage from "./ErrorPage";

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
          element: <RouteWrapper />, // Menu page component
          children: [
            {
              path: "",
              element: <MenuPage />
            },
            {
              path: "orders",
              element: <Orders />, // Orders page component
            },
          ],
        },
        {
          path: "auth/", // Path for the Menu page
          element: <RouteWrapper />, // Menu page component
          children: [
            {
              path: "login",
              element: <Login />
            },
            {
              path: "signup",
              element: <SignUp />, // Orders page component
            },
          ],
        },
        {
          path: "admin-dashboard",
          element: <AdminPage />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ];

  return routes; // Return the defined routes
};

export default MainRoutes; // Export the MainRoutes component
