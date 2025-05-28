import "../styles/ItemDetailsStyle.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ItemDetailsPage = () => {
  const item = {
    image: "https://picsum.photos/300/300",
    title: "Mountain Bike",
    subtitle: "Great for exploring trails",
    description:
      "A durable mountain bike with full suspension, perfect for rough terrain or city rides.",
    address: "Amsterdam, Netherlands",
    availableUntil: "June 30, 2025",
    owner: {
      name: "Reviewer name",
      date: "2025-05-27",
      title: "Review title",
      body: "Review body Review body Review body",
      rating: 4,
    },
    reviews: [
      {
        name: "Reviewer name",
        date: "2025-05-26",
        title: "Review title",
        body: "Review body",
        rating: 3,
      },
      {
        name: "Reviewer name",
        date: "2025-05-25",
        title: "Review title",
        body: "Review body",
        rating: 5,
      },
      {
        name: "Reviewer name",
        date: "2025-05-24",
        title: "Review title",
        body: "Review body",
        rating: 2,
      },
    ],
  };
  const renderStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <>
      <Header />
      {/* Left: Item details */}
      <div className="details-page-wrapper">
        <div className="details-content-container">
          <div className="item-info-box">
            <div className="item-image-box">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="item-text-box">
              <h1>{item.title}</h1>
              <h3>{item.subtitle}</h3>
              <p>{item.description}</p>
              <p>
                <strong>Address:</strong> {item.address}
              </p>
              <p>
                <strong>Available until:</strong> {item.availableUntil}
              </p>
            </div>
          </div>

          {/* Right: Owner review / highlighted box */}
          <div className="owner-box">
            <p className="owner-name">{item.owner.name}</p>
            <p className="owner-date">{item.owner.date}</p>
            <p className="stars">{renderStars(item.owner.rating)}</p>
            <h4>{item.owner.title}</h4>
            <p>{item.owner.body}</p>
            <button className="info-button">information</button>
          </div>
        </div>

        {/* Bottom: Reviews */}
        <div className="latest-reviews-section">
          <h2>Latest reviews</h2>
          <div className="reviews-list">
            {item.reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <p className="stars">{renderStars(review.rating)}</p>
                <h4>{review.title}</h4>
                <p>{review.body}</p>
                <p className="review-meta">
                  <strong>{review.name}</strong> <br />
                  <span>{review.date}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemDetailsPage;
