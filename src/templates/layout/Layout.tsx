import { useAuth } from '../../context/AuthContext';
import { Outlet, useLocation,Link  } from 'react-router-dom';
import * as React from 'react';
import { Box, createTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work'; // ícono para "job" o "trabajo"
import {
  AppProvider,
  type Session,
  type Navigation,
  DashboardLayout
} from '@toolpad/core';
import { DemoProvider } from '@toolpad/core/internal';

interface LayoutProps {
//   children: React.ReactNode;
  window?: () => Window;
}

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Layout = ({ window }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: user?.name || '',
      email: user?.email || '',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
        //   active: location.pathname.includes('/dashboard'),
    },
    {
        segment: 'job',
        title: 'Postulaciones',
        icon: <WorkIcon />,
    }
    // Agrega más rutas según necesites
  ];

  const authentication = React.useMemo(() => ({
    signIn: () => {
      setSession({
        user: {
          name: user?.name || '',
          email: user?.email || '',
        },
      });
    },
    signOut: logout,
  }), [user, logout]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <>
      <DemoProvider window={demoWindow}>
        <AppProvider
          session={session}
          authentication={authentication}
          navigation={NAVIGATION}
          branding={{
            logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
            title: 'MUI',
            homeUrl: '/dashboard',
          }}
          theme={demoTheme}
          window={demoWindow}
        >
          <DashboardLayout>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Outlet />
            </Box>
          </DashboardLayout>
        </AppProvider>
      </DemoProvider>
      
    </>
  );
};

export default Layout;