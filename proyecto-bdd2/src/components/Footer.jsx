import { useLocation } from "react-router-dom";
import { FaInstagram, FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { BsTiktok } from "react-icons/bs";
import venupLogo from "/venUp.png";

const Footer = () => {
  const location = useLocation();

  if (location.pathname.includes("/productos")) {
    return (
      <footer className="bg-red-600 text-white py-4 text-center mt-auto">
        <div className="container mx-auto flex items-center justify-center">
          <img src={venupLogo} alt="VenUp Logo" className="footer-logo mb-2" />
          <p className="text-center ml-2">Derechos Reservados</p>
        </div>
      </footer>
    );
  }

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
