import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton, CircularProgress, Button } from "@mui/material";
import { getMoreData, updateSettings } from "../../store/slices/mapDataSlice";
import { useScrollEvent } from "../../hooks/useScrollEvent";
import moment from "moment";
import Timeline from "@mui/lab/Timeline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TimelineEntry from "./TimelineEntry";
import { getDates, sleep } from "../../utils/helpers";

const TimelineBar = () => {
  const [scroll] = useScrollEvent();
  const settings = useSelector((state) => state.mapData.settings);
  const data = useSelector(
    (state) => state.mapData.data[settings.sortBy][settings.orderBy]
  );
  const tempData = useSelector((state) => state.mapData.data);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const cSettings = useRef();
  cSettings.current = { sortBy: settings.sortBy, orderBy: settings.orderBy };
  const dispatch = useDispatch();

  const handleLoad = (type) => {
    setLoading(true);
    if (type === "sort") {
      cSettings.current = {
        orderBy: settings.orderBy,
        sortBy: settings.sortBy === "daily" ? "monthly" : "daily",
      };
      dispatch(
        updateSettings({
          orderBy: settings.orderBy,
          sortBy: settings.sortBy === "daily" ? "monthly" : "daily",
        })
      );
    } else {
      cSettings.current = {
        orderBy: settings.orderBy === "asc" ? "desc" : "asc",
        sortBy: settings.sortBy,
      };
      dispatch(
        updateSettings({
          orderBy: settings.orderBy === "asc" ? "desc" : "asc",
          sortBy: settings.sortBy,
        })
      );
    }
    handleLoadMore("load");
    setLoading(false);
  };

  const formatDate = (date) => {
    if (settings.sortBy === "daily") {
      return (
        <>
          {date[0]}
          <br />
          {`${date[1]} ${date[2]}`}
        </>
      );
    } else {
      return (
        <>
          {date[0]}
          <br />
          {date[2]}
        </>
      );
    }
  };

  const handleLoadMore = (type) => {
    //Load more data depending on sort/orderBy
    const { sortBy, orderBy } = cSettings.current;
    let dates = {};
    const tData = tempData[sortBy][orderBy];
    if (type === "load" && Object.keys(tData.rawData).length === 0) {
      dates = getDates(sortBy, orderBy, tData.nextDate);
      dispatch(
        getMoreData({
          sort: sortBy,
          start: dates.start,
          end: dates.end,
          orderBy: orderBy,
        })
      );
    } else if (type === "loadMore") {
      //LoadMore
      dates = getDates(settings.sortBy, settings.orderBy, data.nextDate);
      dispatch(
        getMoreData({
          sort: sortBy,
          start: dates.start,
          end: dates.end,
          orderBy: orderBy,
        })
      );
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          paddingTop: 2,
          paddingLeft: 2,
          paddingRight: 2,
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="contained"
          color={"error"}
          size="small"
          onClick={() => handleLoad("sort")}
        >
          {settings.sortBy}
        </Button>
        <Button
          variant="contained"
          color={"error"}
          size="small"
          onClick={() => handleLoad("orderBy")}
        >
          {settings.orderBy}
        </Button>
      </Box>
      <Timeline position="alternate">
        {loading ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="error" />
          </Box>
        ) : (
          data.timeline.map((c, i) => {
            const tDate = moment(c).format("MMM DD YYYY").split(" ");
            if (i !== data.timeline.length - 1) {
              return (
                <TimelineEntry
                  key={`${c}`}
                  active={data.timelineIdx === i}
                  idx={i}
                  date={c}
                >
                  {formatDate(tDate)}
                </TimelineEntry>
              );
            } else {
              return (
                <>
                  <TimelineEntry
                    key={c}
                    active={data.timelineIdx === i}
                    idx={i}
                    date={c}
                  >
                    {formatDate(tDate)}
                  </TimelineEntry>
                  {data.remaining > 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 2,
                      }}
                    >
                      {!loadingMore ? (
                        <IconButton
                          onClick={async () => {
                            setLoadingMore(true);
                            await sleep(1.5);
                            handleLoadMore("loadMore");
                            setLoadingMore(false);
                          }}
                        >
                          <AddCircleIcon
                            sx={{
                              width: "50px",
                              height: "50px",
                              color: "#fff",
                            }}
                          />
                        </IconButton>
                      ) : (
                        <CircularProgress color="error" />
                      )}
                    </Box>
                  ) : null}
                </>
              );
            }
          })
        )}
      </Timeline>
    </>
  );
};

export default TimelineBar;
