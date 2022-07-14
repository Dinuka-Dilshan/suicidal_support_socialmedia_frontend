import { Avatar, Grid, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Box } from "@mui/system";

const MessageIn = ({ message }) => {
  return (
    <Box width="100%" p='0.5rem'>
      <Grid container>
        <Grid item xs={1.5} lg={1}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>bot</Avatar>
        </Grid>
        <Grid item xs={6} lg={5} alignItems="center" display='flex' >
          <Typography>{message}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessageIn;
