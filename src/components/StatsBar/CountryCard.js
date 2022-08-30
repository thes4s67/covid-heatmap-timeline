import { useState } from "react";
import { Card, Typography, Box, Avatar, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getValue, getCountryCode } from "../../utils/helpers";
import { updateCountry } from "../../store/slices/mapDataSlice";
import Flag from "../Flag";
import FlagIcon from "@mui/icons-material/Flag";
import LanguageIcon from "@mui/icons-material/Language";

const CountryCard = () => {
  const data = useSelector((state) => state.mapData.data.rawData);
  const country = useSelector((state) => state.mapData.selectedCountry);
  const settings = useSelector((state) => state.mapData.settings);
  const [curr, setCurr] = useState({});
  const dispatch = useDispatch();
  return (
    <>
      <Card sx={{ p: 3, backgroundColor: "#000" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Flag country_code={getCountryCode(data, country)} />
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
                      data,
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
                      data,
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
            as of {settings.currDate}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 450 }}>
            Cases:{" "}
            {getValue(
              data,
              country,
              settings.currDate,
              "total_cases"
            ).toLocaleString()}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 450 }}>
            Vaccinations:{" "}
            {getValue(
              data,
              country,
              settings.currDate,
              "total_vaccinations"
            ).toLocaleString()}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 450 }}>
            Boosters:{" "}
            {getValue(
              data,
              country,
              settings.currDate,
              "total_boosters"
            ).toLocaleString()}
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 450 }}>
            Deaths:{" "}
            {getValue(
              data,
              country,
              settings.currDate,
              "total_deaths"
            ).toLocaleString()}
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default CountryCard;
