import { FaBars, FaBell, FaHeart, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import "./Header.css";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = ({ searchItem, setSearchItem }) => {
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
            <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} />
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
        <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} />
      </div>
    </>
  );
};

Header.propTypes = {
  searchItem: PropTypes.string.isRequired,
  setSearchItem: PropTypes.func.isRequired,
};

export default Header;
