import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin, useUsers } from "../context/userContext";
import * as Yup from "yup";
import { useFormik } from "formik";

const Login = () => {
  const navigate = useNavigate();
  const users = useUsers();
  const [isError, setIsError] = useState(false);
  const login = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("required"),
      password: Yup.string().required("required"),
    }),

    onSubmit: (values) => {
      let isAuthenticated = false;
      let foundUser;
      users.map((user) => {
        if (user.email === values.email && user.password === values.password) {
          isAuthenticated = true;
          foundUser = user;
        }
      });

      if (isAuthenticated) {
        login(foundUser);
        navigate("/feed", { replace: true });
      } else {
        setIsError(true);
      }
    },
  });

  const signupHandler = () => {
    navigate("/signup");
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Grid container display="flex" justifyContent="flex-end" height="100%" px={{xs:'0.5rem', lg:'0rem'}}>
        <Grid item xs={1} sx={{display:{xs:'none',lg:'flex'}}}></Grid>
        <Grid
          item
          lg={7}
          xs={12}
          display={{xs:'none', lg:'flex'}}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          pb="2rem"
          
        >
          <Typography color="primary" fontSize={{xs:'1.5rem', lg:'3rem'}} >
            SocialMedia Network
          </Typography>
        </Grid>
        <Grid
          item
          lg={3}
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography color="primary" fontSize={{xs:'1.5rem', lg:'3rem'}} display={{xs:'block', lg:'none'}}>
            SocialMedia Network
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            onBlur={formik.handleBlur}
            style={{ width: "100%" }}
          >
            {isError && (
              <Typography color="red" fontSize="1rem" textAlign="center">
                Email or password is incorrect
              </Typography>
            )}
            <TextField
              size="small"
              fullWidth
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              sx={{
                my: "0.5rem",
              }}
            />
            {formik.touched.email && formik.errors.email ? (
              <Box color="red">{formik.errors.email}</Box>
            ) : null}
            <TextField
              size="small"
              fullWidth
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{
                my: "0.5rem",
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <Box color="red">{formik.errors.password}</Box>
            ) : null}
            <Button
              variant="contained"
              name="submit"
              type="submit"
              fullWidth
              sx={{
                my: "0.5rem",
              }}
            >
              Login
            </Button>
          </form>
          <Button fullWidth sx={{ fontSize: "0.7rem" }} onClick={signupHandler}>
            Create New Account?
          </Button>
        </Grid>
        <Grid item xs={1} sx={{display:{xs:'none',lg:'flex'}}}></Grid>
      </Grid>
    </Box>
  );
};

export default Login;
