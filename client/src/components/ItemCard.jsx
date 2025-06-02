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
      <p>Condition: {item.condition}</p>
      <p>Price: {item.price}</p>
    </div>
  );
};

// Type checking for the item prop to catch errors early
ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemCard;
