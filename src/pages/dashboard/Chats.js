import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import ChatElement from '../../components/ChatElement';

const Chats = ({ setSelectedChat }) => {
  const theme = useTheme();
  const [conversations, setConversations] = useState([]);
  const user = {
    role: 'patient'
  };

  useEffect(() => {
    const fetchConversations = async () => {

      try {
        const response = await axios.get('http://13.60.35.232:8000/api/conversations/?format=api');

        setConversations(response.data);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <Box sx={{
      position: "relative", width: 320,
      backgroundColor: theme.palette.mode === 'light' ? "#F8FAFF" : theme.palette.background.paper,
      boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
    }}>
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack direction="row" alignItems='center' justifyContent='space-between'>
          <Typography variant='h5'>
            Chats
          </Typography>
          <IconButton>
            <CircleDashed />
          </IconButton>
        </Stack>

        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />
          </Search>
        </Stack>

        <Stack className='scrollbar' spacing={2} direction='column' sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}>
          <Stack spacing={2.4}>
            {user.role === 'therapist' &&
              <Stack spacing={2.4}>
                {conversations.filter((el) => el.status==='request').length > 0 &&
                  <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                    Requests
                  </Typography>
                }

                {conversations.filter((el) => el.status==='request').map((el) => (
                  <ChatElement key={el.id} {...el} onClick={() => setSelectedChat(el)} />
                ))}
              </Stack>
            }
            <Typography variant='subtitle2' sx={{ color: "#676767" }}>
              {user.role === 'patient' ? "All Therapists" : "All Patients"}
            </Typography>
            {conversations.filter((el) => el.status==='active').map((el) => (
              <ChatElement key={el.id} {...el} onClick={() => setSelectedChat(el)} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
