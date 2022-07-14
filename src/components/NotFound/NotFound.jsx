import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection='column'
    >
      <Typography fontSize="1.2rem">Not Found | 404</Typography>
      <Typography fontSize="0.7rem">You Will Be Automatically Redirect To HomePage Within Few Seconds</Typography>
    </Box>
  );
};

export default NotFound;
