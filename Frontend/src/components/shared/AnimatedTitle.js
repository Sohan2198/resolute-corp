import React, { useEffect, useRef, useState } from 'react';

const AnimatedTitle = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleAnimation = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setIsVisible(false);
          }, 5000); // 5 seconds
        } else {
          setIsVisible(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleAnimation, {
      threshold: 0.5, // Adjust as needed
    });

    const currentTitleRef = titleRef.current;
    if (currentTitleRef) {
      observer.observe(currentTitleRef);
    }

    return () => {
      if (currentTitleRef) {
        observer.unobserve(currentTitleRef);
      }
    };
  }, []);

  return (
    <h3
      ref={titleRef}
      className={`${isVisible ? 'animate-slideInFromLeft' : ''}`}
    >
      {children}
    </h3>
  );
};

export default AnimatedTitle;
