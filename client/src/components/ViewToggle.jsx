import PropTypes from "prop-types";
import "../styles/ViewToggle.css";

const ViewToggle = ({ viewMode, toggleViewMode, setFilters }) => {
  // Sets page size filter
  const handlePageSize = (value) => {
    setFilters((prev) => ({
      ...prev,
      limit: parseInt(value),
      page: 1,
    }));
  };

  // Sets sorting filters
  const handleSorting = (options) => {
    const sortObject = JSON.parse(options);
    setFilters((prev) => ({
      ...prev,
      sortBy: sortObject.sortBy,
      sortOrder: sortObject.sortOrder,
    }));
  };

  return (
    <div className="view-toggle-container">
      {/* ITEMS PER PAGE */}
      <div>
        <label htmlFor="itemsPerPage">Display:</label>
        <select
          defaultValue={10}
          name="itemsPerPage"
          id="itemsPerPage"
          onChange={(e) => handlePageSize(e.target.value)}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* SORT */}
      <div>
        <label htmlFor="sorting">Sort:</label>
        <select
          defaultValue={JSON.stringify({
            sortBy: "createdAt",
            sortOrder: "desc",
          })}
          name="sorting"
          id="sorting"
          onChange={(e) => handleSorting(e.target.value)}
        >
          <option
            value={JSON.stringify({ sortBy: "createdAt", sortOrder: "desc" })}
          >
            {"Newest"}
          </option>
          <option value={JSON.stringify({ sortBy: "price", sortOrder: "asc" })}>
            {"Price Ascending"}
          </option>
          <option
            value={JSON.stringify({ sortBy: "price", sortOrder: "desc" })}
          >
            {"Price Descending"}
          </option>
        </select>
      </div>

      {/* TOGGLE VIEW MODE */}
      <div>
        <button onClick={toggleViewMode} className="view-toggle-btn">
          View as {viewMode === "grid" ? "Line" : "Grid"}
        </button>
      </div>
    </div>
  );
};

ViewToggle.propTypes = {
  viewMode: PropTypes.string.isRequired,
  toggleViewMode: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default ViewToggle;
