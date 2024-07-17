import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import { getUserInfo } from "../../services/userservice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getHandledChat } from "../../services/miscservices";
// const dotenv = require("dotenv");

// dotenv.config({ path: ".env" });
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxMzM5MTI1LCJpYXQiOjE3MjEyNTI3MjUsImp0aSI6ImI2ZmQzMWFkNDA5ZDQ2M2U4NzQ2MzgwOTQ1NGYwMDNiIiwidXNlcl9pZCI6NX0.pfeeFPuwJk9t9BsajwMZgOHOOx7T1lS30egA6J1nkOs"

// import ChatRequests from "../../components/ChatRequests";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app); // access our store inside component
  const [selectedChat, setSelectedChat] = useState(null);
  const [isAwaitingApproval, setIsAwaitingApproval] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getUserInfo();
    if (storedUser) {
      setUserRole(storedUser.role);
      setUserId(storedUser.id);
      setUser(storedUser);
    }
  }, []);

  const handleRequestConversation = () => {};

  const handleChatSelection = async (chat) => {
    const response = await getHandledChat(chat);

    const updatedChat = {
      ...chat,
      messages: response.data,
    };

    setSelectedChat(updatedChat);
    // Check if there's a pending request
    if (chat.status === "pending") {
      setIsAwaitingApproval(true);
    } else {
      setIsAwaitingApproval(false);
    }
  };

  return user ? (
    <Stack direction='row' sx={{ width: "100%" }}>
      {/* Chats */}
      <Chats setSelectedChat={handleChatSelection} />

      <Box
        sx={{
          height: "100%",
          width: "100vw",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.default,
        }}
      >
        {/* Conversation */}
        <Conversation
          user={user}
          userRole={userRole}
          userId={userId}
          selectedChat={selectedChat}
          onRequestConversation={handleRequestConversation}
          // isAwaitingApproval={isAwaitingApproval}
        />
      </Box>
      {/* Contact */}
      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessages />;
            case "SHARED":
              return <SharedMessages />;
            default:
              break;
          }
        })()}
    </Stack>
  ) : (
    ""
  );
};

export default GeneralApp;
