import { Drawer } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import TimelineBar from "../TimelineBar";

const DrawerSideBar = () => {
  const drawerOpen = useSelector((state) => state.mapData.drawerOpen);
  const dispatch = useDispatch();

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
      {/* <DrawerHeader>
        <IconButton onClick={() => dispatch(updateDrawerOpen(false))}>
          <ChevronRightIcon sx={{ color: "#fff" }} />
        </IconButton>
      </DrawerHeader> */}
      {/* <Divider sx={{ backgroundColor: "#fff" }} /> */}
      <TimelineBar />
    </Drawer>
  );
};

export default DrawerSideBar;
