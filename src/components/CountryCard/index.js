import { Card, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ArticleIcon from "@mui/icons-material/Article";

const CountryCard = () => {
  const selectedCountry = useSelector((state) => state.mapData.selectedCountry);

  return (
    <>
      <Card sx={{ p: 3, backgroundColor: "#000" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ color: "#fff" }}>
            {selectedCountry}
          </Typography>
          <ArticleIcon sx={{ width: "25px", height: "25px", color: "#fff" }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#fff", fontWeight: 350 }}
          >
            as of August 22 2022
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 450 }}>
            Total Cases: 14,000,232
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 450 }}>
            Total Vaccinations: 14,000,232
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 450 }}>
            Total Deaths: 0
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default CountryCard;
