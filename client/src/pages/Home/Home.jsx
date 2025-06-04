import TEST_ID from "./Home.testid";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemSlider from "../../components/ItemSlider";
import "./Home.css";
import logo from "../../assets/logo.png";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />

      <div className="wallpaper-container">
        <div className="wallpaper-text">
          <p className="p1">Need Something?</p>
          <p className="p2">Lend Something?</p>
          <img src={logo} alt="main-logo" className="logo-image" />
        </div>
      </div>

      <ItemSlider />

      <Footer />
    </div>
  );
};

export default Home;
