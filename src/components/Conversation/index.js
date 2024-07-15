import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import { conversations, Chat_History as initialChatHistory } from "../../data"; // Make sure the path is correct
import axios from 'axios';


const Conversation = ({userRole, userId,user, selectedChat, onRequestConversation }) => {
  const theme = useTheme();



  const [chatHistory, setChatHistory] = useState(selectedChat?.messages ? selectedChat : null);

  useEffect(()=>{
    setChatHistory(selectedChat?.messages ? selectedChat : null)
  },[selectedChat])

  const handleSendMessage = async (messageData) => {
    const newMessage = {
      conversation: selectedChat.id,
      content: messageData?.text || "",
      sender: userId,
      file: messageData?.media ? messageData.media.file : null,
      // type: messageData?.media ? (messageData.media.type.startsWith("image") ? "image" : "video") : "text",
    };
    debugger

    // if (messageData?.media) {
    //   if (messageData.media.type.startsWith("image")) {
    //     newMessage.file = "img";
    //     newMessage.img = messageData.media.url;
    //   } else if (messageData.media.type.startsWith("video")) {
    //     newMessage.subtype = "video";
    //     newMessage.video = messageData.media.url;
    //   }
    // }

    try {
      const response = await axios.post('http://13.60.35.232:8000/api/messages/', newMessage, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxMDgwNzcxLCJpYXQiOjE3MjA5OTQzNzEsImp0aSI6IjExNDE0OTdhM2U0NDQ3MDRiYTNhNTk0MzlkNTc1OGZjIiwidXNlcl9pZCI6MTF9.j0neBlN2aBFYi9SapE6SQgL7AbG8e4E78SAndOEAC7E`, // Replace authToken with your actual token variable
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        const savedMessage = response.data;
        debugger
        setChatHistory((prevHistory) => ({
          ...prevHistory,
          messages: [...prevHistory.messages, savedMessage],
        }));
      } else {
        console.error('Failed to send message:', response);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
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
      {chatHistory ? <Header selectedChat={chatHistory} user={user}/> : ""}
      <Box className='scrollbar' width={"100%"} sx={{ flexGrow: 1, height: '100%', overflowY: 'scroll' }}>
        {chatHistory ? <Message userRole={userRole} userId={userId} chatHistory={chatHistory} menu={true} onRequestConversation={onRequestConversation} /> : 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant='h6'>
            {userRole==="therapist"?"Select a patient to chat" : "Select a therapist for consultation"}
          </Typography>
        </Box>}
      </Box>
      {chatHistory === null ||chatHistory.conversationClosed===true ? "" : chatHistory && chatHistory.messages && chatHistory.messages.length > 0 ? <Footer onSendMessage={handleSendMessage} /> : userRole==='therapist'?acceptChat() : requestChat()}
    </Stack>
  );
};

export default Conversation;
