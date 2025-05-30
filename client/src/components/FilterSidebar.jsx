import { useState } from "react";
import Filter from "./Filter";
import PropTypes from "prop-types";

const CATEGORIES = ["Electronics", "Vehicles", "Home Appliances"];

const FilterSidebar = ({ filters, setFilters }) => {
  const [open, setOpen] = useState({
    category: false,
    condition: false,
    availability: false,
    price: false,
    duration: false,
  });

  const toggleFilter = (filter) => {
    setOpen((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="filter-sidebar">
      {/* CATEGORIES */}
      <Filter
        title="Category"
        isOpen={open.category}
        toggle={() => toggleFilter("category")}
      >
        <div>
          <input
            type="radio"
            name="category"
            value=""
            checked={!filters.category}
            onChange={() => updateFilter("category", "")}
          />
          <label>All Categories</label>
        </div>
        {CATEGORIES.map((cat) => (
          <div key={cat}>
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filters.category === cat}
              onChange={(e) => updateFilter("category", e.target.value)}
            />
            <label>{cat}</label>
          </div>
        ))}
      </Filter>

      {/* AVAILABILITY */}
    </div>
  );
};

FilterSidebar.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FilterSidebar;
