import { useNavigate } from "react-router-dom";
import "./SharePrompt.css";
function SharePrompt() {
  const navigate = useNavigate();

  return (
    <div className="share-prompt-section">
      <h2>Have something to share?</h2>
      <p>
        Let others borrow your tools or items — help your neighbors and save
        resources.
      </p>
      <button className="btn" onClick={() => navigate("/add-item")}>
        Add Your Item
      </button>
    </div>
  );
}

export default SharePrompt;
