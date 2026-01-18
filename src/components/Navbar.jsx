// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Menu, MenuItem, Divider, Tooltip } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    handleCloseMenu();
    logout();
    navigate('/login', { replace: true });
  };

  const displayName = user?.fullName || user?.email || 'User';
  const initials = (displayName)
    .split(' ')
    .map(s => s[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Sphinic
        </Typography>

        {/* User menu (Profile + Logout) */}
        <Tooltip title={displayName}>
          <IconButton 
            onClick={handleOpenMenu}
            sx={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {user?.profilePicture ? (
              <Avatar 
                src={user.profilePicture} 
                sx={{ 
                  width: 32, 
                  height: 32,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }} 
              />
            ) : (
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  fontWeight: 600,
                }}
              >
                {initials || 'U'}
              </Avatar>
            )}
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              mt: 1,
              minWidth: 200,
            }
          }}
        >
          <MenuItem 
            disabled 
            sx={{ 
              opacity: 0.7,
              color: 'white',
              fontWeight: 500,
            }}
          >
            {displayName}
          </MenuItem>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
          <MenuItem 
            component={RouterLink} 
            to="/profile" 
            onClick={handleCloseMenu}
            sx={{
              color: 'white',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Profile
          </MenuItem>
          <MenuItem 
            onClick={handleLogout}
            sx={{
              color: 'white',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
