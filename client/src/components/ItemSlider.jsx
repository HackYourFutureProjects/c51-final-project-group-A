import { useRef } from "react";
import "../styles/ItemSliderStyle.css";

export default function ItemSlider() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = 300;
    direction === "left"
      ? (container.scrollLeft -= scrollAmount)
      : (container.scrollLeft += scrollAmount);
  };

  return (
    <div className="slider-wrapper">
      <button className="arrow left" onClick={() => scroll("left")}>
        &#8249;
      </button>

      <div className="slider-container" ref={sliderRef}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="item-card">
            <div className="item-image">Image</div>
            <h4>Item title</h4>
            <p>Good</p>
          </div>
        ))}
      </div>

      <button className="arrow right" onClick={() => scroll("right")}>
        &#8250;
      </button>
    </div>
  );
}
