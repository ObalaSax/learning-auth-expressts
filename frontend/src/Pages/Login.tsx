import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //Auth Route
  const loginNav = useNavigate();
  const handleLogin = () => {
    loginNav("/welcome");
  };
  return (
    <Box sx={{ gap: 2 }}>
      <Box sx={{ gap: 2 }}>
        <Typography variant="h1" color="initial">
          Login
        </Typography>
      </Box>
      <Box>
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
        <Button onClick={handleLogin} variant="contained">
          Login
        </Button>
        <Typography variant="subtitle1" color="initial">
          Login Have an account? <a href="/signup">Sign Up</a>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
