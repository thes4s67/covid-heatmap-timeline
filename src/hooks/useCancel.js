import { useRef } from "react";

export const useCancelToken = () => {
  const token = useRef({ cancelled: false });
  const cancel = (status) => (token.current.cancelled = status);
  return [token.current, cancel];
};
