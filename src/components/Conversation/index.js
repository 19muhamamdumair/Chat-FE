import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import { Chat_History as initialChatHistory } from "../../data"; // Make sure the path is correct


const Conversation = ({ selectedChat, onRequestConversation }) => {
  const theme = useTheme();

  const [chatHistory, setChatHistory] = useState(selectedChat?.messages);

  const handleSendMessage = (messageData) => {
    const newMessage = {
      type: "msg",
      message: messageData.text || "",
      incoming: false,
      outgoing: true,
    };

    if (messageData.media) {
      if (messageData.media.type.startsWith("image")) {
        newMessage.subtype = "img";
        newMessage.img = messageData.media.url;
      } else if (messageData.media.type.startsWith("video")) {
        newMessage.subtype = "video";
        newMessage.video = messageData.media.url;
      }
    }

    setChatHistory((prevHistory) => [...prevHistory, newMessage]);
  };


  const requestChat = () => {
    // if (!chatHistory || !chatHistory.messages || chatHistory.messages.length === 0) {

    return (
      <Box p={3} display="flex" justifyContent="center"  height="100%">
        <Stack spacing={3} alignItems="center">
          <Typography variant="h6">No chat history found.</Typography>
          <Button variant="contained" color="primary" onClick={onRequestConversation}>
            Request Conversation with Therapist
          </Button>
        </Stack>
      </Box>
    );
    // }
  }




  return (
    <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
      {selectedChat ? <Header selectedChat={selectedChat} /> : ""}
      <Box className='scrollbar' width={"100%"} sx={{ flexGrow: 1, height: '100%', overflowY: 'scroll' }}>
        {selectedChat ? <Message chatHistory={selectedChat} menu={true} onRequestConversation={onRequestConversation} /> : 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant='h6'>
            Select a therapist for consultation
          </Typography>
        </Box>}
      </Box>
      {selectedChat === null ? "" : selectedChat && selectedChat.messages && selectedChat.messages.length > 0 ? <Footer onSendMessage={handleSendMessage} /> : requestChat()}
    </Stack>
  );
};

export default Conversation;
