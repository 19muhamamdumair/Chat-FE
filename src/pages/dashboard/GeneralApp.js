import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app); // access our store inside component
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Stack direction='row' sx={{ width: '100%' }}>
      {/* Chats */}
      <Chats setSelectedChat={setSelectedChat} />

      <Box sx={{ height: '100%', width: sidebar.open ? 'calc(100vw - 740px)' : 'calc(100vw - 420px)', backgroundColor: theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.default }}>
        {/* Conversation */}
        <Conversation selectedChat={selectedChat} />
      </Box>
      {/* Contact */}
      {sidebar.open && (() => {
        switch (sidebar.type) {
          case 'CONTACT':
            return <Contact />
          case 'STARRED':
            return <StarredMessages />
          case 'SHARED':
            return <SharedMessages />
          default:
            break;
        }
      })()}
    </Stack>
  );
};

export default GeneralApp;
