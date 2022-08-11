import {
  Button,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useCreatePosts } from "../context/postContext";
import { useLoggedUser } from "../context/userContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useRef } from "react";
import { useEffect } from "react";

const CreatePost = () => {
  const createPost = useCreatePosts();
  const loggedInUser = useLoggedUser();
  const navigate = useNavigate();
  const imageRef = useRef();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(false);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string(),
    }),

    onSubmit: (values) => {
      setIsLoading(true);
      if (file && mode) {
        const formData = new FormData();
        formData.append("text", values.content);
        formData.append("user_name", loggedInUser.name);
        formData.append("image", file);

        fetch(
          "http://ec2-3-0-181-36.ap-southeast-1.compute.amazonaws.com:8082/suicide",
          {
            body: formData,
            method: "POST",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.sentiment === "Non Suicidal") {
              if (file) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                  createPost({
                    name: loggedInUser.name,
                    image: fileReader.result,
                  });
                  formik.values.content = "";
                  setImage(null);
                };
                fileReader.readAsDataURL(file);
              } else {
                createPost({
                  name: loggedInUser.name,
                  content: values.content,
                });
                formik.values.content = "";
              }
            } else {
              navigate("/chatbot");
            }
          })
          .catch((err) => console.log(err.message))
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        fetch(
          "http://ec2-3-0-181-36.ap-southeast-1.compute.amazonaws.com:8082/suicide",
          {
            body: JSON.stringify({
              text: values.content,
              user_name: loggedInUser.name,
            }),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.sentiment === "Non Suicidal") {
              createPost({
                name: loggedInUser.name,
                content: values.content,
              });
              formik.values.content = "";
            } else {
              navigate("/chatbot");
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
  });

  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (!file) {
      setImage(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setImage(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <Box display="flex" flexDirection="column" p="1rem">
      {isLoading && <LoadingSpinner />}
      <Typography color="text.secondary" fontSize="1.4rem" py="1rem">
        What do you want to share with others?{" "}
      </Typography>
      <Box display="flex" alignItems="center">
        <Switch
          checked={mode}
          onChange={() => {
            setMode((p) => !p);
          }}
        />
        <Typography>{mode ? "Photo Mode" : "Text Mode"}</Typography>
      </Box>
      {image && mode ? (
        <img src={image} alt="" width={"350px"} height="350px" />
      ) : null}
      {mode && (
        <Typography color="text.secondary" pl="0.2rem">
          <IconButton
            color="primary"
            component="label"
            onClick={() => {
              imageRef.current.value = null;
            }}
          >
            <input
              onChange={fileHandler}
              ref={imageRef}
              hidden
              accept="image/*"
              type="file"
            />
            <PhotoCamera />
          </IconButton>
          Select a photo
        </Typography>
      )}

      <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
        {!mode && (
          <TextField
            label="create post"
            fullWidth
            multiline
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="content"
          />
        )}

        {formik.touched.content && formik.errors.content ? (
          <Box color="red">{formik.errors.content}</Box>
        ) : null}

        <Button
          fullWidth
          sx={{ mt: "1rem" }}
          variant="contained"
          name="submit"
          type="submit"
        >
          Post
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;
