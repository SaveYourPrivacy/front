import { useState, useEffect } from 'react';
import '../../styles/common/scrollToTop.css';

/**
 * ScrollToTop Component
 *
 * 페이지 상단으로 스크롤하는 버튼 (300px 이상 스크롤 시 표시)
 */
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * 스크롤 위치에 따라 버튼 표시/숨김 처리
   */
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

  /**
   * 페이지 상단으로 부드럽게 스크롤
   */
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
