import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SidebarStyle.css";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  // State to manage categories and subcategories
  const [categories, setCategories] = useState([]);

  // Fetch categories and subcategories from the API
  const { performFetch, cancelFetch } = useFetch("/items", (data) => {
    if (data.success) {
      const items = data.result;
      const categorySet = new Set();
      items.forEach((item) => {
        if (item.category) {
          categorySet.add(item.category);
        }
      });
      setCategories([...categorySet]);
    } else {
      console.error("Failed to fetch items:", data.msg);
    }
  });

  // Fetch categories and subcategories from the API when the component mounts
  useEffect(() => {
    performFetch();
    return cancelFetch; // Cleanup function to cancel fetch on unmount
  }, []);

  const handleSubcategoryClick = (category) => {
    // Navigate to the result page with the selected category
    navigate(`/result?search=${encodeURIComponent(category)}`);
    onClose(); // Close the sidebar after selection
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <h4>Categories</h4>
      <ul>
        {categories.map((cat) => (
          <li key={cat}>
            <div onClick={() => handleSubcategoryClick(cat)}>{cat}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

//  Define prop types for validation and better development experience
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
