import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import ItemCard from "../../components/ItemCard";
import "../../styles/ResultPageStyle.css";

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

  return (
    <div className="result-container">
      {Array.isArray(currentItems) && currentItems.length > 0 ? (
        <div className="items-grid">
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
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                fontWeight: currentPage === page ? "bold" : "normal",
                margin: "0 5px",
              }}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
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
