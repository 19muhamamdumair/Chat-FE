import { Navigate, Outlet } from "react-router-dom";
import { Stack } from '@mui/material';

const isAuthenticated = true;

const DashboardLayout = () => {

if(!isAuthenticated){
  return <Navigate to='/auth/login'/>;
}

  return (
    <Stack direction='row'>
      <Outlet />
    </Stack>
    
  );
};

export default DashboardLayout;
