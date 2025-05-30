import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import "../styles/AuthPageStyle.css";

export default function AuthPage() {
  // State to toggle between login and register modes
  const [isLogin, setIsLogin] = useState(false);

  // Function to switch between login/register forms
  const toggleMode = () => setIsLogin((prev) => !prev);

  // Handle form submission (prevent page reload)
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: handle form data here (e.g. send to backend)
    console.log("Form submitted");
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        {/* Form title changes depending on the mode */}
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Username input is only shown in register mode */}
          {!isLogin && (
            <>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
              />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          {/* Submit button label changes by mode */}
          <button type="submit">{isLogin ? "Sign in" : "Sign up"}</button>
        </form>

        {/* Switch between login/register */}
        <div className="switch-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button className="switch-btn" onClick={toggleMode}>
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
