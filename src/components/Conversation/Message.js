import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  TimeLine,
} from "./MsgTypes";

const Message = ({ chatHistory, menu, onRequestConversation }) => {
  // if (!chatHistory || !chatHistory.messages || chatHistory.messages.length === 0) {
  //   return (
  //     <Box p={3} display="flex" justifyContent="center" alignItems="center" height="100%">
  //       <Stack spacing={3} alignItems="center">
  //         <Typography variant="h6">No chat history found.</Typography>
  //         <Button variant="contained" color="primary" onClick={onRequestConversation}>
  //           Request Conversation with Therapist
  //         </Button>
  //       </Stack>
  //     </Box>
  //   );
  // }

  return (
    <Box p={3}>
      <Stack spacing={3}>
        {chatHistory.messages.map((el, index) => {
          switch (el.type) {
            case "divider":
              return <TimeLine key={index} el={el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                case "video": // Add video subtype here
                  return <MediaMsg key={index} el={el} menu={menu} />;
                case "doc":
                  return <DocMsg key={index} el={el} menu={menu} />;
                case "link":
                  return <LinkMsg key={index} el={el} menu={menu} />;
                case "reply":
                  return <ReplyMsg key={index} el={el} menu={menu} />;
                default:
                  return <TextMsg key={index} el={el} menu={menu} />;
              }
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
