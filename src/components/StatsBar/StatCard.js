import { Card, Typography, Box, IconButton, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ArticleIcon from "@mui/icons-material/Article";
import { useCounter } from "../../hooks/useCounter";
import { getValue } from "../../utils/helpers";

const getProperty = (type) => {
  if (type === "Cases") return "daily_cases";
  if (type === "Vaccinations") return "daily_vaccinations";
  if (type === "Deaths") return "daily_deaths";
};

const StatCard = ({ type }) => {
  const data = useSelector((state) => state.mapData.data.rawData);
  const country = useSelector((state) => state.mapData.selectedCountry);
  const settings = useSelector((state) => state.mapData.settings);
  const num = getValue(data, country, settings.rawDate, getProperty(type));
  const [count] = useCounter(num);

  return (
    <>
      <Card sx={{ p: 3, backgroundColor: "#000", width: "100%" }}>
        {/* <Box sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton>
            <ArticleIcon
              sx={{ width: "25px", height: "25px", color: "#fff" }}
            />
          </IconButton>
        </Box> */}
        <Box sx={{ textAlign: "center" }}>
          <ArticleIcon sx={{ width: "50px", height: "50px", color: "#fff" }} />
          <Typography variant="h5" sx={{ color: "#fff" }}>
            {type}
          </Typography>
          <Tooltip
            title={`Recorded ${type.toLowerCase()} on ${settings.currDate}`}
          >
            <Typography variant="h3" sx={{ color: "#fff", fontWeight: 700 }}>
              {num}
            </Typography>
          </Tooltip>
        </Box>
      </Card>
    </>
  );
};

export default StatCard;
