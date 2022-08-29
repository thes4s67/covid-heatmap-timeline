import { useEffect, useState } from "react";
import { Card, Typography, Box, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ArticleIcon from "@mui/icons-material/Article";
import { useCounter } from "../../hooks/useCounter";

const StatCard = ({ type, num }) => {
  const [count] = useCounter(num);
  return (
    <>
      <Card sx={{ p: 3, backgroundColor: "#000", height: 250 }}>
        {type === "Vaccinations" ? (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton>
              <ArticleIcon
                sx={{ width: "25px", height: "25px", color: "#fff" }}
              />
            </IconButton>
          </Box>
        ) : null}
        <Box sx={{ textAlign: "center" }}>
          <ArticleIcon sx={{ width: "50px", height: "50px", color: "#fff" }} />
          <Typography variant="h5" sx={{ color: "#fff" }}>
            {type}
          </Typography>
          <Typography variant="h3" sx={{ color: "#fff", fontWeight: 700 }}>
            {count}
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default StatCard;
