import "../styles/SidebarStyle.css";
import PropTypes from "prop-types";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <h4>Categories</h4>
      <ul>
        <li>Electronics</li>
        <li>Books</li>
        <li>Clothes</li>
        <li>Home</li>
        <li>Other</li>
      </ul>
    </div>
  );
}
// PropTypes validation for the Sidebar component
Sidebar.propTypes = {
  // isOpen: boolean to control the visibility of the sidebar
  // onClose: function to handle closing the sidebar
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
