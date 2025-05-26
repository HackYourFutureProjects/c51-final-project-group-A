import TEST_ID from "./Home.testid";
import { useState } from "react";
import ResultPage from "../components/ResultPage";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemSlider from "../../components/ItemSlider";
import wallpaper from "../../assets/wallpaper.jpg";
import "../../styles/HomeStyle.css";

const Home = () => {
  const [searchItem, setSearchItem] = useState("");

  return (
    <div data-testid={TEST_ID.container}>
      <Header searchItem={searchItem} setSearchItem={setSearchItem} />
      {searchItem === "" && (
        <div className="wallpaper-container">
          <img src={wallpaper} alt="Banner" className="wallpaper-image" />
        </div>
      )}
      {searchItem === "" && <ItemSlider />}
      {searchItem !== "" && <ResultPage />}
      <Footer />
    </div>
  );
};

export default Home;
