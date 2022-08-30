import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton } from "@mui/material";
import { updateCurrDate } from "../../store/slices/mapDataSlice";
import moment from "moment";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";

function sleep(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds * 1000);
  });
}

const PlayBar = () => {
  const playStatus = useRef("Play");
  const currDate = useSelector((state) => state.mapData.settings.currDate);
  const lastDate = useRef();
  lastDate.current = currDate;
  const dispatch = useDispatch();

  const handlePlay = async () => {
    //TODO: make sure it ends at the last one or first one
    console.log("we clicked play!", playStatus, lastDate);
    for (let i = 0; i < 20; i++) {
      const date = moment(lastDate.current).add(1, "d").format("YYYY-MM-DD");
      dispatch(updateCurrDate(date));
      lastDate.current = date;
      await sleep(1);
    }
  };

  return (
    <Box
      sx={{
        px: 3,
        py: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        position: "absolute",
        mt: 14,
        backgroundColor: "#d32f2f",
        color: "white",
        borderBottomRightRadius: "5px",
        borderBottomLeftRadius: "5px",
      }}
    >
      <IconButton sx={{ color: "white" }}>
        <FastRewindIcon />
      </IconButton>
      {playStatus.current === "Pause" ? (
        <IconButton sx={{ color: "white" }}>
          <PauseCircleIcon
            onClick={() => {
              playStatus.current = "Play";
            }}
          />
        </IconButton>
      ) : (
        <IconButton sx={{ color: "white" }}>
          <PlayCircleIcon
            onClick={() => {
              playStatus.current = "Pause";
              handlePlay();
            }}
          />
        </IconButton>
      )}
      <IconButton sx={{ color: "white" }}>
        <FastForwardIcon />
      </IconButton>
    </Box>
  );
};

export default PlayBar;
