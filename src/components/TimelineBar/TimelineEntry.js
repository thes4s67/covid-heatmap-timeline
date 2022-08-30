import { useDispatch } from "react-redux";
import { Typography, Box } from "@mui/material";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { updateTimeline } from "../../store/slices/mapDataSlice";

const TimelineEntry = ({ active, idx, date, children }) => {
  const dispatch = useDispatch();
  return (
    <TimelineItem key={date}>
      <TimelineSeparator>
        <Box sx={{ cursor: "pointer" }}>
          <TimelineDot
            variant={active ? "outlined" : "filled"}
            color={active ? "error" : "warning"}
            onClick={() =>
              dispatch(
                updateTimeline({
                  idx,
                  date,
                })
              )
            }
          />
        </Box>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography
          onClick={() =>
            dispatch(
              updateTimeline({
                idx,
                date,
              })
            )
          }
          sx={{
            fontSize: 16,
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {children}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

export default TimelineEntry;
