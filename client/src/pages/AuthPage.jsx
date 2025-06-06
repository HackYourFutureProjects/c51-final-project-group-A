import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import AuthToggle from "../components/AuthToggle";
import { useAuth } from "../hooks/useAuth";
import "./AuthPage.css";

export default function AuthPage() {
  // Destructure the necessary functions and state from the useAuth hook
  const { isLogin, toggleMode, handleSubmit } = useAuth();

  return (
    <>
      <Header />
      <div className="auth-container">
        {/*Dynamic title based on login or register mode*/}
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {/* Render the appropriate form based on the isLogin state */}
        {isLogin ? (
          <LoginForm handleSubmit={handleSubmit} />
        ) : (
          <RegisterForm handleSubmit={handleSubmit} />
        )}
        {/* Toggle between login and registration modes */}
        <AuthToggle isLogin={isLogin} toggleMode={toggleMode} />
      </div>
      <Footer />
    </>
  );
}
