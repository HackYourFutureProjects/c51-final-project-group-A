import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "../styles/SidebarStyle.css";


export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  // State to store unique categories
  const [categories, setCategories] = useState([]);

  // URL for fetching items – similar to ResultPage.jsx
  const url = "/items";

  // Fetch data using custom hook
  const { performFetch, cancelFetch } = useFetch(url, (data) => {
    if (data.success) {
      const items = data.result;
      const categorySet = new Set();

      // Extract unique categories from items
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

  // Fetch when URL changes (initially or if changed in the future)
  useEffect(() => {
    performFetch();
    return cancelFetch; // Clean up on component unmount
  }, [url]);

  // When a category is clicked: navigate to result page and close the sidebar
  const handleSubcategoryClick = (category) => {
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

        {categories.map((cat) => (
          <li key={cat}>
            <button onClick={() => handleSubcategoryClick(cat)}>{cat}</button>
          </li>
        ))}

      </ul>
    </div>
  );
}

// PropTypes validation for the Sidebar component

// Define expected props and types for better validation

Sidebar.propTypes = {
  // isOpen: boolean to control the visibility of the sidebar
  // onClose: function to handle closing the sidebar
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
