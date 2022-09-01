import { useState, useEffect } from "react";

//TODO: this hook is meant to scroll when animation is played. in progress.
export const useScrollEvent = () => {
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const win = e.currentTarget;
      // alert(win.scrollY, win.scrollX);
      setScroll(e);
    });
    return () => {
      window.removeEventListener("scroll", () => setScroll(null));
    };
  }, []);

  return [scroll];
};
