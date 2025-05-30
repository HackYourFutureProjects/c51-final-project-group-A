import PropTypes from "prop-types";

const Filter = ({ title, isOpen, toggle, children }) => (
  <div className="filter">
    <div className="filter-header" onClick={toggle}>
      <h4>{title}</h4>
      <span>{isOpen ? "▲" : "▼"}</span>
    </div>
    {isOpen && <div className="filter-body">{children}</div>}
  </div>
);

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Filter;
