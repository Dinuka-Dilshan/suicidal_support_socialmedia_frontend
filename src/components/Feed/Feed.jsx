import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/postContext";
import { useLoggedUser, useLogout } from "../context/userContext";
import CreatePost from "../CreatePost/CreatePost";
import Post from "../Post/Post";

const Feed = () => {
  const posts = usePosts();
  const loggedInUser = useLoggedUser();
  const logOut = useLogout();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logOut();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        "localhost link here",
        {
          body: JSON.stringify({
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

          console.log(data)
          fetch(
            "http://ec2-54-169-87-142.ap-southeast-1.compute.amazonaws.com:8082/suicide",
            {
              body: JSON.stringify({
                text: data.text,
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
              if (data.sentiment !== "Non Suicidal") {
                navigate("/chatbot");
              } 
            })
            .catch((err) => console.log(err))
            
        })
        .catch((err) => console.log(err))
        
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        height="3.5rem"
        boxSizing="border-box"
        pl="0.8rem"
        sx={{ backgroundColor: "primary.main" }}
      >
        <Typography fontSize="1.2rem" color="white">
          SocialMedia Network
        </Typography>

        <Box display="flex" alignItems="center" mr="1rem">
          <Button sx={{ color: "white", mr: "0.5rem" }} onClick={logoutHandler}>
            Logout
          </Button>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {loggedInUser?.name && loggedInUser.name[0]}
          </Avatar>
        </Box>
      </Box>

      <Grid container>
        <Grid item xs={12} lg={3.5}>
          <CreatePost />
        </Grid>
        <Grid item xs={12} lg={4.5}>
          {[...posts].reverse().map((post, i) => (
            <Post
              name={post.name}
              content={post.content}
              key={i}
              image={post.image}
            />
          ))}
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};

export default Feed;
