import { useState } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import api from '../../api/api'
import { Button } from 'bootstrap';
const PopupOTP = (open, onClose) => {
  
  const [otpValue, setOtpValue] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle>Nhập mã OTP</DialogTitle>
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Mã OTP"
          variant="outlined"
          margin="normal"
          fullWidth
          autoFocus
          value={otpValue}
          onChange={(e) => setOtpValue(e.target.value)}
        />
        <DialogActions>
          <Button variant="contained" type="submit">
            Xác nhận
          </Button>
        </DialogActions>
      </form>
    </DialogContent>
  </Dialog>
  );
};

export default PopupOTP;
