import PropTypes from "prop-types";
import "./ItemCard.css";
import { useNavigate } from "react-router-dom";

// component to display a single item card on ResultPage and HomePage
const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="item-card"
      role="button"
      tabIndex="0"
      onClick={() => navigate(`/items/${item._id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/items/${item._id}`);
        }
      }}
    >
      <img className="item-card-image" src={item.images[0]} alt={item.title} />
      <h3 className="item-card-title">{item.title}</h3>
      <p className="item-card-model">Model: {item.model}</p>
      <p className="item-card-condition">
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
      <p className="item-card-duration">
        Rental Period: {item.borrowDuration}{" "}
        {item.borrowDuration === 1 ? "day" : "days"}
      </p>
      <p className="item-card-price">Rental Price: €{item.price}</p>
      {item.availability ? (
        <p className="available">✅Available</p>
      ) : (
        <p className="unavailable">Unavailable</p>
      )}
    </div>
  );
};

// Type checking for the item prop to catch errors early
ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    borrowDuration: PropTypes.number.isRequired,
    availability: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemCard;
