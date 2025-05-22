import TEST_ID from "./Home.testid";
import hyfLogo from "../../assets/hyf-logo.png";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import ItemCard from "../../components/ItemCard";

const Home = () => {
  const [searchItem, setSearchItem] = useState("");
  const headerStyle = {
    background: "navy",
    color: "snow",
    padding: "1rem",
  };
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
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase()),
  );
  return (
    <div data-testid={TEST_ID.container}>
      <h1 style={headerStyle}>This is the homepage</h1>
      <p>Good luck with the project!</p>
      <img src={hyfLogo} alt="HackYourFuture Logo" style={{ width: "200px" }} />
      <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
