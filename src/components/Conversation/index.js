import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import { conversations, Chat_History as initialChatHistory } from "../../data"; // Make sure the path is correct
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Conversation = ({userRole, userId,user, selectedChat, onRequestConversation }) => {
  const theme = useTheme();



  const [chatHistory, setChatHistory] = useState(selectedChat?.messages ? selectedChat : null);

  let ws;

  useEffect(()=>{
    ws = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${selectedChat?.id.toString()}/`); // Replace with your WebSocket server URL


    // WebSocket event listeners
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      // Handle incoming messages from WebSocket
      const message = JSON.parse(event.data);
      console.log('Received message:', message);

      // Update chat history with incoming message
      setChatHistory((prevHistory) => ({
        ...prevHistory,
        messages: [...prevHistory.messages, message],
      }));
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      if (ws.readyState === 1) { // <-- This is important
        ws.close();
      }
  }
    // setChatHistory(selectedChat?.messages ? selectedChat : null)
  },[selectedChat])

  const handleSendMessage = async (messageData) => {
    const newMessage = {
      conversation: selectedChat.id,
      content: messageData?.text || "",
      sender: userId,
      file: messageData?.media ? messageData.media.file : null,
    };

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(newMessage));
    } else {
      console.error('WebSocket connection not established');
    }

    // Optionally update local chat history immediately (for optimistic UI update)
    setChatHistory((prevHistory) => ({
      ...prevHistory,
      messages: [...prevHistory.messages, newMessage],
    }));

    // try {
    //   const response = await axios.post('http://13.60.35.232:8000/api/messages/', newMessage, {
    //     headers: {
    //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxMDgwNzcxLCJpYXQiOjE3MjA5OTQzNzEsImp0aSI6IjExNDE0OTdhM2U0NDQ3MDRiYTNhNTk0MzlkNTc1OGZjIiwidXNlcl9pZCI6MTF9.j0neBlN2aBFYi9SapE6SQgL7AbG8e4E78SAndOEAC7E`, // Replace authToken with your actual token variable
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   if (response.status === 201) {
    //     const savedMessage = response.data;
    //     
    //     setChatHistory((prevHistory) => ({
    //       ...prevHistory,
    //       messages: [...prevHistory.messages, savedMessage],
    //     }));
    //   } else {
    //     console.error('Failed to send message:', response);
    //   }
    // } catch (error) {
    //   console.error('Error sending message:', error);
    // }
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
      {/* {chatHistory ? <Header selectedChat={chatHistory} user={user}/> : ""}
      <Box className='scrollbar' width={"100%"} sx={{ flexGrow: 1, height: '100%', overflowY: 'scroll' }}>
        {chatHistory ? <Message userRole={userRole} userId={userId} chatHistory={chatHistory} menu={true} onRequestConversation={onRequestConversation} /> : 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant='h6'>
            {userRole==="therapist"?"Select a patient to chat" : "Select a therapist for consultation"}
          </Typography>
        </Box>}
      </Box>
      {chatHistory === null ||chatHistory.conversationClosed===true ? "" : chatHistory && chatHistory.messages && chatHistory.messages.length > 0 ? <Footer onSendMessage={handleSendMessage} /> : userRole==='therapist'?acceptChat() : requestChat()} */}
      { <Header selectedChat={chatHistory} user={user}/> }
      <Box className='scrollbar' width={"100%"} sx={{ flexGrow: 1, height: '100%', overflowY: 'scroll' }}>
        <Message userRole={userRole} userId={userId} chatHistory={chatHistory} menu={true} onRequestConversation={onRequestConversation} /> 
        
      </Box>
      { <Footer onSendMessage={handleSendMessage} />}
    </Stack>
  );
};

export default Conversation;
