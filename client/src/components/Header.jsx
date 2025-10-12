import { FaBars, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./Header.css";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (!isLoggedIn) return; // no need to fetch if not logged in

    fetch("http://localhost:3000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch user data");
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [isLoggedIn, token]);

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <div className="header">
        <div className="header-left">
          <FaBars
            className="menu-icon"
            onClick={() => setIsSidebarOpen(true)}
          />
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <button className="logo-button" onClick={() => navigate("/")}>
            <img src={logo} alt="Company Logo" className="header-logo" />
          </button>
        </div>

        <div className="header-center">
          <SearchBar />
        </div>

        <div className="header-right">
          <FaUserCircle
            className="header-icon"
            onClick={handleUserClick}
            title={isLoggedIn ? user?.firstName || "Profile" : "Login"}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
