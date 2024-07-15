import React from "react";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StyledBadge from "./StyledBadge";


const ChatElement = ({ userRole, id, status, therapist, parent, onClick }) => {

// const ChatElement = ({ id, name, img, msg, time, online, unread, onClick }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === 'light' ? "#fff" : theme.palette.background.default,
        cursor: 'pointer'
      }}
      p={2}
      onClick={onClick}
    >
      <Stack direction="row" alignItems='center' justifyContent='space-between'>
        <Stack direction='row' spacing={2}>
          {/* {online ? <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar src={img} />
          </StyledBadge> : <Avatar src={img} />} */}
          <Stack spacing={0.3}>
            <Typography variant='subtitle2'>
              {/* {name} */}
              {userRole==='therapist'?parent:therapist}
            </Typography>
            <Typography variant='caption'>
              {/* {msg} */}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems='center'>
          <Typography sx={{ fontWeight: 600 }} variant='caption'>
            {/* {time} */}
          </Typography>
          {/* <Badge color='primary' badgeContent={unread} /> */}
        </Stack>
      </Stack>
    </Box>
  )
};

export default ChatElement;
