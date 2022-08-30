import { useSelector, useDispatch } from "react-redux";
import { ButtonGroup, Button, Box, Typography } from "@mui/material";
import moment from 'moment';

const FilterBar = () => {
  const settings = useSelector((state) => state.mapData.settings);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 3,
        py: 1,
        alignItems: "center",
        backgroundColor: "#201e1e",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 400 }}>
          {moment(settings.currDate).format("MMM DD YYYY")}
        </Typography>
      </Box>
      <ButtonGroup size="small" color="error">
        <Button variant="contained" onClick={() => dispatch(null)}>
          Cases
        </Button>
        <Button variant="contained" onClick={() => dispatch(null)}>
          Vaccinations
        </Button>
        <Button variant="contained" onClick={() => dispatch(null)}>
          Deaths
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default FilterBar;
