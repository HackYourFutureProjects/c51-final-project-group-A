import "./HorizontalScrolling.css";

function HorizontalScrolling() {
  const text =
    "Share with us your items, borrow from your neighbors, and help reduce waste.";

  return (
    <div className="scroll-wrapper">
      <div className="scroll-content">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default HorizontalScrolling;
