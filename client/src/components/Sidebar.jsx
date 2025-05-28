import "../styles/SidebarStyle.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategory";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { categories, loading, error } = useCategories(isOpen);

  const handleCategoryClick = (category) => {
    navigate(`/result?search=${encodeURIComponent(category)}`);
    onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <h4>Categories</h4>
      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : error ? (
          <li>{error}</li>
        ) : categories.length === 0 ? (
          <li>No categories found</li>
        ) : (
          categories.map((cat) => (
            <li key={cat}>
              <button
                className="category-btn"
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
