import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
const Footer = () => {
  const drawerOpen = useSelector((state) => state.mapData.drawerOpen);
  return (
    <>
      <Box
        sx={{
          width: drawerOpen ? `calc(100% - 247px)` : null,
          display: "flex",
          px: 3,
          py: 1.5,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h7">Covid Heatmap Timeline</Typography>
          <Typography variant="h7">By Sonny N</Typography>
        </Box>
        <Box
          sx={{ display: "flex", cursor: "pointer" }}
          onClick={() =>
            window.open(
              "https://github.com/thes4s67/covid-heatmap-timeline",
              "_self"
            )
          }
        >
          <GitHubIcon />
          <Typography variant="h7" sx={{ ml: 1 }}>
            GitHub
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
