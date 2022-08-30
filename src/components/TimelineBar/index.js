import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton, CircularProgress, Button } from "@mui/material";
import { getMoreData } from "../../store/slices/mapDataSlice";
import { useScrollEvent } from "../../hooks/useScrollEvent";
import moment from "moment";
import Timeline from "@mui/lab/Timeline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TimelineEntry from "./TimelineEntry";

const TimelineBar = () => {
  const [scroll] = useScrollEvent();
  const data = useSelector((state) => state.mapData.data);
  const settings = useSelector((state) => state.mapData.settings);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    setLoading(true);
    const start = moment(data.lastDate).add(1, "d");
  dispatch(
      getMoreData({
        sort: settings.sortBy,
        start: moment(start).format("YYYY-MM-DD"),
        end: moment(start).add(29, "d").format("YYYY-MM-DD"),
      })
    );
    setLoading(false);
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
        <Button variant="contained" color={"error"}>
          Asc
        </Button>
        <Button variant="contained" color={"error"}>
          Daily
        </Button>
      </Box>
      <Timeline position="alternate">
        {data.timeline.map((c, i) => {
          const tDate = moment(c).format("MMM DD YYYY").split(" ");
          if (i !== data.timeline.length - 1) {
            return (
              <TimelineEntry
                active={settings.timelineIdx === i}
                idx={i}
                date={c}
              >
                {tDate[0]}
                <br />
                {`${tDate[1]} ${tDate[2]}`}
              </TimelineEntry>
            );
          } else {
            return (
              <>
                <TimelineEntry
                  active={settings.timelineIdx === i}
                  idx={i}
                  date={c}
                >
                  {tDate[0]}
                  <br />
                  {`${tDate[1]} ${tDate[2]}`}
                </TimelineEntry>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  {!loading ? (
                    <IconButton onClick={() => handleLoadMore()}>
                      <AddCircleIcon
                        sx={{ width: "50px", height: "50px", color: "#fff" }}
                      />
                    </IconButton>
                  ) : (
                    <CircularProgress color="error" />
                  )}
                </Box>
              </>
            );
          }
        })}
      </Timeline>
    </>
  );
};

export default TimelineBar;
