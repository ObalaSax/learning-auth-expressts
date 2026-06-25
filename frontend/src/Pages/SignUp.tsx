import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../Redux/AuthApi";

function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signUp, { isLoading }] = useSignupMutation();
  //Auth Route
  const signUpNav = useNavigate();
  const reset = () => {
    setUserName("");
    setPassword("");
    setError("");
  };
  const handleSignUp = async () => {
    if (!username || !password) {
      setError("Please Fill all fields");
      return;
    }
    try {
      await signUp({ username, password }).unwrap();
      reset();
      signUpNav("/");
    } catch (error) {
      console.error(error);
      setError(error?.data?.message || "Something went wrong during sign up");
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
        <Box>
          <Typography variant="h1" color="initial">
            Sign Up
          </Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        <TextField
          required
          fullWidth
          margin="normal"
          label="Username"
          value={username}
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
        <Button
          onClick={handleSignUp}
          variant="contained"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "SignUp"}
        </Button>
        <Typography variant="subtitle1" color="initial">
          Have an account? <a href="/">Login</a>
        </Typography>
      </Box>
    </Box>
  );
}

export default SignUp;
