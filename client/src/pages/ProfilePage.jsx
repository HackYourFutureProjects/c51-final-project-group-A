import "./ProfilePage.css";

const ProfilePage = () => {
  // Sample user data
  const user = {
    firstName: "Hossein",
    lastName: "Kelisa",
    email: "hossein@example.com",
    ownedItems: [{ name: "Hammer" }, { name: "Drill" }, { name: "Ladder" }],
    borrowedItems: [{ name: "Saw" }, { name: "Screwdriver" }],
  };

  return (
    <div>
      <header>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p>{user.email}</p>
      </header>

      <section>
        <h2>Owned Items</h2>
        {user.ownedItems.length > 0 ? (
          <ul>
            {user.ownedItems.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No owned items.</p>
        )}
      </section>

      <section>
        <h2>Borrowed Items</h2>
        {user.borrowedItems.length > 0 ? (
          <ul>
            {user.borrowedItems.map((item, index) => (
              <li key={index}>{item.name}</li>
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
