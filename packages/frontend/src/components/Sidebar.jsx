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
          <img src="" alt="overview" className="sidebar-icon" />
          <span>Overview</span>
        </button>
        <button
          className={`sidebar-item ${
            activeButton === "orders" ? "sidebar-active" : ""
          }`}
          name="orders"
          onClick={handleButtonClick}
        >
          <img src="" alt="orders" className="sidebar-icon" />
          <span>Orders</span>
        </button>
        <button
          className={`sidebar-item ${
            activeButton === "menu" ? "sidebar-active" : ""
          }`}
          name="menu"
          onClick={handleButtonClick}
        >
          <img src="" alt="menu" className="sidebar-icon" />
          <span>Menu</span>
        </button>
        <button
          className={`sidebar-item ${
            activeButton === "customers" ? "sidebar-active" : ""
          }`}
          name="customers"
          onClick={handleButtonClick}
        >
          <img src="" alt="customers" className="sidebar-icon" />
          <span>Customers</span>
        </button>
        <button
          className={`sidebar-item ${
            activeButton === "staff" ? "sidebar-active" : ""
          }`}
          name="staff"
          onClick={handleButtonClick}
        >
          <img src="" alt="staff" className="sidebar-icon" />
          <span>Staff</span>
        </button>
        <button
          className={`sidebar-item ${
            activeButton === "deliveries" ? "sidebar-active" : ""
          }`}
          name="deliveries"
          onClick={handleButtonClick}
        >
          <img src="" alt="deliveries" className="sidebar-icon" />
          <span>Deliveries</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
