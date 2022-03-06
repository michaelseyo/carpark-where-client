import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../store/State";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Collapse from "@mui/material/Collapse";

import CarparkList from "../CarparkList";
import "../../loader.css";
import searchImg from "../../images/search-image.jpg";

const searchStyle = {
  margin: "30px 0",
  minWidth: "300px",
  width: "40vw",
  maxWidth: "700px",
};

const cardMediaStyle = {
  margin: "20px 0",
};

export default function Search() {
  let navigate = useNavigate();
  const [member, setMember] = useAuthProvider();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const filterData = (input) => {
    setFilteredData(
      data.filter((cp) => {
        return cp.carparkNumber.toLowerCase().includes(input);
      })
    );
  };

  useEffect(() => {
    const getAvailabilityData = async () => {
      try {
        const res = await fetch("/api/availability", {
          headers: {
            Authorization: `Bearer ${member.token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.statusText === "Unauthorized") {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          return;
        }

        const json = await res.json();
        setData(
          json.data.items[0].carpark_data.map((cp) => ({
            carparkNumber: cp.carpark_number,
            carparkInfo: cp.carpark_info,
            time: cp.update_datetime,
          }))
        );
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    getAvailabilityData();
  }, [member]);

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
        collapsedHeight={50}
      >
        <Typography variant="h3" color="primary" sx={{ fontWeight: "bolder" }}>
          Retrieve information
        </Typography>

        <CardMedia
          sx={cardMediaStyle}
          component="img"
          height="500"
          image={searchImg}
          alt="people-searching"
        />

        <TextField
          label="By carpark number"
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => filterData(e.currentTarget.value)}
          sx={searchStyle}
        />
        <Divider />
        {!loading && (
          <Typography sx={{ margin: "20px 0" }} variant="h5" className="loader">
            ...
          </Typography>
        )}
        <CarparkList
          filteredData={filteredData.length === 0 ? data : filteredData}
        />
      </Collapse>
    </Grid>
  );
}
