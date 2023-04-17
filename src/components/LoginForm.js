import React, { useContext, useState } from "react";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
// import { Visibility, VisibilityOff } from '@mui/material';
import Switch from "@mui/material/Switch";
import AuthContext from "../context/AuthContext";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {setUser} = useContext(AuthContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    // Validate password
    if (password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    // Send login data to server
    axios
      .post("http://localhost:3000/login", {
        email: email,
        password: password,
      },{
        withCredentials:true,
      })
      
      .then((response) => {
       console.log(response.data);
       setUser(response.data.user.firstname);
       const options = {
        // expires : new Date(Date.now() + 3*24*60*60*1000),
        httpOnly : true
        }
        const token = response.data.token;
       const resp = response.data;
       const name = resp.user.firstname

       setUser(name)
       if (response.data.success === true) {
        navigate("/page");   
       }
     
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={
              passwordError ? "Password must be 8 characters long" : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Switch /> : <Switch />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
