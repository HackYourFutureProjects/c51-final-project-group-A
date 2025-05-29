import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import Pagination from "../components/Pagination";
import ViewToggle from "../components/ViewToggle";
import "../styles/ResultPageStyle.css";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

const VIEW_MODES = { GRID: "grid", LINE: "line" };

const ResultPage = () => {
  const [url, setUrl] = useState("/items");
  const [items, setItems] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [pagination, setPagination] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);

  const location = useLocation();

  const { performFetch, cancelFetch } = useFetch(url, (response) => {
    setPagination(response.pagination);
    setItems(response.result);
  });

  // Toggles between grid and line layout for items
  const toggleViewMode = () => {
    setViewMode((prev) =>
      prev === VIEW_MODES.GRID ? VIEW_MODES.LINE : VIEW_MODES.GRID,
    );
  };

  // Handles state changes for current page
  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams();

    // Check if user navigated to the result page using the sidebar
    const category = new URLSearchParams(location);
    category.has("search") && params.set("category", category.get("category"));

    // Set required string queries for use with useFetch
    params.set("page", filters.page);
    params.set("limit", filters.limit);
    params.set("sortBy", filters.sortBy);
    params.set("sortOrder", filters.sortOrder);

    // Set optional string queries
    filters.category && params.set("category", filters.category);
    filters.condition && params.set("condition", filters.condition);
    filters.availability && params.set("availability", filters.availability);
    filters.minPrice && params.set("minPrice", filters.minPrice);
    filters.maxPrice && params.set("maxPrice", filters.maxPrice);
    filters.minDuration && params.set("minDuration", filters.minDuration);
    filters.maxDuration && params.set("maxDuration", filters.maxDuration);

    setUrl(`/items?${params.toString()}`);
  }, [filters]);

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
          currentPage={filters.page}
          totalPages={pagination[0].totalPages}
          setCurrentPage={handlePageChange}
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
