import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterForm from "../components/AuthComponents/RegisterForm";
import LoginForm from "../components/AuthComponents/LoginForm";
import AuthToggle from "../components/AuthComponents/AuthToggle";
import { useAuth } from "../hooks/useAuth";
import ForgotPass from "../components/AuthComponents/ForgotPass";
import { useState } from "react";
import bgImage from "../assets/1.jpg";
import "./AuthPage.css";

export default function AuthPage() {
  const { isLogin, toggleMode, handleSubmit } = useAuth();
  const [showForgotForm, setShowForgotForm] = useState(false);

  return (
    <>
      <Header />
      <div
        className="auth-page"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImage})`,
        }}
      >
        <div className="auth-container">
          <h2>{isLogin ? "Login" : "Register"}</h2>

          {showForgotForm ? (
            <ForgotPass handleBack={() => setShowForgotForm(false)} />
          ) : isLogin ? (
            <LoginForm
              handleSubmit={handleSubmit}
              onForgotClick={() => setShowForgotForm(true)}
            />
          ) : (
            <RegisterForm handleSubmit={handleSubmit} />
          )}

          <AuthToggle isLogin={isLogin} toggleMode={toggleMode} />
        </div>
      </div>
      <Footer />
    </>
  );
}
