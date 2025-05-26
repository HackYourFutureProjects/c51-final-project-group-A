import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import Pagination from "../components/Pagination";
import ViewToggle from "../components/ViewToggle";
import "../styles/ResultPageStyle.css";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";

const VIEW_MODES = { GRID: "grid", LINE: "line" };

const ResultPage = () => {
  const [url, setUrl] = useState("/items");
  const [items, setItems] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");

  const { performFetch, cancelFetch } = useFetch(url, (response) => {
    setPagination(response.pagination);
    setItems(response.result);
  });

  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);

  const toggleViewMode = () => {
    setViewMode((prev) =>
      prev === VIEW_MODES.GRID ? VIEW_MODES.LINE : VIEW_MODES.GRID,
    );
  };

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage);
    params.set("limit", 5);
    params.set("sortBy", "createdAt");
    params.set("sortOrder", "desc");

    setUrl(`/items?${params.toString()}`);
  }, [currentPage]);

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [url]);

  return (
    <div className="result-container">
      <Header searchItem={searchItem} setSearchItem={setSearchItem} />
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
      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination[0].totalPages}
          setCurrentPage={setCurrentPage}
          pages={Array.from(
            { length: pagination[0].totalPages },
            (_, i) => i + 1,
          )}
        />
      )}
    </div>
  );
};

export default ResultPage;
