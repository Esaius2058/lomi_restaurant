import{ NavBar} from "./Navbar";

const MenuPage = () => {
    return (
        <div className="menu-page">
            <NavBar />
            <div className="menu-body">
                <h1>Our Menu</h1>
                <h2>Authentic Kenyan Dishes</h2>
                <section className="menu-section">
                    <h1 className="menu-section-header">Main Dishes</h1>
                    <div className="menu-section-item">
                        <div className="menu-section-description">
                            <img src="/ugali-mayai.png" alt="ugali-mayai" />
                            <div className="menu-section-description-text">
                                <h3>Ugali Mayai</h3>
                                <p>Served with sukuma wiki and sliced avocados</p>
                                <p><span>Ksh 120</span></p>
                            </div>
                        </div>
                        <div className="menu-section-cta">
                            
                            <button>Add To Orders</button>
                        </div>
                    </div>
                    <div className="menu-section-item"></div>
                    <div className="menu-section-item"></div>
                </section>
            </div>
        </div>
    );
}

export default MenuPage;