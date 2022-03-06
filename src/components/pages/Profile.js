import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../store/State";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

import profileImg from "../../images/profile-image.jpg";

const gridStyle = {
  margin: 5,
};
const paperStyle = {
  padding: "40px",
  height: "30vh",
  minHeight: "320px",
  width: 260,
  margin: "70px auto",
};
const avatarStyle = {
  backgroundColor: "#1976d2",
  mb: 1,
};
const detailsGridStyle = {
  margin: "20px 0",
};
const dividerStyle = {
  margin: "15px 0",
};
const cardMediaStyle = {
  margin: "20px 0",
};

export default function Profile() {
  let navigate = useNavigate();
  const [member, setMember] = useAuthProvider();
  const [profile, setProfile] = useState({});
  const [checked, setChecked] = useState(false);

  const displayMemberDetails = async () => {
    try {
      const res = await fetch(
        `https://my-carpark-api.herokuapp.com/api/details/${member.id}`,
        {
          headers: {
            Authorization: `Bearer ${member.token}`,
          },
        }
      );
      const json = await res.json();
      setProfile({
        firstName: json.firstName,
        lastName: json.lastName,
        email: json.email,
        contactNumber: json.contactNumber,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!member.isAuth) {
      navigate("/login");
      return;
    }
    displayMemberDetails();
  }, [member]);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Collapse
      in={checked}
      {...(checked ? { timeout: 1000 } : {})}
      collapsedheight={50}
    >
      <Grid sx={gridStyle}>
        <Paper elevation={10} sx={paperStyle}>
          <Grid align="center">
            <Avatar sx={avatarStyle}>
              <AccessibilityNewIcon />
            </Avatar>
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bolder" }}
            >
              My Profile
            </Typography>

            <Grid sx={detailsGridStyle}>
              <Divider sx={dividerStyle} textAlign="left">
                First Name
              </Divider>
              <Typography align="right">{profile.firstName}</Typography>
              <Divider sx={dividerStyle} textAlign="left">
                Last Name
              </Divider>
              <Typography align="right">{profile.lastName}</Typography>
              <Divider sx={dividerStyle} textAlign="left">
                Email
              </Divider>
              <Typography align="right">{profile.email}</Typography>
              {profile.contactNumber && (
                <>
                  <Divider sx={dividerStyle} textAlign="left">
                    Contact Number
                  </Divider>
                  <Typography align="right">{profile.contactNumber}</Typography>
                </>
              )}
            </Grid>
          </Grid>
        </Paper>

        <CardMedia
          sx={cardMediaStyle}
          component="img"
          height="500"
          image={profileImg}
          alt="profile-pics"
        />
      </Grid>
    </Collapse>
  );
}
