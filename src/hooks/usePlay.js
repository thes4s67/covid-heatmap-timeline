import { useCallback, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSettings, updateDrawerOpen } from "../store/slices/mapDataSlice";
import moment from "moment";
import { sleep } from "../utils/helpers";
import { useCancelToken } from "./useCancel";

export const usePlay = (initState) => {
  const [values, setValues] = useState(initState);
  const [token, cancel] = useCancelToken();
  const settings = useSelector((state) => state.mapData.settings);
  const data = useSelector(
    (state) => state.mapData.data[settings.sortBy][settings.orderBy]
  );
  const prev = useRef();
  prev.current = {
    date: data.currDate,
    idx: data.timelineIdx,
    status: values.status,
    ff: values.ff,
    rw: values.rw,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (values.status) {
      handlePlay();
    }
  }, [values.status]);

  const handlePlay = async () => {
    if (values.ff && values.status) {
      for (let i = data.timelineIdx; i < data.timeline.length - 1; i++) {
        if (token.cancelled) break;
        dispatch(
          updateSettings({
            timelineIdx: prev.current.idx + 1,
            currDate: getDate(
              settings.sortBy,
              settings.orderBy,
              prev.current.date
            ),
          })
        );
        if (i === data.timeline.length - 2) {
          setValues({ ...values, status: false, ff: false, rw: false });
          cancel(true);
        }
        await sleep(0.5);
      }
    }

    if (values.rw && values.status) {
      for (let i = data.timelineIdx - 1; i >= 0; i--) {
        if (token.cancelled) break;
        dispatch(
          updateSettings({
            timelineIdx: i === 0 ? 0 : prev.current.idx - 1,
            currDate: getDate(
              settings.sortBy,
              settings.orderBy,
              prev.current.date,
              values.rw
            ),
          })
        );
        if (i === 0) {
          setValues({ ...values, status: false, ff: false, rw: false });
          cancel(true);
        }
        await sleep(0.5);
      }
    }

    if (values.status) {
      for (let i = data.timelineIdx; i < data.timeline.length - 1; i++) {
        if (token.cancelled) break;
        dispatch(
          updateSettings({
            timelineIdx: prev.current.idx + 1,
            currDate: getDate(
              settings.sortBy,
              settings.orderBy,
              prev.current.date
            ),
          })
        );
        if (i === data.timeline.length - 2) {
          setValues({ ...values, status: false, ff: false, rw: false });
          cancel(true);
        }
        await sleep(1);
      }
    }
  };

  const getDate = (sortBy, orderBy, date, rw) => {
    if (!rw) {
      if (sortBy === "daily" && orderBy === "asc")
        return moment(date).add(1, "d").format("YYYY-MM-DD");
      if (sortBy === "daily" && orderBy === "desc")
        return moment(date).subtract(1, "d").format("YYYY-MM-DD");
      if (sortBy === "monthly" && orderBy === "asc")
        return moment(date).add(1, "M").format("YYYY-MM");
      if (sortBy === "monthly" && orderBy === "desc")
        return moment(date).subtract(1, "M").format("YYYY-MM");
    } else {
      if (sortBy === "daily" && orderBy === "asc")
        return moment(date).subtract(1, "d").format("YYYY-MM-DD");
      if (sortBy === "daily" && orderBy === "desc")
        return moment(date).add(1, "d").format("YYYY-MM-DD");
      if (sortBy === "monthly" && orderBy === "asc")
        return moment(date).subtract(1, "M").format("YYYY-MM");
      if (sortBy === "monthly" && orderBy === "desc")
        return moment(date).add(1, "M").format("YYYY-MM");
    }
  };

  const handleStatus = useCallback(
    (e, t) => {
      if (e) {
        dispatch(updateDrawerOpen(true));
      }
      if (t) {
        setValues({
          ...values,
          [t]: true,
          status: e,
        });
      } else {
        setValues({
          ...values,
          status: e,
          ff: !e ? false : null,
          rw: !e ? false : null,
        });
      }
      if (!e && prev.current.status) {
        cancel(true);
      } else {
        cancel(false);
      }
      prev.current = { ...prev.current, status: e };
    },
    [values, cancel]
  );
  return { handleStatus, values };
};
