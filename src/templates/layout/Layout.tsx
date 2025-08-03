import { useAuth } from '../../context/AuthContext';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import {
  AppProvider,
  type Session,
  type Navigation,
  DashboardLayout,
} from '@toolpad/core';
import { DemoProvider } from '@toolpad/core/internal';

interface LayoutProps {
  window?: () => Window;
}

const Layout = ({ window }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  // Escucha los cambios en el atributo 'data-toolpad-color-scheme'
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(()  => {
      const mode = html.getAttribute('data-toolpad-color-scheme') as 'light' | 'dark';
      setColorMode(mode);
    });

    observer.observe(html, { attributes: true, attributeFilter: ['data-toolpad-color-scheme'] });

    // Inicializa en el primer render
    const initialMode = html.getAttribute('data-toolpad-color-scheme') as 'light' | 'dark';
    setColorMode(initialMode || 'light');

    return () => observer.disconnect();
  }, []);

  const demoTheme = useMemo(() =>
    createTheme({
      cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
      },
      colorSchemes: { light: true, dark: true },
      palette: {
        mode: colorMode,
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 600,
          lg: 1200,
          xl: 1536,
        },
      },
    }), [colorMode]
  );

  const [session, setSession] = useState<Session | null>({
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
    },
    {
      segment: 'job',
      title: 'Postulaciones',
      icon: <WorkIcon />,
    },
  ];

  const authentication = useMemo(() => ({
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
          <ThemeProvider theme={demoTheme}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Outlet />
            </Box>
          </ThemeProvider>
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
};

export default Layout;
