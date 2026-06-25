import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../Redux/AuthApi";

import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const loginNav = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      /**
       * ✅ FIX 1: Capture response
       */
      const response = await login({ username, password }).unwrap();

      /**
       * ✅ FIX 2: Correct dispatch payload
       * Your backend returns: { success, data: { user, token } }
       */
      dispatch(setCredentials(response.data));

      /**
       * ✅ Navigate after success
       */
      loginNav("/welcome");
    } catch (error: unknown) {
      /**
       * ✅ FIX 3: Proper error handling
       */
      const isApiError = (err: unknown): err is { data?: { message?: string } } =>
        typeof err === "object" && err !== null && "data" in err;

      const errMessage = isApiError(error) ? error.data?.message : undefined;
      setError(errMessage || "Invalid username or password");
    }
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
          <Typography variant="h3">Login</Typography>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          disabled={loginLoading}
          fullWidth
          onClick={handleLogin}
          variant="contained"
        >
          {loginLoading ? "Logging In..." : "Login"}
        </Button>

        <Typography variant="subtitle1">
          Don't have an account? <a href="/signup">Sign Up</a>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
