import TEST_ID from "./Home.testid";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ResultPage from "../components/ResultPage";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemSlider from "../../components/ItemSlider";
import wallpaper from "../../assets/wallpaper.jpg";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get the current URL location
  // Create a URLSearchParams instance to read query parameters
  //Get the "search" parameter from the URL or default to an empty string
  // Initialize local state for search input
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const [searchItem, setSearchItem] = useState(searchQuery);

  // Temporary mock data for testing UI before backend is ready.
  const items = [
    { id: 1, name: "item1", description: "item1" },
    { id: 2, name: "item2", description: "item2" },
    { id: 3, name: "item3", description: "item3" },
    { id: 4, name: "item4", description: "item4" },
    { id: 5, name: "item5", description: "item5" },
    { id: 6, name: "item6", description: "item6" },
    { id: 7, name: "item7", description: "item7" },
    { id: 8, name: "item8", description: "item8" },
    { id: 9, name: "item9", description: "item9" },
    { id: 10, name: "item10", description: "item10" },
  ];

  // Filter items based on search input
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase()),
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchItem]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div data-testid={TEST_ID.container}>
      <Header searchItem={searchItem} setSearchItem={setSearchItem} />
      {searchItem === "" && (
        <div style={{ textAlign: "center", margin: "5px 0" }}>
          <img
            src={wallpaper}
            alt="Banner"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>
      )}
      {searchItem === "" && <ItemSlider />}
      <ResultPage
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
      <Footer />
    </div>
  );
};

export default Home;
