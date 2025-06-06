import { NavBar } from "./Navbar";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                
                <p>Follow us on social media for the latest updates!</p>
                <ul className="footer-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
                    
                </ul>
                <p>&copy; {new Date().getFullYear()} Lomi. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;