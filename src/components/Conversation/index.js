import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import { Chat_History as initialChatHistory } from '../../data'; // Make sure the path is correct

const Conversation = () => {
    const theme = useTheme();
    const [chatHistory, setChatHistory] = useState(initialChatHistory);

    const handleSendMessage = (message) => {
        const newMessage = {
            type: "msg",
            message: message,
            incoming: false,
            outgoing: true,
            // text?: undefined;
            // subtype?: undefined;
            // img?: undefined;
            // preview?: undefined;
            // reply?: undefined;
        };
        setChatHistory([...chatHistory, newMessage]);
    };

    return (
        <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
            <Header />
            <Box className='scrollbar' width={"100%"} sx={{ flexGrow: 1, height: '100%', overflowY: 'scroll' }}>
                <Message chatHistory={chatHistory} />
            </Box>
            <Footer onSendMessage={handleSendMessage} />
        </Stack>
    );
};

export default Conversation;


