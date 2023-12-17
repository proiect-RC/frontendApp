import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  if (!isHomePage) return null;
  return (
    <>
      <nav
        className="navbar bg-dark navbar-dark"
        style={{ position: "absolute", bottom: 0, width: "100%" }}
      >
        <div className="container">
          <span className="text-light ms-0">Copyright © Tech Titans</span>
          <span className="text-light mx-auto">PROIECT RC</span>
          <span className="text-light me-0">Grupa 30146</span>
        </div>
      </nav>
    </>
  );
};

export default Footer;
