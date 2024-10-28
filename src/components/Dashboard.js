// src/components/Dashboard.js

import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import CreateTransaction from './CreateTransaction';
import TransactionTable from './TransactionTable';
import TransactionSummary from './TransactionSummary';
import TrendCharts from './TrendChart';
import RealTimeUpdates from './RealTimeUpdates';
import NotFound from './NotFound';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Dashboard() {
  const [, , removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    navigate('/login');
  };

  // State for controlling the mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation items
  const navItems = [
    { label: 'Summary', path: '/' },
    { label: 'Transactions', path: '/transactions' },
    { label: 'Trends', path: '/trends' },
    { label: 'Real-Time Updates', path: '/real-time' },
    { label: 'Create Transaction', path: '/create-transaction' },
  ];

  // Drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Button
              component={NavLink}
              to={item.path}
              fullWidth
              variant="text"
              sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
            >
              {item.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Transaction Dashboard
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={NavLink}
                  to={item.path}
                  color="inherit"
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile view */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          overflowX: 'auto', // Allow horizontal scrolling
        }}
      >
        <Routes>
          <Route path="/" element={<TransactionSummary />} />
          <Route path="/transactions" element={<TransactionTable />} />
          <Route path="/trends" element={<TrendCharts />} />
          <Route path="/real-time" element={<RealTimeUpdates />} />
          <Route path="/create-transaction" element={<CreateTransaction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard;
