import { MenuNavbar } from "./Navbar";
import { useAuth } from "../context/AuthContext";
import { fetchMenuItems } from "../services/auth";
import { useEffect, useState } from "react";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const menu = await fetchMenuItems();
      setMenuItems(menu);
    };

    fetchData();
  });

  // Group available items by category
  const groupedItems = menuItems
    .filter((item) => item.availability)
    .reduce((groups, item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
      return groups;
    }, {});

  return (
    <div className="menu-page">
      <MenuNavbar />
      <div className="menu-body">
        <h1>Our Menu</h1>
        <h2>Authentic Kenyan Dishes</h2>
          {Object.entries(groupedItems).map(([category, items]) => (
            <section key={category} className="menu-section">
              <h1 className="menu-section-header">{category}</h1>
              {items.map((item) => (
                <div key={item.id} className="menu-section-item">
                  <div className="menu-section-description">
                    <img
                      src={item.imageUrl}
                      alt={`${item.name} image`}
                      className="border-radius"
                    />
                    <div className="menu-section-description-text">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <p>
                        <span>Ksh {item.price.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                  <div className="menu-section-cta">
                    <button>Add to orders</button>
                  </div>
                </div>
              ))}
            </section>
          ))}
      </div>
    </div>
  );
};

export default MenuPage;
