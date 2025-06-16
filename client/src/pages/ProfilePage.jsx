import "./ProfilePage.css";

const ProfilePage = () => {
  // Sample user data
  const user = {
    firstName: "Hossein",
    lastName: "Kelisa",
    email: "hossein@example.com",
    ownedItems: [{ name: "item1" }, { name: "item2" }],
    borrowedItems: [{ name: "item1" }, { name: "item2" }],
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1 className="profile-name">
          {user.firstName} {user.lastName}
        </h1>
        <p className="profile-email">{user.email}</p>
      </header>

      <section className="owned-items-section">
        <h2 className="owned-items">Owned Items</h2>
        {user.ownedItems.length > 0 ? (
          <ul>
            {user.ownedItems.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No owned items.</p>
        )}
      </section>

      <section className="borrowed-items-section">
        <h2 className="borrowed-items">Borrowed Items</h2>
        {user.borrowedItems.length > 0 ? (
          <ul>
            {user.borrowedItems.map((item) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No borrowed items.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
