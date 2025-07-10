// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Chip, Avatar } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: '#FFD600', color: 'black', width: 36, height: 36 }}>
            <BusinessIcon fontSize="small" />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600} color="text.primary">
              EY Proveedores
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gestión de Proveedores 
            </Typography>
          </Box>
        </Box>
        <Chip label="EY" sx={{ bgcolor: '#FFD600', color: '#000', fontWeight: 500 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;