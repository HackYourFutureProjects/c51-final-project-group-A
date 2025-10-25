import TEST_ID from "./Home.testid";
import Header from "../../components/Header";
import ExplainText from "../../components/HomeComponents/ExplainText";
import ExplainText2 from "../../components/HomeComponents/ExplainText2";
import Shape from "../../components/HomeComponents/Shape";
import HorizontalScrolling from "../../components/HomeComponents/HorizontalScrolling";
import ItemSlider from "../../components/HomeComponents/ItemSlider";
import Banner from "../../components/HomeComponents/Banner";
import SharePrompt from "../../components/HomeComponents/SharePrompt";
import Footer from "../../components/Footer";
const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />
      <ExplainText />
      <ExplainText2 />
      <Shape />
      <HorizontalScrolling />
      <Shape />
      <ItemSlider />
      <Banner />
      <SharePrompt />
      <Footer />
    </div>
  );
};

export default Home;
