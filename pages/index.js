import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateDrawerOpen,
  updateData,
  getMoreData,
} from "../src/store/slices/mapDataSlice";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import WorldMap from "../src/components/WorldMap";
import DrawerHeader from "../src/components/Drawer/DrawerHeader";
import DrawerSideBar from "../src/components/Drawer/DrawerSideBar";
import FilterBar from "../src/components/FilterBar";
import PlayBar from "../src/components/PlayBar";
import CountryCard from "../src/components/CountryCard";
import StatCard from "../src/components/StatCard";
import { baseUrl } from "../src/utils/API";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
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
  const selectedCountry = useSelector((state) => state.mapData.selectedCountry);
  const data = useSelector((state) => state.mapData.data);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(results.slice(0, 5));
    dispatch(updateData(results));
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={drawerOpen} color="error">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
            >
              Covid Heatmap Timeline
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={() => dispatch(updateDrawerOpen(true))}
              sx={{ ...(drawerOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <FilterBar />
        </AppBar>
        <PlayBar />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Main open={drawerOpen}>
          <DrawerHeader />
          <Box sx={{ backgroundColor: "#445972" }}>
            <WorldMap />
          </Box>
          {selectedCountry === "" ? (
            <Box sx={{ p: 5, textAlign: "center", alignItems: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mt: 5 }}>
                Hover over a country for stats...
              </Typography>
            </Box>
          ) : (
            <Grid container sx={{ p: 4 }} spacing={3}>
              <Grid item xs={12} md={3}>
                <CountryCard />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard type={"Cases"} num={10000} />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard type={"Vaccinations"} num={100000} />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard type={"Deaths"} num={120000} />
              </Grid>
            </Grid>
          )}
        </Main>
        <DrawerSideBar />
      </Box>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const res = await axios.get(
    `${baseUrl}/api/data?sort=daily&start=2020-01-22&end=2020-02-20`
  );
  const { results } = await res.data;
  return {
    props: { results },
  };
};
