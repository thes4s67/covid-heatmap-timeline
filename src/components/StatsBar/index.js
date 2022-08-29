import { Grid } from "@mui/material";
import CountryCard from "./CountryCard";
import StatCard from "./StatCard";

const StatsBar = () => {
  return (
    <Grid container sx={{ p: 4 }} spacing={3}>
      <Grid item xs={12} md={3}>
        <CountryCard />
      </Grid>
      <Grid item xs={6} md={3} sx={{ display: "flex", alignItems: "center" }}>
        <StatCard type={"Cases"} />
      </Grid>
      <Grid item xs={6} md={3} sx={{ display: "flex", alignItems: "center" }}>
        <StatCard type={"Vaccinations"} />
      </Grid>
      <Grid item xs={6} md={3} sx={{ display: "flex", alignItems: "center" }}>
        <StatCard type={"Deaths"} />
      </Grid>
    </Grid>
  );
};

export default StatsBar;
