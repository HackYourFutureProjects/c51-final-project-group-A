import PropTypes from "prop-types";
import "../styles/ItemCardStyle.css";

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <h3>{item.title}</h3>
      <p>Model: {item.model}</p>
      <p>Condition: {item.condition}</p>
      <p>Price: {item.price}</p>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemCard;
