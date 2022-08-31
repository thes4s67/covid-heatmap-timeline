import { useState } from "react";
import { Card, Typography, Box, Avatar, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getValue, getCountryCode } from "../../utils/helpers";
import { updateCountry } from "../../store/slices/mapDataSlice";
import Flag from "../Flag";
import FlagIcon from "@mui/icons-material/Flag";
import LanguageIcon from "@mui/icons-material/Language";
import moment from "moment";

const CountryCard = () => {
  const settings = useSelector((state) => state.mapData.settings);
  const data = useSelector(
    (state) => state.mapData.data[settings.sortBy][settings.orderBy]
  );
  const country = useSelector((state) => state.mapData.selectedCountry);
  const [curr, setCurr] = useState({});
  const dispatch = useDispatch();
  return (
    <>
      <Card sx={{ p: 3, backgroundColor: "#000" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Flag country_code={getCountryCode(data.rawData, country)} />
          {country !== "World" ? (
            <Tooltip title={"World Data"}>
              <LanguageIcon
                sx={{
                  width: "25px",
                  height: "25px",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCurr({
                    country,
                    country_code: getValue(
                      data.rawData,
                      country,
                      data.currDate,
                      "country_code"
                    ),
                  });
                  dispatch(
                    updateCountry(country !== "World" ? "World" : curr.country)
                  );
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title={`${curr.country} Data`}>
              <FlagIcon
                sx={{
                  width: "25px",
                  height: "25px",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCurr({
                    country,
                    country_code: getValue(
                      data.rawData,
                      country,
                      settings.currDate,
                      "country_code"
                    ),
                  });
                  dispatch(
                    updateCountry(country !== "World" ? "World" : curr.country)
                  );
                }}
              />
            </Tooltip>
          )}
        </Box>
        <Typography variant="h5" sx={{ color: "#fff" }}>
          {country}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#fff", fontWeight: 350 }}
          >
            {settings.sortBy === "daily" ? "as of " : "month of "}{" "}
            {settings.sortBy === "daily"
              ? moment(data.currDate).format("MMM DD YYYY")
              : moment(data.currDate).format("MMM YYYY")}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 450 }}>
            Cases:{" "}
            {getValue(
              data.rawData,
              country,
              data.currDate,
              "total_cases"
            ).toLocaleString()}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 450 }}>
            Vaccinations:{" "}
            {getValue(
              data.rawData,
              country,
              data.currDate,
              "total_vaccinations"
            ).toLocaleString()}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 450 }}>
            Boosters:{" "}
            {getValue(
              data.rawData,
              country,
              data.currDate,
              "total_boosters"
            ).toLocaleString()}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 450 }}>
            Deaths:{" "}
            {getValue(
              data.rawData,
              country,
              data.currDate,
              "total_deaths"
            ).toLocaleString()}
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default CountryCard;
