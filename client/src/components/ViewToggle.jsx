import PropTypes from "prop-types";
import "../styles/ViewToggle.css";

const ViewToggle = ({ viewMode, toggleViewMode }) => {
  return (
    <div className="view-toggle-container">
      <button onClick={toggleViewMode} className="view-toggle-btn">
        View as {viewMode === "grid" ? "Line" : "Grid"}
      </button>
    </div>
  );
};

ViewToggle.propTypes = {
  viewMode: PropTypes.string.isRequired,
  toggleViewMode: PropTypes.func.isRequired,
};

export default ViewToggle;
