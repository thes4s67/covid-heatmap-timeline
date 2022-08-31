import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSettings } from "../store/slices/mapDataSlice";
import moment from "moment";

export const usePlay = (initState) => {
  const [values, setValues] = useState(initState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (values.status === "playing") {
      lastDate.current = date;
    }
  }, [values.status]);

  const handleStatus = useCallback(
    (e) => {
      setValues({ ...values, status: e });
    },
    [values]
  );
  return { handleStatus, values };
};
