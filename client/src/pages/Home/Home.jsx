import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";
import ItemSlider from "../../components/ItemSlider";
import homeImage from "../../assets/homeImage.jpg";
import { useState } from "react";

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);
  return (
    <div
      className="home-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Topbar toggleSidebar={toggleSidebar} />
      <div style={{ display: "flex", flex: 1 }}>
        {showSidebar && (
          <Sidebar showSidebar={showSidebar} onClose={closeSidebar} />
        )}
        <main style={{ flex: 1, padding: "1rem" }}>
          <img
            src={homeImage}
            alt="Share With Us"
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <h2>Items you may like</h2>
          <ItemSlider />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
