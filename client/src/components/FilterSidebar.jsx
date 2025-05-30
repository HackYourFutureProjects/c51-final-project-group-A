import { useState } from "react";
import Filter from "./Filter";
import PropTypes from "prop-types";

const CATEGORIES = ["Electronics", "Vehicles", "Home Appliances"];
const CONDITIONS = ["Excellent", "Good", "Fair"];

const FilterSidebar = ({ filters, setFilters }) => {
  const [priceInput, setPriceInput] = useState({
    min: filters.minPrice || "",
    max: filters.maxPrice || "",
  });
  const [durationInput, setDurationInput] = useState({
    min: filters.minDuration || "",
    max: filters.maxDuration || "",
  });
  const [open, setOpen] = useState({
    category: false,
    condition: false,
    availability: false,
    price: false,
    duration: false,
  });

  // Expands/collapses individual filter
  const toggleFilter = (filter) => {
    setOpen((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  // Updates filter state with new value
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Updates filter state for duration and price
  const updateMinMax = (minName, maxName, state) => {
    const minValue = parseFloat(state.min);
    const maxValue = parseFloat(state.max);

    if (!isNaN(minValue) && !isNaN(maxValue) && minValue > maxValue) {
      alert("Minimum price must be less than or equal to maximum price.");
      return;
    }

    setFilters((prev) => ({
      ...prev,
      [minName]: minValue || undefined,
      [maxName]: maxValue || undefined,
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
      <Filter
        title="Availability"
        isOpen={open.availability}
        toggle={() => toggleFilter("availability")}
      >
        <div>
          <input
            type="radio"
            name="availability"
            checked={!filters.availability}
            onChange={() => updateFilter("availability", "")}
          />
          <label>{"All Items"}</label>
        </div>
        <div>
          <input
            type="radio"
            name="availability"
            checked={filters.availability === "true"}
            onChange={() => updateFilter("availability", "true")}
          />
          <label>{"Available Items"}</label>
        </div>
      </Filter>

      {/* CONDITION */}
      <Filter
        title="Condition"
        isOpen={open.condition}
        toggle={() => toggleFilter("condition")}
      >
        <div>
          <input
            type="radio"
            name="condition"
            checked={!filters.condition}
            onChange={() => updateFilter("condition", "")}
          />
          <label>All</label>
        </div>
        {CONDITIONS.map((cond) => (
          <div key={cond}>
            <input
              type="radio"
              name="condition"
              value={cond}
              checked={filters.condition === cond}
              onChange={(e) => updateFilter("condition", e.target.value)}
            />
            <label>{cond}</label>
          </div>
        ))}
      </Filter>

      {/* PRICE */}
      <Filter
        title="Price"
        isOpen={open.price}
        toggle={() => toggleFilter("price")}
      >
        <input
          type="number"
          placeholder="Min"
          value={priceInput.min}
          onChange={(e) =>
            setPriceInput((prev) => ({
              ...prev,
              min: e.target.value,
            }))
          }
        />
        <input
          type="number"
          placeholder="Max"
          value={priceInput.max}
          onChange={(e) =>
            setPriceInput((prev) => ({
              ...prev,
              max: e.target.value,
            }))
          }
        />
        <button
          onClick={() => updateMinMax("minPrice", "maxPrice", priceInput)}
        >
          Apply
        </button>
      </Filter>

      {/* DURATION */}
      <Filter
        title="Rental Period"
        isOpen={open.duration}
        toggle={() => toggleFilter("duration")}
      >
        <input
          type="number"
          placeholder="Min (days)"
          value={durationInput.min}
          onChange={(e) =>
            setDurationInput((prev) => ({
              ...prev,
              min: e.target.value,
            }))
          }
        />
        <input
          type="number"
          placeholder="Max (days)"
          value={durationInput.max}
          onChange={(e) =>
            setDurationInput((prev) => ({
              ...prev,
              max: e.target.value,
            }))
          }
        />
        <button
          onClick={() =>
            updateMinMax("minDuration", "maxDuration", durationInput)
          }
        >
          Apply
        </button>
      </Filter>
    </div>
  );
};

FilterSidebar.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    availability: PropTypes.string,
    condition: PropTypes.string,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    minDuration: PropTypes.number,
    maxDuration: PropTypes.number,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FilterSidebar;
