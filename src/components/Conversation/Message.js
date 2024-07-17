import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  TimeLine,
} from "./MsgTypes";

const Message = ({
  isLoading,
  chatHistory,
  menu,
  onRequestConversation,
  userId,
  userRole,
}) => {
  useEffect(() => {
    console.log(isLoading);
    // debugger
  }, [isLoading]);

  if (
    !chatHistory ||
    !chatHistory.messages ||
    chatHistory.messages.length === 0
  ) {
    return (
      <Box
        p={3}
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100%'
      >
        <Stack spacing={3} alignItems='center'>
          <Typography variant='h6'>No chat history found.</Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={onRequestConversation}
          >
            Request Conversation with Therapist
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Stack spacing={3}>
        {chatHistory.messages.map((el, index) => {
          if (el.file) {
            return (
              <MediaMsg
                userRole={userRole}
                userId={userId}
                key={index}
                el={el}
                menu={menu}
              />
            );
          }
          if (el.content) {
            return (
              <TextMsg
                userRole={userRole}
                userId={userId}
                key={index}
                el={el}
                menu={menu}
              />
            );
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
