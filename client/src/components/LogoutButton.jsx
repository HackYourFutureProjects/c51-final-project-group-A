import Swal from "sweetalert2";
import "./LogoutButton.css";

const TOKEN_KEY = "token";
const USER_KEY = "user";
// LogoutButton component that handles user logout with a confirmation dialog
const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, log out",
      });

      if (result.isConfirmed) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        await Swal.fire("Logged out!", "You have been logged out.", "success");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      className="logout-button"
      onClick={handleLogout}
      aria-label="Logout"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
