import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Error from "../components/Error";
import BorrowButton from "../components/BorrowButton";
import "./ItemDetailsPage.css";
import Rating from "../components/Rating";

const ItemDetailsPage = () => {
  // Extract item ID from URL params
  const { id } = useParams();
  const [item, setItem] = useState(null);

  // Use custom hook to fetch item details
  const { error, isLoading, performFetch, cancelFetch } = useFetch(
    `/items/${id}`,
    (response) => {
      setItem(response?.result);
    },
  );

  // Fetch when component mounts or ID changes
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, [id]);

  // Date formatter to display a readable date
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <Header />
      {isLoading && <Loader />}
      {error && <Error errorMessage={error} />}
      {!isLoading && !error && item && (
        <div className="details-page-wrapper">
          <div className="details-content-container">
            {/* Item Image */}
            <div className="item-image-box">
              <img
                src={
                  item.images?.[0] ||
                  "https://placehold.co/400/png?text=Hello\nWorld"
                }
                alt={item.title}
              />
            </div>

            {/* Item Details */}
            <div className="item-text-box">
              <h1>{item.title}</h1>
              <Rating rating={item.reviews.averageRating} />
              <p className="item-details-model">Model: {item.model}</p>
              <p className="item-details-category">Category: {item.category}</p>
              <p className="item-details-condition">
                Condition:{" "}
                {
                  <span
                    className={`item-condition ${
                      item.condition === "Excellent"
                        ? "item-condition-excellent"
                        : item.condition === "Good"
                          ? "item-condition-good"
                          : "item-condition-fair"
                    }`}
                  >
                    {item.condition}
                  </span>
                }
              </p>
              <p className="item-details-price">Rental Price: €{item.price}</p>
              <p className="item-details-value">Item Value: €{item.value}</p>
              <p className="item-details-duration">
                Rental Period: {item.borrowDuration}{" "}
                {item.borrowDuration === 1 ? "day" : "days"}
              </p>
              <p>
                Last Updated: {dateFormatter.format(new Date(item.updatedAt))}
              </p>
              <p>Description: {item.description}</p>
            </div>
          </div>

          {/* Owner Info */}
          <div className="owner-box">
            <h3>
              {item.ownerId.firstName} {item.ownerId.lastName}
            </h3>
            <p>Email: {item.ownerId.email}</p>
            <p>Mobile: {item.ownerId.phone}</p>
            <p>City: {item.ownerId.city}</p>
            {item && (
              <BorrowButton
                itemId={item._id}
                disabled={!item.availability}
                onSuccess={performFetch}
              />
            )}
          </div>

          {/* Reviews */}
          <div className="latest-reviews-section">
            <h2>Latest Reviews</h2>
            {item.reviews.allReviews.length > 0 ? (
              <div className="reviews-list">
                {item.reviews.allReviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <Rating rating={item.reviews.averageRating} />
                    <p>{review.comment}</p>
                    <p>{dateFormatter.format(new Date(review.updatedAt))}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ItemDetailsPage;
