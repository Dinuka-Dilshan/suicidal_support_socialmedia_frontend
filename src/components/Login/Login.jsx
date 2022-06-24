import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";

const Login = () => {
  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Grid container display="flex" justifyContent="flex-end" height="100%">
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={7}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          pb='2rem'
        >
            <Typography color='primary' fontSize='3rem'>SocialMedia Network</Typography>
        </Grid>
        <Grid
          item
          lg={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={2}
        >
          <TextField size="small" fullWidth label="Username" />
          <TextField size="small" fullWidth label="Password" />
          <Button variant="contained" fullWidth>
            Login
          </Button>
          <Button  fullWidth sx={{fontSize:'0.7rem'}}>
            Create New Account?
          </Button>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
};

export default Login;
