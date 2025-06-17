import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleItemClick = (id) => {
    navigate(`/items/${id}`);
  };
  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-layout">
          <div className="profile-info">
            <FaUserCircle className="profile-icon" />
            <p className="profile-email">Email: {user.email}</p>
            <p className="profile-name">
              Name: {user.firstName} {user.lastName}
            </p>
            <p className="profile-phone">Phone: {user.phone}</p>
            <p className="profile-city">City: {user.city}</p>
          </div>

          <div className="profile-items">
            <section className="item-section">
              <h3>Owned Items:</h3>
              {user.ownedItems && user.ownedItems.length > 0 ? (
                <ul className="item-list">
                  {user.ownedItems.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => handleItemClick(item._id)}
                      className="item-card"
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No owned items.</p>
              )}
            </section>

            <section className="item-section">
              <h3>Borrowed Items:</h3>
              {user.borrowedItems && user.borrowedItems.length > 0 ? (
                <ul className="item-list">
                  {user.borrowedItems.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => handleItemClick(item._id)}
                      className="item-card"
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No borrowed items.</p>
              )}
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default ProfilePage;
