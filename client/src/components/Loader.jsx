import "./Loader.css";

const Loader = () => (
  <div className="loader-overlay" role="status" aria-busy="true">
    <div className="loader-spinner"></div>
    <span className="visually-hidden">Loading...</span>
  </div>
);

export default Loader;
