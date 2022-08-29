import { useState, useEffect } from "react";

export const useCounter = (num) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < num) {
      setCount(count + 50);
    }
  }, [count, num]);

  return [count];
};
