import { ChartPie, SquareMenu, Logs, Users, TruckElectric } from "lucide-react";

const SideBar = ({ activeButton, setActiveButton }) => {
  const handleButtonClick = (event) => {
    const buttonName = event.currentTarget.name;
    setActiveButton(buttonName);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-items">
        <button
          className={`sidebar-item ${
            activeButton === "overview" ? "sidebar-active" : ""
          }`}
          name="overview"
          onClick={handleButtonClick}
        >
          <ChartPie />
          <span>Overview</span>
        </button>
        <button
          className={`sidebar-item ${
            activeButton === "orders" ? "sidebar-active" : ""
          }`}
          name="orders"
          onClick={handleButtonClick}
        >
          <Logs />
          <span>Orders</span>
        </button>
        <button
          className={`sidebar-item ${
            activeButton === "menu" ? "sidebar-active" : ""
          }`}
          name="menu"
          onClick={handleButtonClick}
        >
          <SquareMenu />
          <span>Menu</span>
        </button>
        <button
          className={`sidebar-item ${
            activeButton === "customers" ? "sidebar-active" : ""
          }`}
          name="customers"
          onClick={handleButtonClick}
        >
          <Users />
          <span>Customers</span>
        </button>
        <button
          className={`sidebar-item ${
            activeButton === "staff" ? "sidebar-active" : ""
          }`}
          name="staff"
          onClick={handleButtonClick}
        >
          <img src="/icons/staff.svg" alt="staff" className="sidebar-icon" />
          <span>Staff</span>
        </button>
        <button
          className={`sidebar-item ${
            activeButton === "deliveries" ? "sidebar-active" : ""
          }`}
          name="deliveries"
          onClick={handleButtonClick}
        >
          <TruckElectric />
          <span>Deliveries</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
