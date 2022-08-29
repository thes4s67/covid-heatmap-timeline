import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";

const PlayBar = () => {
  const [play, setPlay] = useState(false);

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
      {play ? (
        <IconButton sx={{color: "white"}}>
            <PauseCircleIcon
          onClick={() => {
            console.log("todo");
            setPlay(false);
          }}
        />
        </IconButton>
      ) : (
        <IconButton sx={{color: "white"}}>
            <PlayCircleIcon
          onClick={() => {
            console.log("todo");
            setPlay(true);
          }}
        />
        </IconButton>
      )}
      <IconButton sx={{color: "white"}}>
      <FastForwardIcon />
       </IconButton>
    </Box>
  );
};

export default PlayBar;
