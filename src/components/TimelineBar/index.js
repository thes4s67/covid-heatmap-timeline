import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";
import { useScrollEvent } from "../../hooks/useScrollEvent";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../utils/helpers";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TimelineEntry from "./TimelineEntry";

const TimelineBar = () => {
  const [scroll] = useScrollEvent();
  const data = useSelector((state) => state.mapData.data);
  const settings = useSelector((state) => state.mapData.settings);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(false);
  }, [data]);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      let temp = data;
      let last = temp[temp.length - 1];
      for (let i = 0; i < 20; i++) {
        temp.push(Number(last) + i + 1);
      }
      setData([...temp]);
    }, [3000]);
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
          const tDate = formatDate(c).split(" ");
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
