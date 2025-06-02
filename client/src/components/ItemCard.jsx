import PropTypes from "prop-types";
import "../styles/ItemCardStyle.css";
import { useNavigate } from "react-router-dom";

// component to display a single item card on ResultPage and HomePage
const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="item-card" onClick={() => navigate(`/items/${item._id}`)}>
      <h3>{item.title}</h3>
      <img src={item.images[0]} alt={item.title} />
      <p>Model: {item.model}</p>
      <p>
        Condition:{" "}
        {
          <span
            className={
              item.condition === "Excellent"
                ? "item-condition-excellent"
                : item.condition === "Good"
                  ? "item-condition-good"
                  : "item-condition-fair"
            }
          >
            {item.condition}
          </span>
        }
      </p>
      <p>
        Rental Period: {item.borrowDuration}{" "}
        {item.borrowDuration === 1 ? "day" : "days"}
      </p>
      <p>Rental Price: {item.price}€</p>
      {item.availability ? (
        <p style={{ color: "green", fontWeight: "bold" }}>✅Available</p>
      ) : (
        <p style={{ fontWeight: "bold" }}>Unavailable</p>
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
