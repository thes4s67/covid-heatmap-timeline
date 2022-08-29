import { Box } from "@mui/material";
const Flag = ({ country_code }) => {
  console.log(country_code, "CC");
  return (
    <Box sx={{ height: 25, width: 25 }}>
      <img
        style={{ width: "100%", height: "100%" }}
        src={
          country_code === 0
            ? "https://upload.wikimedia.org/wikipedia/commons/e/ef/International_Flag_of_Planet_Earth.svg"
            : `https://catamphetamine.gitlab.io/country-flag-icons/3x2/${country_code}.svg`
        }
        alt={country_code}
      />
    </Box>
  );
};

export default Flag;
