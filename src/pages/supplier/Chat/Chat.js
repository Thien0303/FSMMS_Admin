import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const ChatIntro = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center', height: '75.7vh'}}>
      <Typography variant="h3" gutterBottom>
        Chào mừng đến với ứng dụng Chat!
      </Typography>
      <Typography variant="body1" paragraph>
        Đây là một ứng dụng chat 
      </Typography>
      <Button variant="contained" color="primary">
        Bắt đầu Chat
      </Button>
    </Container>
  );
};

export default ChatIntro;
