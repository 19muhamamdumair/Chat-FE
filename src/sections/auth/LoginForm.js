import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextField } from '../../components/hook-form/index';
import { useAuth } from '../../routes/AuthContext'; // Make sure this path matches your project structure

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validation rules
  const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const defaultValues = {
    username: '',
    password: ''
  };

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues
  });

  const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods;

  const onSubmit = async (data) => {
    try {
      const userInfo = await login(data); // Pass the login data (credentials) to the login function

      if (userInfo && userInfo.id) {
        navigate('/'); // Redirect to the default path after login
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.log(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

        <RHFTextField fullWidth name='username' label='Username' />
        <RHFTextField
          name='password'
          label='Password'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Stack>
      <Stack alignItems={'flex-end'} sx={{ my: 2 }}>
        {/* <Link component={RouterLink} to='/auth/reset-password'
          variant='body2' color='inherit' underline='always'>Forgot Password?</Link> */}
      </Stack>
      <Button
        color='inherit'
        size='large'
        type='submit'
        variant='contained'
        sx={{
          width: '50%',
          bgcolor: 'text.primary',
          color: (theme) => theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
          }
        }}
      >
        Login
      </Button>
    </FormProvider>
  );
};

export default LoginForm;
