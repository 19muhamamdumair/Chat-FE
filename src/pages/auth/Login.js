import { Link, Stack, Typography } from '@mui/material'
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthSocial from '../../sections/auth/AuthSocial';
import LoginForm from '../../sections/auth/LoginForm';

const Login = () => {
  return (
    <>
    <Stack spacing={2} sx={{margin:'50px', display:'flex'}}>
      <Typography variant='h4'>
        Login to Chat
      </Typography>
      {/* Login form */}
      <LoginForm/>
      {/* Auth Social */}
      {/* <AuthSocial/> */}
    </Stack>
    </>
  )
}

export default Login