import { useState, useEffect } from 'react';
import '../../styles/common/scrollToTop.css';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          aria-label="맨 위로 이동"
        >
          <span className="arrow-up"></span>
        </button>
      )}
    </>
  );
}

export default ScrollToTop;
