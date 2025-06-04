import TEST_ID from "./Home.testid";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemSlider from "../../components/ItemSlider";
import wallpaper from "../../assets/wallpaper.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />

      <div className="wallpaper-container">
        <img src={wallpaper} alt="Banner" className="wallpaper-image" />
      </div>

      <ItemSlider />

      <Footer />
    </div>
  );
};

export default Home;
