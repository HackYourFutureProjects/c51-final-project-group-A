import { FaBars, FaBell, FaHeart, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import "../styles/HeaderStyle.css";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <div className="left-section">
          <FaBars
            className="menu-icon"
            onClick={() => setIsSidebarOpen(true)}
          />
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
        <div className="center-section">
          <button className="logo-button" onClick={() => navigate("/")}>
            <img src={logo} alt="Company Logo" className="logo" />
          </button>
          <div className="search-bar-inline">
            <SearchBar />
          </div>
        </div>
        <div className="header-right">
          <FaBell className="header-icon" />
          <FaHeart className="header-icon" />
          <FaUserCircle
            className="header-icon"
            onClick={() => navigate("/auth")}
          />
        </div>
      </div>
      <div className="search-bar-wrapper">
        <SearchBar />
      </div>
    </>
  );
};

export default Header;
