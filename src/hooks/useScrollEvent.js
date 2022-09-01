import { useState, useEffect } from "react";

export const useScrollEvent = () => {
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const win = e.currentTarget;
      // alert(win.scrollY, win.scrollX);
      setScroll(e);
    });
    window.scrollTo({ x: 0, y: 200 });
    return () => {
      window.removeEventListener("scroll", () => setScroll(null));
    };
  }, []);

  return [scroll];
};
