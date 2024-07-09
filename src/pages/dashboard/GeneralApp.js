import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import ChatRequests from "../../components/Conversation/ChatRequests";
// import ChatRequests from "../../components/ChatRequests";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar, user } = useSelector((store) => store.app); // access our store inside component
  const [selectedChat, setSelectedChat] = useState(null);
  const [isAwaitingApproval, setIsAwaitingApproval] = useState(false);
  const [chatRequests, setChatRequests] = useState([]);

  useEffect(() => {
    if (user.role === 'therapist') {
      fetchChatRequests();
    }
  }, [user.role]);

  const fetchChatRequests = async () => {
    const response = await fetch('/api/chat-requests/');
    if (response.ok) {
      const data = await response.json();
      setChatRequests(data);
    }
  };

  const handleRequestConversation = async () => {
    // Implement the logic to send a request for a conversation
    console.log("Request conversation with therapist");
    // Send API request to create a new chat request
    const response = await fetch('/api/chat-requests/', {
      method: 'POST',
      body: JSON.stringify({ therapist: selectedChat.therapist.id, parent: selectedChat.parent.id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      setIsAwaitingApproval(true);
    }
  };

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
    // Check if there's a pending request
    if (chat.status === 'pending') {
      setIsAwaitingApproval(true);
    } else {
      setIsAwaitingApproval(false);
    }
  };

  const handleApproveRequest = async (requestId) => {
    const response = await fetch(`/api/chat-requests/${requestId}/approve/`, {
      method: 'POST',
    });
    if (response.ok) {
      fetchChatRequests();
      // Optionally, update the conversation state or notify the user
    }
  };

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      {/* Chats */}
      <Chats setSelectedChat={handleChatSelection} />

      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
          backgroundColor:
            theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.default,
        }}
      >
        {/* Conversation */}
        <Conversation
          selectedChat={selectedChat}
          onRequestConversation={handleRequestConversation}
          isAwaitingApproval={isAwaitingApproval}
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
      {/* Chat Requests for Therapists */}
      {user.role === 'therapist' && (
        <ChatRequests requests={chatRequests} onApprove={handleApproveRequest} />
      )}
    </Stack>
  );
};

export default GeneralApp;
