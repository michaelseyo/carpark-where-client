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
          primary={<Typography variant="h6">{carparkNumber}</Typography>}
          secondary={
            <React.Fragment>
              <Typography>
                <Moment>{time}</Moment>
              </Typography>
              {carparkInfo.map((cp, index) => {
                return (
                  <Container key={index} sx={{ margin: "10px 0" }}>
                    <Typography>Lot type: {cp.lot_type}</Typography>
                    <Typography>Total lots: {cp.total_lots}</Typography>
                    <Typography>Available: {cp.lots_available}</Typography>
                  </Container>
                );
              })}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider />
    </React.Fragment>
  );
}
