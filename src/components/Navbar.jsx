// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Menu, MenuItem, Divider, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
    <AppBar position="fixed" elevation={0} color="default">
      <Toolbar sx={{ gap: 2 }}>
        <IconButton edge="start" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          FitSpine
        </Typography>

        {/* User menu (Profile + Logout) */}
        <Tooltip title={displayName}>
          <IconButton onClick={handleOpenMenu}>
            {user?.profilePicture ? (
              <Avatar src={user.profilePicture} sx={{ width: 32, height: 32 }} />
            ) : (
              <Avatar sx={{ width: 32, height: 32 }}>{initials || 'U'}</Avatar>
            )}
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem disabled sx={{ opacity: 0.7 }}>{displayName}</MenuItem>
          <Divider />
          <MenuItem component={RouterLink} to="/profile" onClick={handleCloseMenu}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
