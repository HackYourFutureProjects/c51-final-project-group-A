import PropTypes from "prop-types";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SearchBarStyle.css";

export default function SearchBar({ searchItem, setSearchItem }) {
  // Local state to store the search query
  const [query, setQuery] = useState("");

  // Hook to programmatically navigate to another page
  const navigate = useNavigate();

  // Handles "Enter" key press to trigger navigation to catalogue page with search query
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      navigate(`/result?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-form">
      <input
        type="text"
        className="search-input"
        placeholder="Search your item..."
        value={searchItem || query}
        onChange={(e) =>
          setQuery(e.target.value) || setSearchItem(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />

      <Link
        to={`/result?search=${encodeURIComponent(query)}`}
        className="search-button"
        aria-label="Search"
      >
        <FiSearch className="search-icon" />
      </Link>
    </div>
  );
}

SearchBar.propTypes = {
  searchItem: PropTypes.string.isRequired,
  setSearchItem: PropTypes.func.isRequired,
};
