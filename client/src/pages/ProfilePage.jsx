import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import EditProfileForm from "../components/EditProfileForm";
import Loader from "../components/Loader";
import LogoutButton from "../components/LogoutButton";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [ownedItems, setOwnedItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUserInfo(res.data);
        setBorrowedItems(res.data.borrowedItems || []);
        setOwnedItems(res.data.ownedItems || []);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/items/${id}`);
  };

  if (!userInfo) return <Loader />;

  return (
    <>
      <Header />
      <div className="profile-page-container">
        {/* Tabs Navigation */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`tab ${activeTab === "borrowed" ? "active" : ""}`}
            onClick={() => setActiveTab("borrowed")}
          >
            Borrowed
          </button>
          <button
            className={`tab ${activeTab === "owned" ? "active" : ""}`}
            onClick={() => setActiveTab("owned")}
          >
            Owned
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="profile-info">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="avatar"
                className="avatar"
              />
              <div className="profile-details">
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>Name:</strong> {userInfo.firstName}{" "}
                  {userInfo.lastName}
                </p>
                <p>
                  <strong>Phone:</strong> {userInfo.phone}
                </p>
                <p>
                  <strong>City:</strong> {userInfo.city}
                </p>
              </div>
              <LogoutButton />
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="edit-profile-button"
                >
                  Edit Profile
                </button>
              )}
              {editing && (
                <EditProfileForm
                  user={userInfo}
                  onSuccess={(updatedUser) => {
                    setUserInfo(updatedUser);
                    setEditing(false);
                  }}
                />
              )}
            </div>
          )}

          {/* Borrowed Items Tab */}
          {activeTab === "borrowed" && (
            <div className="items-tab">
              <h3>Borrowed Items</h3>
              <div className="items-grid">
                {borrowedItems.length > 0 ? (
                  borrowedItems.map((item) => (
                    <ItemCard
                      key={item._id}
                      item={item}
                      onClick={() => handleItemClick(item._id)}
                    />
                  ))
                ) : (
                  <p>No borrowed items yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Owned Items Tab */}
          {activeTab === "owned" && (
            <div className="items-tab">
              <h3>Owned Items</h3>
              <div className="items-grid">
                {ownedItems.length > 0 ? (
                  ownedItems.map((item) => (
                    <ItemCard
                      key={item._id}
                      item={item}
                      onClick={() => handleItemClick(item._id)}
                    />
                  ))
                ) : (
                  <p>No owned items yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
