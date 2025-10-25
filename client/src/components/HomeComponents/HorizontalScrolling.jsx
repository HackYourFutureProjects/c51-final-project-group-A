import "./HorizontalScrolling.css";

function HorizontalScrolling() {
  const text1 =
    "Join our community today and make a positive impact on the environment!";

  return (
    <div className="scroll-wrapper">
      <div className="scroll-content">
        <span>{text1}</span>
        <span>{text1}</span>
        <span>{text1}</span>
      </div>
    </div>
  );
}

export default HorizontalScrolling;
