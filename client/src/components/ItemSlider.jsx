import { useRef } from "react";
import "../styles/ItemSliderStyle.css";

// this component represents a horizontal slider for displaying items
export default function ItemSlider() {
  // Uses useRef to get direct access to the slider container DOM element
  const sliderRef = useRef(null);

  // The scroll function moves the container left or right by 300 pixels using the scrollLeft property
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
        {/* This maps over an array of 10 items to create a list of item cards */}
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
