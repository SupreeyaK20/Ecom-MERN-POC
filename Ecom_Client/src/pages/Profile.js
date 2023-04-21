import { Avatar, Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Iconify from '../components/iconify';

export default function Profile() {
  const { user } = useSelector((state) => state.login);
  console.log(user);
  return (
    <Card sx={{ maxWidth: 'sm', margin: 'auto' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          sx={{
            width: 128,
            height: 128,
            margin: '0 auto 16px',
            backgroundColor: 'rgba(145, 158, 171, 0.8)', 
            fontSize: '4rem', 
          }}
        >
          {user.username
            .split(' ')
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join('')}
        </Avatar>
        <Typography variant="h5" component="h2" align="center">
          {user.username}
        </Typography>
        <Typography color="textSecondary" gutterBottom align="center">
          {user.email}
        </Typography>
        <Typography color="textSecondary" gutterBottom align="center">
          {user.phone}
        </Typography>
        <Button variant="contained" sx={{ marginTop: '16px' }}>
            Update Profile
        </Button>
      </CardContent>
      
    </Card>
  );
}
