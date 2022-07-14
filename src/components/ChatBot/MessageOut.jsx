import { Avatar, Grid, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useLoggedUser } from "../context/userContext";

const MessageOut = ({ message }) => {
  const name = useLoggedUser().name;

  return (
    <Box width="100%" p="0.5rem" py="0.2rem">
      <Grid container justifyContent="flex-end">
        <Grid item xs={6} lg={4} alignItems="center" display="flex">
          <Typography textAlign="right" width="100%" sx={{ mr: "0.5rem" }}>
            {message}
          </Typography>
        </Grid>
        <Grid item xs={1.5} lg={1}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>{name[0]}</Avatar>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessageOut;
