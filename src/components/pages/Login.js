import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../store/State";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const gridStyle = {
  margin: "60px 0",
};
const paperStyle = {
  padding: "40px",
  height: "30vh",
  minHeight: "320px",
  width: 260,
  margin: "20px auto",
};
const avatarStyle = {
  backgroundColor: "#1976d2",
  mb: 1,
};
const btnStyle = {
  margin: "16px 0",
};

export default function Login() {
  let navigate = useNavigate();
  const handleRegister = () => {
    navigate("/register");
  };

  const [member, setMember] = useAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const createSessionMember = (resJson) => {
    const sessionMember = {
      isAuth: true,
      id: resJson.id,
      token: resJson.token,
    };
    setMember(sessionMember);
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(
        "https://carpark-where-api.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (res.status === 200) {
        const resJson = await res.json();
        createSessionMember(resJson);
        navigate("/search");
      } else if (res.status === 401) {
        const resJson = await res.json();
        setResponse(resJson.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid sx={gridStyle}>
      <Paper elevation={10} sx={paperStyle}>
        <Grid align="center">
          <Avatar sx={avatarStyle}>
            <LockOpenIcon />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <TextField
            label="Email"
            variant="standard"
            placeholder="Enter email"
            fullWidth
            required
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <TextField
            label="Password"
            variant="standard"
            placeholder="Enter password"
            fullWidth
            type="password"
            required
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button
            sx={btnStyle}
            variant="contained"
            fullWidth
            onClick={handleLogin}
          >
            Log In
          </Button>
          <Typography>
            Don't have an account?
            <Link
              sx={{
                margin: "5px",
                cursor: "pointer",
              }}
              underline="hover"
              onClick={handleRegister}
            >
              Sign Up
            </Link>
          </Typography>
          <Typography>{response}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}
