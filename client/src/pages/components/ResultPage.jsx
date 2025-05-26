import { useEffect, useState } from "react";
import ItemCard from "../../components/ItemCard";
// import Pagination from "../../components/Pagination";
import ViewToggle from "../../components/ViewToggle";
import "../../styles/ResultPageStyle.css";
import useFetch from "../../hooks/useFetch";

const VIEW_MODES = { GRID: "grid", LINE: "line" };

const ResultPage = () => {
  const [url, setUrl] = useState("/items");
  const [items, setItems] = useState(null);
  const [pagination, setPagination] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);

  const { performFetch, cancelFetch } = useFetch(url, (response) => {
    setPagination(response.pagination);
    setItems(response.result);
  });

  const [viewMode, setViewMode] = useState(VIEW_MODES.LINE);

  const toggleViewMode = () => {
    setViewMode((prev) =>
      prev === VIEW_MODES.GRID ? VIEW_MODES.LINE : VIEW_MODES.GRID,
    );
  };

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", 1);
    params.set("limit", 10);
    params.set("sortBy", "createdAt");
    params.set("sortOrder", "desc");
    setUrl(`/items?${params.toString()}`);
  }, []);

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [url]);

  return (
    <div className="result-container">
      <ViewToggle viewMode={viewMode} toggleViewMode={toggleViewMode} />
      {Array.isArray(items) && items.length > 0 ? (
        <div
          className={viewMode === VIEW_MODES.GRID ? "items-grid" : "items-list"}
        >
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No items found...</p>
      )}
      {pagination && <p></p>}
      {/* {Array.isArray(items) && items.length > 0 && (
        <Pagination
          currentPage={pagination[0].currentPage}
          totalPages={pagination[0].totalPages}
          setCurrentPage={setCurrentPage}
        />
      )} */}
    </div>
  );
};

export default ResultPage;
