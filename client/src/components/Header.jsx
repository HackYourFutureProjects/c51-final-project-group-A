import { FaBars, FaBell, FaHeart, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import "./Header.css";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Get the token from localStorage to check if the user is logged in
  const token = localStorage.getItem("token");
  // Convert the token to a boolean: if token exists, user is logged in; otherwise, not logged in
  const isLoggedIn = !!token;
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
          <button className="logo-button" onClick={() => navigate("/")}>
            <img src={logo} alt="Company Logo" className="logo" />
          </button>
        </div>
        <div className="center-section">
          <div className="search-bar-inline">
            <SearchBar />
          </div>
        </div>
        <div className="header-right">
          <FaBell className="header-icon" />
          <FaHeart className="header-icon" />
          {isLoggedIn ? (
            // If the user is logged in, show the LogoutButton
            <LogoutButton />
          ) : (
            // If the user is not logged in, show the UserCircle icon that navigates to the auth page
            <FaUserCircle
              className="header-icon"
              onClick={() => navigate("/auth")}
            />
          )}
        </div>
      </div>
      <div className="search-bar-wrapper">
        <SearchBar />
      </div>
    </>
  );
};

export default Header;
