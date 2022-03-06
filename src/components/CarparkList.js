import React, { useEffect } from "react";

import List from "@mui/material/List";

import CarparkItem from "./CarparkItem";
export default function CarparkList({ filteredData }) {
  return (
    <List>
      {filteredData.slice(0, 15).map((cp, index) => {
        return (
          <CarparkItem
            key={index}
            carparkNumber={cp.carparkNumber}
            carparkInfo={cp.carparkInfo}
            time={cp.time}
          />
        );
      })}
    </List>
  );
}
