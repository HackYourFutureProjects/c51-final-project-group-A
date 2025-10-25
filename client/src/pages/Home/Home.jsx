import TEST_ID from "./Home.testid";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemSlider from "../../components/HomeComponents/ItemSlider";
import ExplainText from "../../components/HomeComponents/ExplainText";
import ExplainText2 from "../../components/HomeComponents/ExplainText2";
import SharePrompt from "../../components/HomeComponents/SharePrompt";
import Banner from "../../components/HomeComponents/Banner";
import Shape from "../../components/HomeComponents/Shape";
import HorizontalScrolling from "../../components/HomeComponents/HorizontalScrolling";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container}>
      <Header />
      <ExplainText />
      <ExplainText2 />
      <Shape />
      <ItemSlider />
      <Banner />
      <SharePrompt />
      <HorizontalScrolling />
      <Footer />
    </div>
  );
};

export default Home;
