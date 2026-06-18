import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //Auth Route
  const signUpNav = useNavigate();
  const handleSignUp = () => {
    signUpNav("/");
  };
  return (
    <Box>
      <Box>
        <Typography variant="h1" color="initial">
          Sign Up
        </Typography>
      </Box>
      <TextField
        required
        label="Username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        required
        label="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignUp}>SignUp</Button>
      <Typography variant="subtitle1" color="initial">
        Have an account? <a href="/">Login</a>
      </Typography>
    </Box>
  );
}

export default SignUp;
