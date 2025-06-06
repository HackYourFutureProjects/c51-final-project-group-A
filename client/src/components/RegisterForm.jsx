import PropTypes from "prop-types";

export default function RegisterForm({ handleSubmit }) {
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" required placeholder="Name" />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="email"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        placeholder="password"
      />

      <button type="submit">Sign up</button>
    </form>
  );
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
