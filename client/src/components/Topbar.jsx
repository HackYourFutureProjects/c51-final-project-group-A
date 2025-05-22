import "../styles/TopbarStyle.css";

import SearchBar from "./SearchBar";
import { FiBell, FiHeart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Topbar({ toggleSidebar }) {
  return (
    <header className="topbar">
      <button className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </button>

      <div className="topbar-logo">Share With Us</div>
      <SearchBar />
      <div className="topbar-buttons">
        <Link to="/notifications" className="topbar-icon">
          <FiBell size={20} />
        </Link>
        <Link to="/favorites" className="topbar-icon">
          <FiHeart size={20} />
        </Link>
        <Link to="/login" className="topbar-icon">
          <FiUser size={20} />
        </Link>
      </div>
    </header>
  );
}

Topbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
