import React from 'react';
import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from '../layouts/dashboard';

// config
import { DEFAULT_PATH } from '../config';
import LoadingScreen from '../components/LoadingScreen';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const LoginPage = Loadable(lazy(() => import('../pages/auth/Login')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));

export default function Router() {
  return (
    <AuthProvider>
      {useRoutes([
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/',
          element: <PrivateRoute element={<DashboardLayout />} />,
          children: [
            { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
            { path: 'app', element: <GeneralApp /> },
            { path: '404', element: <Page404 /> },
            { path: '*', element: <Navigate to="/404" replace /> },
          ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },
      ])}
    </AuthProvider>
  );
}
