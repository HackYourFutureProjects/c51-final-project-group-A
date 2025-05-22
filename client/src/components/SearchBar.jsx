import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SearchBarStyle.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      navigate(`/catalogue?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-form">
      <input
        type="text"
        className="search-input"
        placeholder="Search your item..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Link
        to={`/catalogue?search=${encodeURIComponent(query)}`}
        className="search-button"
        aria-label="Search"
      >
        <FiSearch className="search-icon" />
      </Link>
    </div>
  );
}
