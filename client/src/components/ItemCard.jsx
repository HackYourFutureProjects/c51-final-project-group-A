import PropTypes from "prop-types";
import "../styles/ItemCardStyle.css";

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <h2>{item.name}</h2>
      <p>Description: {item.description}</p>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemCard;
