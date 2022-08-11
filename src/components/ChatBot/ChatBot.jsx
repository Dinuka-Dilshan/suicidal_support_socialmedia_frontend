import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLoggedUser, useLogout } from "../context/userContext";
import MessageIn from "./MessageIn";
import MessageOut from "./MessageOut";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

const Identifier = {
  BOT: 0,
  ME: 1,
};

const ChatBot = () => {
  const loggedInUser = useLoggedUser();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [generatedResponses, setGenaratedResponses] = useState([]);
  const [pastUserInputs, setPastUserInputs] = useState([]);
  const ref = useRef();

  const logOut = useLogout();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logOut();
    navigate("/", { replace: true });
  };

  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      setChat((prev) => [
        ...prev,
        {
          from: Identifier.ME,
          message: e.target.value,
        },
      ]);
      setMessage("");

      fetch(
        "http://ec2-3-0-181-36.ap-southeast-1.compute.amazonaws.com:8082/bot",
        {
          body: JSON.stringify({
            chat: message,
            user_name: loggedInUser.name,
            past_user_inputs: pastUserInputs,
            generated_responses: generatedResponses,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setGenaratedResponses(data.generated_responses);
          setPastUserInputs(data.past_user_inputs);
          setChat((prev) => [
            ...prev,
            {
              from: Identifier.BOT,
              message: data.bot,
            },
          ]);
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [chat]);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(
      "http://ec2-3-0-181-36.ap-southeast-1.compute.amazonaws.com:8082/bot",
      {
        body: JSON.stringify({
          chat: "Hi",
          user_name: loggedInUser.name,
          past_user_inputs: "NULL",
          generated_responses: "NULL",
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setGenaratedResponses(data.generated_responses);
        setPastUserInputs(data.past_user_inputs);
        setChat((prev) => [
          ...prev,
          {
            from: Identifier.BOT,
            message: data.bot,
          },
        ]);
      })
      .catch((err) => console.log(err.message));

    return () => {
      abortController.abort();
    };
  }, []);

  const sendHandler = (e) => {
    setChat((prev) => [
      ...prev,
      {
        from: Identifier.ME,
        message,
      },
    ]);

    fetch(
      "http://ec2-3-0-181-36.ap-southeast-1.compute.amazonaws.com:8082/bot",
      {
        body: JSON.stringify({
          chat: message,
          user_name: loggedInUser.name,
          past_user_inputs: pastUserInputs,
          generated_responses: generatedResponses,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setGenaratedResponses(data.generated_responses);
        setPastUserInputs(data.past_user_inputs);
        setChat((prev) => [
          ...prev,
          {
            from: Identifier.BOT,
            message: data.bot,
          },
        ]);
        setMessage("");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
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
          ChatBot
        </Typography>

        <Box display="flex" alignItems="center" mr="1rem">
          <Button sx={{ color: "white", mr: "0.5rem" }} onClick={logoutHandler}>
            Logout
          </Button>
          <Avatar>{loggedInUser.name[0]}</Avatar>
        </Box>
      </Box>

      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          lg={6}
          border="1px solid #D1D1D1"
          mt="0.5rem"
          height="30rem"
          sx={{
            overflowY: "scroll",
            overflowX: "hidden",
            maxHeight: {
              lg: "30rem",
              xs: "40rem",
            },
          }}
        >
          {chat.map((message, index) => {
            if (message.from === Identifier.ME) {
              return <MessageOut key={index} message={message.message} />;
            } else {
              return <MessageIn key={index} message={message.message} />;
            }
          })}
          <div ref={ref} style={{ marginTop: "0.8rem" }}></div>
        </Grid>
      </Grid>

      <Grid container sx={{ position: "fixed", bottom: "5%" }} bgcolor="white">
        <Grid item xs={12} lg={12} display="flex" justifyContent="center">
          <Grid item xs={11} lg={6} display="flex" justifyContent="center">
            <TextField
              type="text"
              fullWidth
              placeholder="Type Message"
              value={message}
              onChange={messageHandler}
              onKeyDown={keyDownHandler}
            />
            <Button onClick={sendHandler}>
              <SendIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatBot;
