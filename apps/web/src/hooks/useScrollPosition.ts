import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateScrollY = () => {
      setScrollY(window.scrollY);
      frameId = 0;
    };

    const onScroll = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateScrollY);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return scrollY;
}