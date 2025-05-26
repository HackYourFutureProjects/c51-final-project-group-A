import PropTypes from "prop-types";

const ViewToggle = ({ viewMode, toggleViewMode }) => {
  return (
    <div style={{ marginBottom: "1rem", textAlign: "right" }}>
      <button onClick={toggleViewMode} className="view-toggle-btn">
        Switch to {viewMode === "grid" ? "Line" : "Grid"} View
      </button>
    </div>
  );
};

ViewToggle.propTypes = {
  viewMode: PropTypes.string.isRequired,
  toggleViewMode: PropTypes.func.isRequired,
};

export default ViewToggle;
