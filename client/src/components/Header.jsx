// Importing icons from Font Awesome library
import { FaBars, FaBell, FaHeart, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import "../styles/HeaderStyle.css";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";

// This component represents the header section of the application
const Header = ({ searchItem, setSearchItem }) => {
  // State to manage the sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="header">
      <div className="left-section">
        <FaBars className="menu-icon" onClick={() => setSidebarOpen(true)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <span className="logo">Share with us</span>
      </div>
      <div className="search-bar">
        <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} />
      </div>
      <div className="header-right">
        <FaBell className="header-icon" />
        <FaHeart className="header-icon" />
        <FaUserCircle className="header-icon" />
      </div>
    </div>
  );
};

Header.propTypes = {
  searchItem: PropTypes.string.isRequired,
  setSearchItem: PropTypes.func.isRequired,
};

export default Header;
