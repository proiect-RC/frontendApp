import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const user = localStorage.getItem("user");
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("User logged out successfully!");
  };
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  if (!isHomePage) return null;
  return (
    <>
      <nav className="navbar bg-dark navbar-dark">
        <div className="container">
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className="navbar-brand">Face Recognition App</div>
          </Link>
          <form className="d-flex" role="search">
            <>
              <span className="text-light my-auto me-4">Hello, {user}!</span>

              <Link to={"/"} style={{ textDecoration: "none" }}>
                <button
                  className="btn btn-dark"
                  type="submit"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </Link>
            </>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Header;
