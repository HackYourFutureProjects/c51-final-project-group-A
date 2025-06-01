import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ItemDetailsStyle.css";

const ItemDetailsPage = () => {
  // Get the item ID from the URL
  const { id } = useParams();

  // Store the item data in state
  const [item, setItem] = useState(null);

  // Custom fetch hook to get the item by ID
  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    `/items/${id}`,
    (data) => {
      if (data?.success) {
        setItem(data.result);
      }
    },
  );

  // Run fetch on component mount or when `id` changes
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [id]);

  // Loading and error handling
  if (isLoading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">{error.toString()}</div>;
  if (!item) return null;

  return (
    <>
      <Header />

      <div className="details-page-wrapper">
        <div className="details-content-container">
          {/* Left section: image + item details */}
          <div className="item-info-box">
            <div className="item-image-box">
              <img src={item.images?.[0]} alt={item.title} />
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
                <strong>Availability:</strong>{" "}
                {item.availability ? "Yes" : "No"}
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
          </div>

          {/* Right section: Owner info placeholder */}
          <div className="owner-box">
            <h4>Owner Info</h4>
            <p>Loading owner info...</p>
          </div>
        </div>

        {/* Bottom section: Reviews */}
        <div className="latest-reviews-section">
          <h2>Latest Reviews</h2>
          {Array.isArray(item.reviews) && item.reviews.length > 0 ? (
            <div className="reviews-list">
              {item.reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="stars">★★★★★</div>
                  <p>
                    <strong>Review #{index + 1}</strong>
                  </p>
                  <p>{review}</p>
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
