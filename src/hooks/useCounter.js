import { useState, useEffect } from "react";

//TODO: This hook is meant to make a counting animation for the stat card

export const useCounter = (num) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < num) {
      setCount(count + 50);
    }
  }, [count, num]);

  return [count];
};
