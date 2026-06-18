import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const welcomeNav = useNavigate();
  const handleLogout = () => {
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
        <Typography variant="h3" color="initial" sx={{ fontWeight: "bold" }}>
          Weclcome:
        </Typography>
        <Typography
          variant="h1"
          color="initial"
          sx={{ border: 4, padding: 2, borderRadius: 4 }}
        >
          User
        </Typography>
        <Button
          fullWidth
          onClick={handleLogout}
          sx={{ bgcolor: "red", fontWeight: "bold" }}
          variant="contained"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Welcome;
