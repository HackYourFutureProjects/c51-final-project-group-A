import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./BorrowButton.css";
import PropTypes from "prop-types";

const BorrowButton = ({ itemId }) => {
  const navigate = useNavigate();
  // Check if the user is logged in by looking for a token in localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  const handleBorrowClick = async (e) => {
    // Prevent the click from bubbling up to the item card
    e.stopPropagation();

    // If the user is not logged in, show an alert
    if (!isLoggedIn) {
      Swal.fire({
        title: "Not logged in",
        text: "Please log in to borrow items.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      // Redirect to the authentication page
      navigate("/auth");
      return;
    }

    // Show confirmation dialog before proceeding with the borrow action
    try {
      const result = await Swal.fire({
        title: "Confirm Borrow",
        text: "Are you sure you want to borrow this item?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, borrow it",
      });
      // If the user confirms, proceed with the borrow action
      if (result.isConfirmed) {
        // later we need to call backend API with itemId
        console.log(`Borrow request for item ID: ${itemId}`);

        await Swal.fire(
          "Requested!",
          "Your borrow request was sent.",
          "success",
        );
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      console.error("Error borrowing item:", error);
      Swal.fire("Something went wrong while processing your request.");
    }
  };
  return (
    <button type="button" className="borrow-button" onClick={handleBorrowClick}>
      Borrow Item
    </button>
  );
};

BorrowButton.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default BorrowButton;
