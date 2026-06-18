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
    <Box
      sx={{
        alignContent: "center",
        justifyItems: "center",
        padding: 2,
        border: 2,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          marginY: 2,
          alignItems: "center",
          gap: 2,
          flexDirection: "column",
          minWidth: "80vw",
          boxShadow: 5,
          padding: 2,
        }}
      >
        <Box sx={{ justifyItems: "center" }}>
          <Typography variant="h1" color="initial">
            Login
          </Typography>
        </Box>
        <TextField
          required
          fullWidth
          label="Username"
          value={username}
          margin="normal"
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth onClick={handleLogin} variant="contained">
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
