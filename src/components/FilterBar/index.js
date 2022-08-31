import { useSelector, useDispatch } from "react-redux";
import { ButtonGroup, Button, Box, Typography } from "@mui/material";
import { updateSettings } from "../../store/slices/mapDataSlice";
import moment from "moment";

const FilterBar = () => {
  const settings = useSelector((state) => state.mapData.settings);
  const data = useSelector((state) => state.mapData.data);
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
          {settings.sortBy == "daily"
            ? moment(data[settings.sortBy][settings.orderBy].currDate).format(
                "MMM DD YYYY"
              )
            : moment(data[settings.sortBy][settings.orderBy].currDate).format(
                "MMM YYYY"
              )}
        </Typography>
      </Box>
      <ButtonGroup size="small" color="error">
        <Button
          variant="contained"
          color={settings.filter === "total_cases" ? "warning" : "error"}
          onClick={() => dispatch(updateSettings({ filter: "total_cases" }))}
        >
          Cases
        </Button>
        <Button
          variant="contained"
          color={settings.filter === "total_vaccinations" ? "warning" : "error"}
          onClick={() =>
            dispatch(updateSettings({ filter: "total_vaccinations" }))
          }
        >
          Vaccinations
        </Button>
        <Button
          variant="contained"
          color={settings.filter === "total_deaths" ? "warning" : "error"}
          onClick={() => dispatch(updateSettings({ filter: "total_deaths" }))}
        >
          Deaths
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default FilterBar;
