import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { CircleDashed, MagnifyingGlass } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import { getUserInfo } from "../../services/userservice";
import { getAllParents, getAllTherapist, getConversations } from "../../services/miscservices";
import modifiedListTherapist from "../../helper/usersListAlter";
// const dotenv = require("dotenv");

// dotenv.config({ path: ".env" });

const Chats = ({ setSelectedChat }) => {
  const theme = useTheme();
  const [conversations, setConversations] = useState([]);
  // const userRole = localStorage.getItem('userRole'); // Replace with actual key used in local storage
  // const userId = localStorage.getItem('userId'); // Replace with actual key used in local storage
  // const [user,setUser]

  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);

        const response = await getConversations();


        const storedUser = getUserInfo();

        setUserRole(storedUser.role);
        setUserId(storedUser.id);

        // Filter conversations based on user role and ID
        const filteredConversations = response.data.filter((el) => {
          if (storedUser.role === "therapist") {
            return el.therapist === parseInt(storedUser.id);
          } else if (storedUser.role === "parent") {
            return el.parent === parseInt(storedUser.id);
          }
          return false;
        });

        if (storedUser.role === "parent") {
          const allTherapist = await getAllTherapist();
          console.log("69", allTherapist.data);
          filteredConversations.map((conv) => {
            let therapist = conv.therapist;
            let tData = allTherapist.data.find(t => t.user_id === therapist);
            conv.username = tData.username ? tData.username : "";

          })
          console.log("modifiedConversations", filteredConversations);
          setConversations(filteredConversations);
          setIsLoading(false);
          // setIsLoading(false);

        } else {
          const allParents = await getAllParents();
          // const convObject={
          //   id:'',
          //   parent:'',
          //   therapist:'',
          //   status:'',
          //   username
          // }
          filteredConversations.map((conv) => {
            let parent = conv.parent;
            let pData = allParents.data.find(p => p.user_id === parent);
            conv.username = pData.username ? pData.username : "";

          })
          console.log("modifiedConversations", filteredConversations);
          setConversations(filteredConversations);
          setIsLoading(false);

        }

        //getparent or getTherapist
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    fetchConversations();
  }, []); // Include userRole and userId in dependency array

  return (

    <Box
      sx={{
        position: "relative",
        width: 320,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >

      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='h5'>Chats</Typography>
          {/* <IconButton>
            <CircleDashed />
          </IconButton> */}
        </Stack>

        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color='#709CE6' />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search...'
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>

        <Stack
          className='scrollbar'
          spacing={2}
          direction='column'
          sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
        >
          {isLoading && (
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
          )}
          <Stack spacing={2.4}>
            {/* {userRole === "therapist" &&
              conversations.filter((el) => el.status === 2).length > 0 && (
                <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                  Requests
                </Typography>
              )} */}

            {/* {userRole === "therapist" &&
              conversations
                .filter((el) => el.status === 2)
                .map((el) => (
                  <ChatElement
                    userRole={userRole}
                    key={el.id}
                    {...el}
                    onClick={() => setSelectedChat(el)}
                  />
                ))} */}

            <Typography variant='subtitle2' sx={{ color: "#676767" }}>
              {userRole === "parent" ? "All Therapists" : "All Patients"}
            </Typography>

            {userRole === "therapist" &&
              conversations
                .filter((el) => el.status === 1 || el.status === 2 || el.status===4)
                .map((el) => (
                  <ChatElement
                    userRole={userRole}
                    key={el.id}
                    {...el}
                    onClick={() => setSelectedChat(el)}
                  />
                ))}

            {userRole === "parent" &&
              conversations
                .filter((el) => el.status === 1 || el.status === 2 ||el.status===4)
                .map((el) => (
                  <ChatElement
                    userRole={userRole}
                    key={el.id}
                    {...el}
                    onClick={() => setSelectedChat(el)}
                  />
                ))}


          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
