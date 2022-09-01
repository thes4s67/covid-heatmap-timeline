import { Card, Typography, Box, IconButton, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ArticleIcon from "@mui/icons-material/Article";
import { useCounter } from "../../hooks/useCounter";
import { getValue } from "../../utils/helpers";
import moment from "moment";

const getProperty = (type) => {
  if (type === "Cases") return "daily_cases";
  if (type === "Vaccinations") return "daily_vaccinations";
  if (type === "Deaths") return "daily_deaths";
};

const StatCard = ({ type }) => {
  const country = useSelector((state) => state.mapData.selectedCountry);
  const settings = useSelector((state) => state.mapData.settings);
  const data = useSelector(
    (state) => state.mapData.data[settings.sortBy][settings.orderBy]
  );
  const num = getValue(data.rawData, country, data.currDate, getProperty(type));
  // const [count] = useCounter(num);

  return (
    <>
      <Card
        sx={{
          p: 3,
          backgroundColor: "#121212",
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <ArticleIcon sx={{ width: "50px", height: "50px", color: "#fff" }} />
          <Typography variant="h5" sx={{ color: "#fff" }}>
            {type}
          </Typography>
          <Tooltip
            title={
              settings.sortBy === "monthly"
                ? `Recorded ${type.toLowerCase()} in ${moment(
                    data.currDate
                  ).format("MMM YYYY")}`
                : `Recorded ${type.toLowerCase()} on ${moment(
                    data.currDate
                  ).format("MMM DD YYYY")}`
            }
          >
            <Typography variant="h3" sx={{ color: "#fff", fontWeight: 700 }}>
              {num.toLocaleString()}
            </Typography>
          </Tooltip>
        </Box>
      </Card>
    </>
  );
};

export default StatCard;
