import React from "react";
import Moment from "react-moment";

import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const detailsGridStyle = {
  margin: "0 10px 10px 10px",
  padding: "5px 20px",
};
export default function CarparkItem({ carparkNumber, carparkInfo, time }) {
  return (
    <React.Fragment>
      <ListItem>
        <ListItemText
          primary={
            <Typography component="span" variant="h6">
              {carparkNumber}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography component="span">
                <Moment>{time}</Moment>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      {carparkInfo.map((cp, index) => {
        return (
          <Grid key={index} sx={detailsGridStyle}>
            <Typography color="#6C6E70" align="left">
              Lot type: {cp.lot_type}
            </Typography>
            <Typography color="#6C6E70" align="left">
              Total lots: {cp.total_lots}
            </Typography>
            <Typography color="#6C6E70" align="left">
              Available: {cp.lots_available}
            </Typography>
          </Grid>
        );
      })}
      <Divider />
    </React.Fragment>
  );
}
