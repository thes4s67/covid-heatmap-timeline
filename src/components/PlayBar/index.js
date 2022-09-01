import { useSelector } from "react-redux";
import { Box, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { usePlay } from "../../hooks/usePlay";

const PlayBar = () => {
  const settings = useSelector((state) => state.mapData.settings);
  const data = useSelector(
    (state) => state.mapData.data[settings.sortBy][settings.orderBy]
  );
  const { values, handleStatus } = usePlay({
    status: false,
    ff: false,
    rw: false,
  });

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
      <IconButton
        sx={{ color: "white" }}
        disabled={data.timelineIdx === 0 || values.ff || values.rw}
        onClick={() => handleStatus(true, "rw")}
      >
        <FastRewindIcon />
      </IconButton>
      {values.status ? (
        <IconButton sx={{ color: "white" }}>
          <PauseCircleIcon onClick={() => handleStatus(false)} />
        </IconButton>
      ) : (
        <IconButton
          sx={{ color: "white" }}
          disabled={data.timelineIdx === data.timeline.length - 1}
        >
          <PlayCircleIcon onClick={() => handleStatus(true)} />
        </IconButton>
      )}
      <IconButton
        sx={{ color: "white" }}
        disabled={
          data.timelineIdx === data.timeline.length - 1 ||
          values.ff ||
          values.rw
        }
      >
        <FastForwardIcon onClick={() => handleStatus(true, "ff")} />
      </IconButton>
    </Box>
  );
};

export default PlayBar;
