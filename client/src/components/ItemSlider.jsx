import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import "./ItemSlider.css";
import ItemCard from "./ItemCard";

export default function ItemSlider() {
  const [items, setItems] = useState([]);
  const sliderRef = useRef(null);

  const params = {
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 5,
  };
  const url = `/items?${new URLSearchParams(params).toString()}`;

  // Custom hook to handle fetching items from the server
  const { performFetch, cancelFetch, isLoading } = useFetch(url, (data) => {
    console.log("Slider fetch result:", data);
    if (data.success) {
      // Store the fetched items in state
      setItems(data?.result || []);
    } else {
      console.error("Slider fetch failed:", data);
    }
  });

  // Fetch items when the component mounts
  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  // Horizontal scrolling function
  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = 300;
    direction === "left"
      ? (container.scrollLeft -= scrollAmount)
      : (container.scrollLeft += scrollAmount);
  };

  return (
    <>
      <h2 className="slider-title">Latest Items</h2>

      <div className="slider-wrapper">
        {/* Left arrow button to scroll left */}

        <button className="arrow left" onClick={() => scroll("left")}>
          &#8249;
        </button>
        {/* Slider container with items */}
        <div className="slider-container" ref={sliderRef}>
          {isLoading && <div className="loader">Loading items...</div>}
          {!isLoading &&
            items.map((item) => <ItemCard key={item._id} item={item} />)}
        </div>

        {/* Right arrow button to scroll right */}
        <button className="arrow right" onClick={() => scroll("right")}>
          &#8250;
        </button>
      </div>
    </>
  );
}
