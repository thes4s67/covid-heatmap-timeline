import { Grid } from "@mui/material";
import CountryCard from './CountryCard';
import StatCard from './StatCard';

const StatsBar = () => {
  return (
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
  );
};

export default StatsBar;
