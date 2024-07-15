import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import ChatElement from '../../components/ChatElement';
import { getUserInfo } from '../../services/userservice';

const Chats = ({ setSelectedChat }) => {
  const theme = useTheme();
  const [conversations, setConversations] = useState([]);
  // const userRole = localStorage.getItem('userRole'); // Replace with actual key used in local storage
  // const userId = localStorage.getItem('userId'); // Replace with actual key used in local storage
  // const [user,setUser]

  const [userRole,setUserRole]=useState(null);
  const [userId,setUserId] =useState(null)


  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('http://13.60.35.232:8000/api/conversations/', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxMDgwNzcxLCJpYXQiOjE3MjA5OTQzNzEsImp0aSI6IjExNDE0OTdhM2U0NDQ3MDRiYTNhNTk0MzlkNTc1OGZjIiwidXNlcl9pZCI6MTF9.j0neBlN2aBFYi9SapE6SQgL7AbG8e4E78SAndOEAC7E`,
          },
        });

        const storedUser = getUserInfo();
        setUserRole(storedUser.role);
        setUserId(storedUser.id)

        debugger


        // Filter conversations based on user role and ID
        const filteredConversations = response.data.filter(el => {
          if (storedUser.role === 'therapist') {
            return el.therapist === parseInt(storedUser.id);
          } else if (storedUser.role  === 'patient') {
            return el.parent === parseInt(storedUser.id);
          }
          return false;
        });

        console.log(filteredConversations)

        setConversations(filteredConversations);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };

    fetchConversations();
  }, [userRole, userId]); // Include userRole and userId in dependency array

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
            {userRole === 'therapist' && conversations.filter(el => el.status === 2).length > 0 &&
              <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                Requests
              </Typography>
            }

            {userRole === 'therapist' &&
              conversations.filter(el => el.status === 2).map(el => (
                <ChatElement userRole={userRole} key={el.id} {...el} onClick={() => setSelectedChat(el)} />
              ))
            }

            <Typography variant='subtitle2' sx={{ color: "#676767" }}>
              {userRole === 'patient' ? "All Therapists" : "All Patients"}
            </Typography>

            {conversations.filter(el => el.status === 1).map(el => (
              <ChatElement userRole={userRole}  key={el.id} {...el} onClick={() => setSelectedChat(el)} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
