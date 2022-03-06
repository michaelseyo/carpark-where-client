import React from "react";
import Moment from "react-moment";

import Container from "@mui/material/Container";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

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
          <Container key={index} sx={{ margin: "10px 0" }}>
            <Typography color="#6C6E70" align="left">
              Lot type: {cp.lot_type}
            </Typography>
            <Typography color="#6C6E70" align="left">
              Total lots: {cp.total_lots}
            </Typography>
            <Typography color="#6C6E70" align="left">
              Available: {cp.lots_available}
            </Typography>
          </Container>
        );
      })}
      <Divider />
    </React.Fragment>
  );
}
