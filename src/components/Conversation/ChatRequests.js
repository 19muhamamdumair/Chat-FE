// src/components/ChatRequests.js

import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

const ChatRequests = ({ requests, onApprove }) => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {requests.map((request, index) => (
          <Box
            key={index}
            sx={{
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: 1,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6">{request.parent.username} has requested a chat.</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onApprove(request.id)}
            >
              Approve Chat
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ChatRequests;
