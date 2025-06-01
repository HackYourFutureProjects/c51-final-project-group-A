import PropTypes from "prop-types";
import "../styles/ItemCardStyle.css";
import { Link } from "react-router-dom";

// component to display a single item card on ResultPage and HomePage
const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <Link to={`/items/${item._id}`}>
        <h3>{item.title}</h3>
        <p>Model: {item.model}</p>
        <p>Condition: {item.condition}</p>
        <p>Price: {item.price}</p>
      </Link>
    </div>
  );
};

// Type checking for the item prop to catch errors early
ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemCard;
