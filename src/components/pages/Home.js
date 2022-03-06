import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import InfoIcon from "@mui/icons-material/Info";
import Divider from "@mui/material/Divider";

import headerImg from "../../images/carpark-image.jpg";

const iconStyle = {
  fontSize: "calc(60px + 1vw)",
  padding: 0,
};

const fontStyle = {
  flexGrow: "1",
  fontWeight: "bolder",
  fontSize: "calc(20px + 1vw)",
  margin: 2,
};

const cardStyle = {
  margin: "20px auto",
  padding: "30px",
  maxWidth: "800px",
};

const cardMediaStyle = {
  margin: "20px 0",
};

const dividerStyle = {
  maxWidth: "1000px",
};

const cardContentStyle = {
  display: "flex",
  alignItems: "center",
  justifyContet: "space-between",
  padding: "0 10px",
};

export default function Home() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Grid
      align="center"
      sx={{
        margin: 5,
      }}
    >
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedheight={50}
      >
        <Typography variant="h3" color="primary" sx={{ fontWeight: "bolder" }}>
          Welcome
        </Typography>

        <CardMedia
          sx={cardMediaStyle}
          component="img"
          height="500"
          image={headerImg}
          alt="carpark-lot"
        />

        <Card elevation={0} sx={cardStyle}>
          <CardContent sx={cardContentStyle}>
            <DirectionsCarIcon color="primary" sx={iconStyle} />
            <Typography
              variant="h4"
              color="primary"
              align="left"
              sx={fontStyle}
            >
              Find a carpark
            </Typography>
          </CardContent>
        </Card>
        <Divider sx={dividerStyle} />
        <Card elevation={0} sx={cardStyle}>
          <CardContent sx={cardContentStyle}>
            <Typography
              variant="h4"
              color="primary"
              align="right"
              sx={fontStyle}
            >
              Retrieve Information
            </Typography>
            <InfoIcon color="primary" sx={iconStyle}></InfoIcon>
          </CardContent>
        </Card>
      </Collapse>
    </Grid>
  );
}
