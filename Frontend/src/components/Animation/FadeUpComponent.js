import React, { useEffect, useRef, useState } from 'react';

const FadeUpComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleAnimation = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setIsVisible(false);
          }, 2000); // Match duration of the animation
        } else {
          setIsVisible(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleAnimation, {
      threshold: 0.5, // Adjust as needed
    });

    const currentElementRef = elementRef.current;
    if (currentElementRef) {
      observer.observe(currentElementRef);
    }

    return () => {
      if (currentElementRef) {
        observer.unobserve(currentElementRef);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-opacity duration-2000 ${isVisible ? 'animate-fadeUpSlow' : ''}`}
    >
      {children}
    </div>
  );
};

export default FadeUpComponent;
