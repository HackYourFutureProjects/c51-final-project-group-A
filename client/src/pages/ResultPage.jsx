import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import Pagination from "../components/Pagination";
import ViewToggle from "../components/ViewToggle";
import "../styles/ResultPageStyle.css";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";

const VIEW_MODES = { GRID: "grid", LINE: "line" };

const ResultPage = () => {
  const [url, setUrl] = useState("/items");
  const [items, setItems] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

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

  // Set category if user navigated to the result page using the sidebar
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromUrl = searchParams.get("category");

    if (categoryFromUrl) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: categoryFromUrl,
      }));
    }
  }, [location.search]);

  // Construct fetch url from the filters
  useEffect(() => {
    const params = new URLSearchParams();

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

  // Fetch items when url changes
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [url]);

  return (
    <div className="result-container">
      <Header searchItem={searchItem} setSearchItem={setSearchItem} />
      <FilterSidebar filters={filters} setFilters={setFilters} />
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
          setCurrentPage={setFilters}
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
