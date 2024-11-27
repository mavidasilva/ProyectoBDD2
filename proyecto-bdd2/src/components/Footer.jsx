import { useLocation } from "react-router-dom";
import { FaInstagram, FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { BsTiktok } from "react-icons/bs";
import venupLogo from "/venUp.png";

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="footer">
      <p>Redes Sociales - KFC</p>
      <div className="footer-right-icons">
        <a
          href="https://www.instagram.com/kfcvzla/?hl=es"
          className="text-white"
        >
          <FaInstagram />
        </a>
        <a href="#" className="text-white">
          <FaWhatsapp />
        </a>
        <a
          href="https://www.tiktok.com/@kfc_vzla_oficial"
          className="text-white"
        >
          <BsTiktok />
        </a>
        <a href="https://x.com/KFC_VZLA" className="text-white">
          <FaTwitter />
        </a>
        <a
          href="https://www.facebook.com/KFCVzla/?locale=es_LA"
          className="text-white"
        >
          <FaFacebook />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
