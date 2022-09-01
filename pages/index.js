import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { updateDrawerOpen, updateData } from "../src/store/slices/mapDataSlice";
import axios from "axios";
import { baseUrl } from "../src/utils/API";
import WorldMap from "../src/components/WorldMap";
import DrawerHeader from "../src/components/Drawer/DrawerHeader";
import DrawerSideBar from "../src/components/Drawer/DrawerSideBar";
import FilterBar from "../src/components/FilterBar";
import PlayBar from "../src/components/PlayBar";
import StatsBar from "./../src/components/StatsBar";
import Footer from "../src/components/Footer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -247,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 247px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 247,
  }),
}));

const Home = ({ results }) => {
  const drawerOpen = useSelector((state) => state.mapData.drawerOpen);
  const dispatch = useDispatch();
  const theme = useTheme();
  const smallMedia = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    dispatch(updateData(results));
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          open={smallMedia ? false : drawerOpen}
          color="error"
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
            >
              Covid Heatmap Timeline
            </Typography>
            {drawerOpen ? (
              <IconButton onClick={() => dispatch(updateDrawerOpen(false))}>
                <ChevronRightIcon sx={{ color: "#fff" }} />
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={() => dispatch(updateDrawerOpen(true))}
                sx={{ ...(drawerOpen && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
          <Divider />
          <FilterBar />
        </AppBar>
        <PlayBar />
      </Box>
      <Box sx={{ display: "flex" }}>
        {smallMedia ? (
          <>
            <Dialog
              open={smallMedia}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Sorry!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This app has not been fully optimized for smaller screens yet.
                  Please view on your desktop.
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <>
            <Main open={drawerOpen}>
              <DrawerHeader />
              <Box sx={{ backgroundColor: "#445972" }}>
                <WorldMap />
              </Box>
              <StatsBar />
            </Main>
            <DrawerSideBar />
          </>
        )}
      </Box>
      <Footer mediaSize={smallMedia} />
    </>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const res = await axios.get(
    `${baseUrl}/api/data?sort=daily&start=2020-01-22&end=2020-02-20&orderBy=asc`
  );
  const { results } = await res.data;
  return {
    props: { results },
  };
};
