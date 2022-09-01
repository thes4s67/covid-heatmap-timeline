import { useRef } from "react";

//This hook cancels the loop animation if paused
export const useCancelToken = () => {
  const token = useRef({ cancelled: false });
  const cancel = (status) => (token.current.cancelled = status);
  return [token.current, cancel];
};
