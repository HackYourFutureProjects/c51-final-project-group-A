import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Loader from "../components/Loader";
import "./ItemDetailsPage.css";

// Helper function to display rating stars
const renderStars = (rating) => {
  const filled = "★".repeat(rating);
  const empty = "☆".repeat(5 - rating);
  return filled + empty;
};

const ItemDetailsPage = () => {
  // Extract item ID from URL params
  const { id } = useParams();
  const [item, setItem] = useState(null);

  // Use custom hook to fetch item details
  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    `/items/${id}`,
    (data) => {
      if (data?.success) setItem(data.result);
    },
  );

  // Fetch when component mounts or ID changes
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [id]);

  // Handle loading and error states
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        Error Fetching Data: {error.message || error.toString()}
      </div>
    );
  }

  if (!item)
    return <div className="not-found">Item not found or unavailable.</div>;

  return (
    <>
      <Header />

      <div className="details-page-wrapper">
        <div className="details-content-container">
          {/* Left: image + main details */}
          <div className="item-image-box">
            <img
              src={item.images?.[0] || "https://via.placeholder.com/400"}
              alt={item.title}
            />
          </div>

          <div className="item-text-box">
            <h1>{item.title}</h1>
            <h3>{item.model}</h3>

            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <p>
              <strong>Condition:</strong> {item.condition}
            </p>
            <p>
              <strong>Price:</strong> €{item.price}
            </p>
            <p>
              <strong>Value:</strong> €{item.value}
            </p>
            <p>
              <strong>Availability:</strong> {item.availability ? "Yes" : "No"}
            </p>
            <p>
              <strong>Borrow Duration:</strong> {item.borrowDuration} days
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {typeof item.description === "string" && item.description.trim()
                ? item.description
                : "No description available."}
            </p>
          </div>

          {/* Right: Owner Info placeholder */}
          <div className="owner-box">
            <h4>Owner Info</h4>
            <p>Loading owner info...</p>
          </div>
        </div>

        {/* Bottom: Reviews */}
        <div className="latest-reviews-section">
          <h2>Latest Reviews</h2>
          {Array.isArray(item.reviews) && item.reviews.length > 0 ? (
            <div className="reviews-list">
              {item.reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="stars">{renderStars(review.rating)}</div>
                  <p>
                    <strong>Review #{index + 1}</strong>
                  </p>
                  <p>
                    <strong>Author:</strong> {review.author || "Anonymous"}
                  </p>
                  <p>
                    <strong>Comment:</strong>{" "}
                    {review.body || "No comment provided."}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ItemDetailsPage;
