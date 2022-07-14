import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from "react";

const Post = ({
  name,
  content,
  image 
}) => {
  const [like, setLike] = useState(false);
  const [unLike, setUnLike] = useState(false);

  const likeHandler = () => {
    setLike((p) => !p);

    setUnLike(false);
  };

  const unLikeHandler = () => {
    setUnLike((p) => !p);

    setLike(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        my: "0.8rem",
        position: "relative",
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar />
          <Typography sx={{ pl: "1rem" }}>{name}</Typography>
        </Box>
        <Box py="1rem">{content}</Box>
        {image ? (
          <Box py="1rem">
            <img src={image} alt="" width="100%" />
          </Box>
        ) : null}
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            left: 0,
            width: "100%",
            height: "2rem",
          }}
        >
          <Grid container width="100%" height="100%">
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              border="1px solid #e0e0e0"
            >
              <Button
                fullWidth
                sx={{ color: `${like ? "primary.main" : "gray"}` }}
                onClick={likeHandler}
              >
                <ThumbUpIcon />
              </Button>
            </Grid>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              border="1px solid #e0e0e0"
            >
              <Button
                fullWidth
                sx={{ color: `${unLike ? "primary.main" : "gray"}` }}
                onClick={unLikeHandler}
              >
                <ThumbDownIcon />
              </Button>
            </Grid>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              border="1px solid #e0e0e0"
            >
              <Button fullWidth sx={{ color: "gray" }}>
                <CommentIcon color="#e0e0e0" />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Post;
