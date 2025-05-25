import NavBar from "./Navbar";

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
                                <p><span>Ksh 120.00</span></p>
                            </div>
                        </div>
                        <div className="menu-section-cta">
                            <button>Add To Orders</button>
                        </div>
                    </div>
                    <div className="menu-section-item">
                        <div className="menu-section-description">
                            <img src="/githeri.png" alt="Githeri image" />
                            <div className="menu-section-description-text">
                                <h3>Githeri</h3>
                                <p>Served with sliced Avocados</p>
                                <p><span>Ksh 90.00</span></p>
                            </div>
                        </div>
                        <div className="menu-section-cta">
                            <button>Add to orders</button>
                        </div>
                    </div>
                    <div className="menu-section-item">
                        <div className="menu-section-description">
                            <img src="/pilau special.png" className="border-radius" alt="Pilau Special image" />
                            <div className="menu-section-description-text">
                                <h3>Pilau Special</h3>
                                <p>Served with kachumbari</p>
                                <p><span>Ksh 120.00</span></p>
                            </div>
                        </div>
                        <div className="menu-section-cta">
                            <button>Add to orders</button>
                        </div>
                    </div>
                    <h1 className="menu-section-header">Snacks</h1>
                    <div className="menu-section-item">
                        <div className="menu-section-description">
                            <img src="/mandazi.png" className="border-radius" alt="mandazi image" />
                            <div className="menu-section-description-text">
                                <h3>Kenyan Andazi</h3>
                                <p>Served with hot Kenyan brewed tea</p>
                                <p><span>Ksh @20.00</span></p>
                            </div>
                        </div>
                        <div className="menu-section-cta">
                            <button>Add to orders</button>
                        </div>
                    </div>
                    <div className="menu-section-item">
                        <div className="menu-section-description">
                            <img src="/samosas.png" className="border-radius" alt="samosa image" />
                            <div className="menu-section-description-text">
                                <h3>Kenyan Samosas</h3>
                                <p>Garnished with corriender</p>
                                <p><span>Ksh @50.00</span></p>
                            </div>
                        </div>
                        <div className="menu-section-cta">
                            <button>Add to orders</button>
                        </div>
                    </div>
                    <div className="menu-section-item">
                        <div className="menu-section-description">
                            <img src="/chapatis.png" className="border-radius" alt="chapati image" />
                            <div className="menu-section-description-text">
                                <h3>Kenyan Chapatis</h3>
                                <p>Best enjoyed hot</p>
                                <p><span>Ksh @20.00</span></p>
                            </div>
                        </div>
                        <div className="menu-section-cta">
                            <button>Add to orders</button>
                        </div>
                    </div>
                    <h1 className="menu-section-header">Drinks</h1>
                    <div className="menu-section-item">
                        <div className="menu-section-description">
                            <img src="/tea.jpg" className="border-radius" alt="tea image" />
                            <div className="menu-section-description-text">
                                <h3>Kenyan Tea</h3>
                                <p>Kenyan brewed tea best enjoyed hot</p>
                                <p><span>Ksh @20.00</span></p>
                            </div>
                        </div>
                        <div className="menu-section-cta">
                            <button>Add to orders</button>
                        </div>
                    </div>
                    <div className="menu-section-item">
                        <div className="menu-section-description">
                            <img src="/soda.png" className="border-radius" alt="soda image" />
                            <div className="menu-section-description-text">
                                <h3>Soda</h3>
                                <p>Best enjoyed chilled</p>
                                <p><span>Ksh @70.00</span></p>
                            </div>
                        </div>
                        <div className="menu-section-cta">
                            <button>Add to orders</button>
                        </div>
                    </div>
                    <div className="menu-section-item">
                        <div className="menu-section-description">
                            <img src="/juice.png" className="border-radius" alt="juice image" />
                            <div className="menu-section-description-text">
                                <h3>Fresh Juice</h3>
                                <p>Best enjoyed chilled</p>
                                <p><span>Ksh @50.00</span></p>
                            </div>
                        </div>
                        <div className="menu-section-cta">
                            <button>Add to orders</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default MenuPage;