import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const welcomeNav = useNavigate();
  const handleLogout = () => {
    welcomeNav("/");
  };
  return (
    <Box>
      <Box sx={{ display: "flex", marginY: 2, alignItems: "center", gap: 2 }}>
        <Typography variant="h3" color="initial" sx={{ fontWeight: "bold" }}>
          Weclcome:
        </Typography>
        <Typography variant="h1" color="initial">
          User
        </Typography>
      </Box>
      <Button
        onClick={handleLogout}
        sx={{ bgcolor: "red", fontWeight: "bold" }}
        variant="contained"
      >
        Logout
      </Button>
    </Box>
  );
}

export default Welcome;
