import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SidebarStyle.css";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  // State to manage categories and subcategories
  // Track which categories are open
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  // Handle subcategory click to navigate to the result page
  const handleSubcategoryClick = (subcategory) => {
    // Navigate to the result page with the selected subcategory
    navigate(`/result?search=${encodeURIComponent(subcategory)}`);
    onClose(); // Close the sidebar after selection
  };

  // Fetch categories and subcategories from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/api/items")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const items = data.result;
          const categoryMap = {};

          items.forEach((item) => {
            const cat = item.category;
            const sub = item.model;

            if (!categoryMap[cat]) categoryMap[cat] = new Set();
            if (sub) categoryMap[cat].add(sub);
          });

          const finalCategories = Object.entries(categoryMap).map(
            ([name, subSet]) => ({
              name,
              subcategories: Array.from(subSet),
            }),
          );

          setCategories(finalCategories);
        } else {
          console.error("Failed to fetch items:", data.msg);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  // Toggle subcategory visibility
  const toggleCategory = (categoryName) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <h4>Categories</h4>
      <ul>
        {categories.map((cat) => (
          <li key={cat.name}>
            <div onClick={() => toggleCategory(cat.name)}>{cat.name}</div>
            {openCategory === cat.name && (
              <ul>
                {cat.subcategories.map((sub) => (
                  <li key={sub} onClick={() => handleSubcategoryClick(sub)}>
                    {sub}
                  </li>
                ))}
              </ul>
            )}
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
