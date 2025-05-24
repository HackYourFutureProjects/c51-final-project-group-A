import PropTypes from "prop-types";
import ItemCard from "../../components/ItemCard";

const ResultPage = ({
  currentItems,
  currentPage,
  totalPages,
  setCurrentPage,
  pages,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {currentItems.length > 0 ? (
        currentItems.map((item) => <ItemCard key={item.id} item={item} />)
      ) : (
        <p>No items found</p>
      )}

      {currentItems.length > 0 && (
        <div>
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
