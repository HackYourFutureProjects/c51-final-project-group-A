import Swal from "sweetalert2";
import "./LogoutButton.css";

// LogoutButton component that handles user logout with a confirmation dialog
const LogoutButton = () => {
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Swal.fire("Logged out!", "You have been logged out.", "success").then(
          () => {
            window.location.reload();
          },
        );
      }
    });
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;
