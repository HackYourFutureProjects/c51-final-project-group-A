import PropTypes from "prop-types";

const SearchBar = ({ searchItem, setSearchItem }) => {
  return (
    <input
      type="text"
      placeholder="Search"
      value={searchItem}
      onChange={(e) => setSearchItem(e.target.value)}
      style={{ margin: "1rem 0", padding: "0.5rem" }}
    />
  );
};


SearchBar.propTypes = {
  searchItem: PropTypes.string.isRequired,
  setSearchItem: PropTypes.func.isRequired,
};

export default SearchBar;
