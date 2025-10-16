import TEST_ID from "./Home.testid";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ItemSlider from "../../components/ItemSlider";
import ExplainText from "../../components/ExplainText";
import ExplainText2 from "../../components/ExplainText2";
import SharePrompt from "../../components/SharePrompt";
import Banner from "../../components/Banner";
import Shape from "../../components/Shape";

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
      <Footer />
    </div>
  );
};

export default Home;
