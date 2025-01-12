import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { conversations, Chat_History as initialChatHistory } from "../../data"; // Make sure the path is correct
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { messageRequest } from "../../services/miscservices";
import { BASE_URL, SOCKET_BASE_URL } from "../../config";
import { getUserToken } from "../../services/userservice";

const Conversation = ({
  userRole,
  userId,
  user,
  selectedChat,
  onRequestConversation,
  ws
}) => {
  const theme = useTheme();

  const [chatHistory, setChatHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const [apiResponse,setApiResponse]=useState(null);

  // let ws = useRef(null);


  useEffect(() => {
    console.log("chatHistory:", chatHistory);
    console.log("selectedChat:", selectedChat);
    setChatHistory(selectedChat);
    ws.current = new W3CWebSocket(
      `${SOCKET_BASE_URL}/ws/chat/${selectedChat?.id.toString()}/`
    ); // Replace with your WebSocket server URL

    // WebSocket event listeners
    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      let f = null;
      // if (message.file) {
      //   f = base64ToFile(message.file, message.fileName);
      //   message.file = f;
      // }
      if (message.type === 'chat_message') {
        if (message.message_ID) {
          const token = getUserToken();
          setChatHistory((prevHistory) => ({
            ...prevHistory,
            messages: [...prevHistory.messages, message],
          }));
        }
        else {
          setChatHistory((prevHistory) => ({
            ...prevHistory,
            messages: [...prevHistory.messages, message],
          }));

        }
      }


    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (ws.current.readyState === 1) {
        // <-- This is important
        ws.current.close();
      }
    };
    // setChatHistory(selectedChat?.messages ? selectedChat : null)
  }, [selectedChat]);

  const handleSendMessage = async (messageData) => {
    // setIsLoading(true);
    let base64File = null;

    if (messageData?.media?.file) {
      base64File = await toBase64(messageData.media.file);
    }
    const newMessage = {
      type: "chat_message",
      conversation: selectedChat.id,
      content: messageData?.text || "",
      sender: userId,
      file: base64File,
      fileName: messageData?.media ? messageData.media.file.name : null,
      message_ID: null,
    };




    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(newMessage));
    } else {
      console.error("WebSocket connection not established");
    }

    // Optionally update local chat history immediately (for optimistic UI update)
    // setChatHistory((prevHistory) => ({
    //   ...prevHistory,
    //   messages: [...prevHistory.messages, newMessage],
    // }));
    // let f = null;
    // if (newMessage.file) {
    //   // f = base64ToFile(newMessage.file, messageData.media.file.name)
    //   newMessage.file = messageData.media.file;
    // }

    // try {
    //   const response = await axios.post('http://13.60.35.232:8000/api/messages/', newMessage, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   if (response.status === 201) {
    //     console.log("Message send successfully")
    //     const savedMessage = response.data;
    //     // setApiResponse(savedMessage)

    //     setChatHistory((prevHistory) => ({
    //       ...prevHistory,
    //       messages: [...prevHistory.messages, savedMessage],
    //     }));
    //   } else {
    //     console.error('Failed to send message:', response);
    //   }
    // } catch (error) {
    //   console.error('Error sending message:', error);
    // } finally {
    // }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // function base64ToFile(base64String, fileName) {
  //   // Split the base64 string to get the content type and the actual base64 data
  //   const [metadata, base64Data] = base64String.split(";base64,");
  //   const contentType = metadata.split(":")[1];

  //   // Decode the base64 data
  //   const byteCharacters = atob(base64Data);
  //   const byteNumbers = new Array(byteCharacters.length);

  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }

  //   const byteArray = new Uint8Array(byteNumbers);
  //   const blob = new Blob([byteArray], { type: contentType });

  //   // Create a File object
  //   return new File([blob], fileName, { type: contentType });
  // }

  const requestChat = () => {
    // if (!chatHistory || !chatHistory.messages || chatHistory.messages.length === 0) {

    return (
      <Box p={3} display='flex' justifyContent='center' >
        <Stack spacing={3} alignItems='center'>
          {/* <Typography variant='h6'>No chat history found.</Typography> */}
          <Button
            variant='contained'
            color='primary'
            onClick={() => {

              onRequestConversation(selectedChat)

            }}
          >
            Request Conversation with Therapist
          </Button>
        </Stack>
      </Box>
    );
    // }
  };

  const acceptChat = () => {
    // if (!chatHistory || !chatHistory.messages || chatHistory.messages.length === 0) {

    return (
      <Box p={3} display='flex' justifyContent='center'>
        <Stack spacing={3} alignItems='center'>
          {/* <Typography variant="h6">No chat history found.</Typography> */}
          <Button
            variant='contained'
            color='primary'
            onClick={() => { }}
          >
            Accept Conversation Request from Patient
          </Button>
        </Stack>
      </Box>
    );
    // }
  };

  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* <Header selectedChat={chatHistory} user={user} ws={ws} /> */}
      {chatHistory ? <Header selectedChat={chatHistory} user={user} ws={ws}/> : ""}
      <Box
        className='scrollbar'
        width={"100%"}
        sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}
      >
        {isLoading ?
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
          :
          chatHistory ? (
            <Message
              isLoading={isLoading}
              userRole={userRole}
              userId={userId}
              chatHistory={chatHistory}
              menu={true}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Typography variant='h6'>
                {userRole === "therapist"
                  ? "Select a patient to chat"
                  : "Select a therapist for consultation"}
              </Typography>
            </Box>
          )
        }

      </Box>
      {chatHistory === null || chatHistory.conversationClosed === true ? (
        ""
      ) : chatHistory &&
        chatHistory.messages &&
        chatHistory.messages.length > 0 &&chatHistory.status!==4? (
        <Footer onSendMessage={handleSendMessage} />
      ) : userRole === "therapist" ? (
        acceptChat()
      ) : (
        requestChat()
      )}
    </Stack>
  );
};

export default Conversation;
