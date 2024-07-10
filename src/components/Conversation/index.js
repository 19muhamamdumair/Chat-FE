import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import { Chat_History as initialChatHistory } from "../../data"; // Make sure the path is correct


const Conversation = ({ selectedChat, onRequestConversation }) => {
  const theme = useTheme();

  const user={
    role:'therapist'
  }

  const [chatHistory, setChatHistory] = useState(selectedChat?.messages ? selectedChat : null);

  useEffect(()=>{
    setChatHistory(selectedChat?.messages ? selectedChat : null)
  },[selectedChat])

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id:chatHistory.messages[chatHistory.messages.length-1].id+1,
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

    setChatHistory((prevHistory) => ({
      ...prevHistory,
      messages: [...prevHistory.messages, newMessage],
    }));
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

  const acceptChat = () => {
    // if (!chatHistory || !chatHistory.messages || chatHistory.messages.length === 0) {

    return (
      <Box p={3} display="flex" justifyContent="center"  height="100%">
        <Stack spacing={3} alignItems="center">
          {/* <Typography variant="h6">No chat history found.</Typography> */}
          <Button variant="contained" color="primary" onClick={onRequestConversation}>
            Accept Conversation Request from Patient
          </Button>
        </Stack>
      </Box>
    );
    // }
  }




  return (
    <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
      {chatHistory ? <Header selectedChat={chatHistory} /> : ""}
      <Box className='scrollbar' width={"100%"} sx={{ flexGrow: 1, height: '100%', overflowY: 'scroll' }}>
        {chatHistory ? <Message chatHistory={chatHistory} menu={true} onRequestConversation={onRequestConversation} /> : 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant='h6'>
            {user.role==="therapist"?"Select a patient to chat" : "Select a therapist for consultation"}
          </Typography>
        </Box>}
      </Box>
      {chatHistory === null ? "" : chatHistory && chatHistory.messages && chatHistory.messages.length > 0 ? <Footer onSendMessage={handleSendMessage} /> : user.role==='therapist'?acceptChat() : requestChat()}
    </Stack>
  );
};

export default Conversation;
