import { Avatar, Box, Typography, IconButton, Divider, Stack, Button, Modal, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { CaretDown, MagnifyingGlass, Phone, VideoCamera, Bell } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { useDispatch } from 'react-redux';
import StyledBadge from '../StyledBadge';
import { ToggleSidebar } from '../../redux/slices/app';
import { changeConversationStatus, postMessage } from '../../services/miscservices';

const Header = ({selectedChat, user, ws }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState(false);
    const [requests, setRequests] = useState([]);

    const handleNotificationClick = () => {
        if (requests.length > 0) {
            setOpen(true);
            setNotification(false); // Reset notification
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = async(request,index) => {
        const response = await postMessage("Hi,I have accepted your requested",request.conversationId,request.receiverId);
        const response2 = await changeConversationStatus(request.conversationId,1);
        // Handle accepting the request
        removeRequest(index);
        window.location.reload();
    };

    const handleReject = (index) => {
        // Handle rejecting the request
        removeRequest(index);
    };

    const removeRequest = (index) => {
        setRequests((prevRequests) => {
            const newRequests = [...prevRequests];
            newRequests.splice(index, 1);
            return newRequests;
        });
    };

    const closeConversation =async (request)=>{
        const response2 = await changeConversationStatus(request.id,4);
        window.location.reload();

    }

    useEffect(() => {
        if(ws && ws.current)
        {

            ws.current.onmessage = async (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'conversation_request') {
                    setNotification(true);
                    setRequests((prevRequests) => [...prevRequests, data]);
                }
            };
        }
    }, [ws]);

    useEffect(() => {
        //call api
    }, []);

    return (
        <Box p={2} sx={{ width: '100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper, boxShadow: '0px 0px 2px rgba(0,0,0,0.25)' }}>
            <Stack alignItems={'center'} direction='row' justifyContent={'space-between'} sx={{ width: '100%', height: '100%' }}>
                <Stack onClick={() => {
                    dispatch(ToggleSidebar());
                }} direction={'row'} spacing={2}>
                    <Box>
                        <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                            {/* <Avatar alt={""} src={selectedChat?.img} /> */}
                        </StyledBadge>
                    </Box>
                    <Stack spacing={0.2}>
                        <Typography variant='subtitle2'>
                            {user?.role === 'therapist' ? selectedChat?.parent : selectedChat?.therapist}
                        </Typography>
                        <Typography variant='caption'>
                            {/* {selectedChat?.online === true ? 'Online' : 'Offline'} */}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction='row' alignItems='center' spacing={3}>
                    {selectedChat?.status === 1 && selectedChat?.messages.length > 0 && user?.role === 'therapist' &&
                        <Button variant='contained' color='primary' onClick={()=>closeConversation(selectedChat)}>Close Conversation</Button>
                    }
                    {/* {user.role === 'parent' && selectedChat?.status === 4 &&
                        <Button variant='contained' color='primary' onClick={() => {
                            // Request again for conversation logic
                        }}>Request Again For Conversation</Button>
                    } */}

                    {user.role === 'therapist' &&
                        <IconButton onClick={handleNotificationClick}>
                            <Bell color={notification ? 'red' : 'green'} />
                        </IconButton>
                    }
                </Stack>
            </Stack>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{ ...modalStyle }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
                        Chat Requests
                    </Typography>
                    <List>
                        {requests.map((request, index) => (
                            <ListItem key={index} alignItems="flex-start">
                                <ListItemText
                                    primary={`Chat Request from ${request.username}`}
                                />
                                <ListItemSecondaryAction>
                                    <Button variant="contained" color="primary" onClick={() => handleAccept(request,index)} sx={{ mr: 1 }}>Accept</Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleReject(request,index)}>Reject</Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
        </Box>
    );
}

// Define the modal style
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default Header;
