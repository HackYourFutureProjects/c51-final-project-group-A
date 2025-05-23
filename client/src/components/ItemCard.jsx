import PropTypes from "prop-types";

const ItemCard = ({ item }) => {
  return (
    <div style={{ border: "1px solid black", padding: "1rem" }}>
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
