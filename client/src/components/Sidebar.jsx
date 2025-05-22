import "../styles/SidebarStyle.css";
import PropTypes from "prop-types";

export default function Sidebar({ showSidebar, onClose }) {
  return (
    <aside className={`sidebar ${showSidebar ? "active" : ""}`}>
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
    </aside>
  );
}
Sidebar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
