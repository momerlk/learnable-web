import React, { useState, useRef } from "react";
import { useGesture } from "react-use-gesture";
import { animated, useSprings } from "react-spring";

const SwipableCarousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = 100; // Width of each view
  const viewsCount = React.Children.count(children);
  const viewRefs = useRef([]);

  // Generate springs for each view
  const [springs, set] = useSprings(viewsCount, index => ({
    x: index * width,
    config: { tension: 300, friction: 30 }
  }));

  // Bind gestures to the carousel
  const bind = useGesture({
    onDrag: ({ movement: [mx] }) => {
      const newIndex = Math.min(
        Math.max(0, currentIndex + (mx > 0 ? -1 : 1)),
        viewsCount - 1
      );
      set(index => ({
        x: (index - newIndex) * width + (index === currentIndex ? mx : 0)
      }));
    },
    onDragEnd: ({ movement: [mx] }) => {
      const newIndex = Math.min(
        Math.max(0, currentIndex + (mx > 0 ? -1 : 1)),
        viewsCount - 1
      );
      setCurrentIndex(newIndex);
      set(index => ({ x: (index - newIndex) * width }));
    }
  });

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {React.Children.map(children, (child, index) => (
        <animated.div
          ref={el => (viewRefs.current[index] = el)}
          {...bind()}
          key={index}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            willChange: "transform",
            transform: springs[index].x.interpolate(x => `translate3d(${x}px,0,0)`)
          }}
        >
          {child}
        </animated.div>
      ))}
    </div>
  );
};

export default SwipableCarousel;
