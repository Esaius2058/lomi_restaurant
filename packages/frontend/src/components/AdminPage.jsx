import SideBar from "./Sidebar";
import { AdminNavbar } from "./Navbar";
import { useState } from "react";

const AdminPage = () => {
  const [activeButton, setActiveButton] = useState("overview");

  const renderSection = (activeButton) => {
    switch (activeButton) {
      case "overview":
        return <div id="overview" className="dashboard-section"></div>;
      case "orders":
        return <div id="orders" className="dashboard-section"></div>;
      case "menu":
        return <div id="menu" className="dashboard-section"></div>;
      case "customers":
        return <div id="customers" className="dashboard-section"></div>;
      case "staff":
        return <div id="staff" className="dashboard-section"></div>;
      case "deliveries":
        return <div id="deliveries" className="dashboard-section"></div>;
    }
  };
  return (
    <div className="dashboard-page">
      <AdminNavbar />
      <div className="dashboard-body">
        <SideBar
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
        <div className="dashboard-content">
          {/*Dynamically Render Content*/ renderSection(activeButton)}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
