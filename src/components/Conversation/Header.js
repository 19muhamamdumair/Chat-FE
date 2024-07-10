import { Avatar, Box, Typography, IconButton, Divider, Stack, Button, } from '@mui/material'
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react'
import React, { useEffect, useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { faker } from '@faker-js/faker';
import StyledBadge from '../StyledBadge';
import { ToggleSidebar } from '../../redux/slices/app';
import { useDispatch } from 'react-redux';

const Header = ({ selectedChat, user }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [refresh, setRefresh] = useState(true);

    // useEffect(() => {
    //     setRefresh(!refresh)
    // }, [selectedChat])
    return (
        <Box p={2} sx={{ width: '100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper, boxShadow: '0px 0px 2px rgba(0,0,0,0.25)' }}>
            <Stack alignItems={'center'} direction='row' justifyContent={'space-between'}
                sx={{ width: '100%', height: '100%' }}>
                <Stack onClick={() => {
                    dispatch(ToggleSidebar());
                }} direction={'row'} spacing={2}>
                    <Box>
                        <StyledBadge overlap="circular"
                            anchorOrigin={{ // position
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            variant="dot">
                            <Avatar alt={""} src={selectedChat?.img} />
                        </StyledBadge>

                    </Box>
                    <Stack spacing={0.2}>
                        <Typography variant='subtitle2'>
                            {selectedChat?.name}
                        </Typography>
                        <Typography variant='caption'>
                            {selectedChat?.online === true ? 'Online' : 'Offline'}
                        </Typography>
                    </Stack>
                </Stack>
                {selectedChat.conversationRequest === false && user.role === 'therapist' ?
                    <Stack direction='row' alignItems='center' spacing={3}>
                        <Button variant='contained' color='primary' onClick={() => {

                        }}>Close Conversation</Button>

                    </Stack>

                    : user.role === 'patient' && selectedChat.conversationClosed === true ?
                        <Stack direction='row' alignItems='center' spacing={3}>
                            <Button variant='contained' color='primary' onClick={() => {

                            }}>Request Again For Conversation</Button>

                        </Stack> :
                        ""
                }

            </Stack>
        </Box>
    )
}

export default Header