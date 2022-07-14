import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAddUsers, useLogin } from "../context/userContext";

const SignUp = () => {
  const navigate = useNavigate();
  const signUp = useAddUsers();
  const login = useLogin();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("required"),
      email: Yup.string().required("required"),
      password: Yup.string().required("required"),
    }),

    onSubmit: (values) => {
      signUp({...values});
      login({...values});
      navigate("/feed", { replace: true });
    },
  });

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
          pb="2rem"
        >
          <Typography color="primary" fontSize="3rem">
            SocialMedia Network
          </Typography>
          <Typography color="primary" fontSize="1rem">
            Create New Account
          </Typography>
        </Grid>
        <Grid
          item
          lg={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
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
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              sx={{
                my: "0.5rem",
              }}
            />
            {formik.touched.name && formik.errors.name ? (
              <Box color="red">{formik.errors.name}</Box>
            ) : null}
            <TextField
              size="small"
              fullWidth
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              sx={{
                my: "0.5rem",
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <Box color="red">{formik.errors.password}</Box>
            ) : null}
            <TextField
              size="small"
              fullWidth
              label="Confirm Password"
              sx={{
                my: "0.5rem",
              }}
            />
            <Button
              variant="contained"
              fullWidth
              name="submit"
              type="submit"
              sx={{
                my: "1rem",
              }}
            >
              Signup
            </Button>
          </form>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
