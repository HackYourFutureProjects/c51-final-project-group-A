// Importing icons from Font Awesome library
import { FaBars, FaBell, FaHeart, FaUserCircle } from "react-icons/fa";
import "../styles/HeaderStyle.css";
import SearchBar from "./SearchBar";

// This component represents the header section of the application
const Header = ({ searchItem, setSearchItem }) => {
  return (
    <div className="header">
      <div className="left-section">
        <FaBars className="menu-icon" />
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

import PropTypes from "prop-types";
Header.propTypes = {
  searchItem: PropTypes.string.isRequired,
  setSearchItem: PropTypes.func.isRequired,
};

export default Header;
