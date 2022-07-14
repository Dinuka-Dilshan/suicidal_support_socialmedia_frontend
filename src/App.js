import { Routes, Route } from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ChatBot from "./components/ChatBot/ChatBot";
import { useLoggedUser } from "./components/context/userContext";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const loggedInUser = useLoggedUser();

  const loggedInRoutes = (
    <>
      <Route path="/feed" element={<Feed />} />
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="*" element={<NotFound />} />
    </>
  );

  const normalRoutes = (
    <>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </>
  );

  return <Routes>{loggedInUser.name ? loggedInRoutes : normalRoutes}</Routes>;
}

export default App;
