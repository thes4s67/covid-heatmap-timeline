import { Drawer, IconButton, Divider, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateDrawerOpen } from "../../store/slices/mapDataSlice";
import { useScrollEvent } from "../../hooks/useScrollEvent";
import TimelineBar from "../TimelineBar";
import DrawerHeader from "./DrawerHeader";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const DrawerSideBar = () => {
  const drawerOpen = useSelector((state) => state.mapData.drawerOpen);
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: 247,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 247,
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor: "#161616",
          color: "red",
        },
      }}
      variant="persistent"
      anchor="right"
      open={drawerOpen}
    >
      <DrawerHeader>
        <IconButton onClick={() => dispatch(updateDrawerOpen(false))}>
          <ChevronRightIcon sx={{ color: "#fff" }} />
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ backgroundColor: "#fff" }} />
      <TimelineBar />
    </Drawer>
  );
};

export default DrawerSideBar;
