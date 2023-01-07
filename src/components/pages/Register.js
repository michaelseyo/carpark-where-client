import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { useNavigate } from "react-router-dom";

const gridStyle = {
  margin: "60px 20px",
};
const paperStyle = {
  padding: "40px",
  height: "40vh",
  minHeight: "480px",
  minWidth: "260px",
  maxWidth: "600px",
  margin: "20px auto",
};
const avatarStyle = {
  backgroundColor: "#1976d2",
  mb: 1,
};
const btnStyle = {
  margin: "25px 0",
};
const inputStyle = {
  margin: "2px 0",
};

export default function Register() {
  let navigate = useNavigate();

  const [response, setResponse] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const resetErrorStatus = () => {
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
  };

  const setErrors = () => {
    if (!firstName) {
      setFirstNameError(true);
    }
    if (!lastName) {
      setLastNameError(true);
    }
    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
  };

  // makes a POST request of the created member to server
  const postMember = async (member) => {
    try {
      const res = await fetch(
        "https://carpark-where-api.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(member),
        }
      );
      const resJson = await res.json();
      setResponse(resJson.message);
      if (resJson.message === "Account created") {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = () => {
    resetErrorStatus();
    if (firstName && lastName && email && password) {
      const member = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      if (contactNumber) {
        member["contactNumber"] = contactNumber;
      }
      postMember(member);
    } else {
      setErrors();
    }
  };

  return (
    <Grid sx={gridStyle}>
      <Paper elevation={10} sx={paperStyle}>
        <Grid align="center">
          <Avatar sx={avatarStyle}>
            <AccessibilityNewIcon />
          </Avatar>
          <Typography variant="h5">Be a member!</Typography>
          <TextField
            sx={inputStyle}
            label="First Name"
            variant="standard"
            placeholder="Enter first name"
            fullWidth
            required
            onChange={(e) => {
              setFirstName(e.currentTarget.value);
            }}
            error={firstNameError}
            helperText={firstNameError && "This field is required."}
          />
          <TextField
            sx={inputStyle}
            label="Last Name"
            variant="standard"
            placeholder="Enter last name"
            fullWidth
            required
            error={lastNameError}
            onChange={(e) => {
              setLastName(e.currentTarget.value);
            }}
            helperText={lastNameError && "This field is required."}
          />
          <TextField
            sx={inputStyle}
            label="Email"
            variant="standard"
            placeholder="Enter email"
            fullWidth
            required
            error={emailError}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            helperText={emailError && "This field is required."}
          />
          <TextField
            sx={inputStyle}
            label="Password"
            variant="standard"
            placeholder="Enter password"
            fullWidth
            type="password"
            required
            error={passwordError}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            helperText={passwordError && "This field is required."}
          />
          <TextField
            sx={inputStyle}
            label="Contact Number"
            variant="standard"
            placeholder="Enter contact number"
            fullWidth
            onChange={(e) => {
              setContactNumber(e.currentTarget.value);
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={btnStyle}
            onClick={handleRegister}
          >
            Confirm
          </Button>
          <Typography>{response}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}
