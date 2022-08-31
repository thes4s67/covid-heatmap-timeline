import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton } from "@mui/material";
import { updateSettings } from "../../store/slices/mapDataSlice";
import moment from "moment";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { usePlay } from "../../hooks/usePlay";

const PlayBar = () => {
  const currDate = useSelector((state) => state.mapData.settings.currDate);
  console.log(currDate, "this is the currDate");
  const { values, handleStatus } = usePlay({
    status: "paused",
    currDate: currDate,
  });
  // const [playStatus, setPlayStatus] = useState(false);
  // const lastDate = useRef();
  // lastDate.current = currDate;
  // const dispatch = useDispatch();

  // const handlePlay = async () => {
  //   //TODO: make sure it ends at the last one or first one
  //   console.log("we clicked play!", playStatus, lastDate);
  //   setPlayStatus(true);
  //   while (playStatus) {
  //     const date = moment(lastDate.current).add(1, "d").format("YYYY-MM-DD");
  //     dispatch(updateSettings(date));
  //     lastDate.current = date;
  //     await sleep(1);
  //   }
  //   setPlayStatus(false);
  //   console.log(playStatus, "playStatus");
  // };

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
      {values.status === "playing" ? (
        <IconButton sx={{ color: "white" }}>
          <PauseCircleIcon onClick={() => handleStatus("paused")} />
        </IconButton>
      ) : (
        <IconButton sx={{ color: "white" }}>
          <PlayCircleIcon
            onClick={() => {
              handleStatus("playing");
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
