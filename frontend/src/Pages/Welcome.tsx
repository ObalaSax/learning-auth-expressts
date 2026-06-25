import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../Redux/AuthApi";
import { useSelector, useDispatch } from "react-redux";
import type { authRootState } from "../Redux/AuthStore";
import { clearCredentials } from "../Redux/AuthSlice";

function Welcome() {
  const welcomeNav = useNavigate();
  const dispatch = useDispatch();

  /**
   * ✅ FIX 1: Read from auth slice, NOT authApi
   */
  const username = useSelector(
    (state: authRootState) => state.auth.user?.username,
  );

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = () => {
    logout({});
    dispatch(clearCredentials()); // ✅ clear redux state
    welcomeNav("/");
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
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Welcome:
        </Typography>

        <Typography
          variant="h1"
          sx={{ border: 4, padding: 2, borderRadius: 4 }}
        >
          {username || "User"}
        </Typography>

        <Button
          disabled={isLoading}
          fullWidth
          onClick={handleLogout}
          sx={{ bgcolor: "red", fontWeight: "bold" }}
          variant="contained"
        >
          {isLoading ? "Logging Out..." : "Logout"}
        </Button>
      </Box>
    </Box>
  );
}

export default Welcome;
