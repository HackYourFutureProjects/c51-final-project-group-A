import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import ItemCard from "../../components/ItemCard";
import Pagination from "../../components/Pagination";
import ViewToggle from "../../components/ViewToggle";
import "../../styles/ResultPageStyle.css";

const VIEW_MODES = { GRID: "grid", LINE: "line" };

const ResultPage = ({
  currentItems,
  currentPage,
  totalPages,
  setCurrentPage,
  pages,
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  const [viewMode, setViewMode] = useState(VIEW_MODES.LINE);

  const toggleViewMode = () => {
    setViewMode((prev) =>
      prev === VIEW_MODES.GRID ? VIEW_MODES.LINE : VIEW_MODES.GRID,
    );
  };

  return (
    <div className="result-container">
      <ViewToggle viewMode={viewMode} toggleViewMode={toggleViewMode} />

      {Array.isArray(currentItems) && currentItems.length > 0 ? (
        <div
          className={viewMode === VIEW_MODES.GRID ? "items-grid" : "items-list"}
        >
          {currentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          No items found for <strong>{searchQuery}</strong>
        </p>
      )}

      {Array.isArray(currentItems) && currentItems.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          pages={pages}
        />
      )}
    </div>
  );
};

ResultPage.propTypes = {
  currentItems: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired,
};

export default ResultPage;
