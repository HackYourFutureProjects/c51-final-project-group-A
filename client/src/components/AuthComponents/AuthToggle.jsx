import PropTypes from "prop-types";

export default function AuthToggle({ isLogin, toggleMode }) {
  return (
    <div className="switch-text">
      {isLogin ? "Don’t have an account?" : "Already have an account?"}
      <button className="switch-btn" onClick={toggleMode}>
        {isLogin ? "Sign up" : "Sign in"}
      </button>
    </div>
  );
}

AuthToggle.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  toggleMode: PropTypes.func.isRequired,
};
