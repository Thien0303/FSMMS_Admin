import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from '@mui/material';
import DiscountPopup from './DiscountPopup';
const DiscountForm = ({ open, handleClose, initialValues, onSubmit , expiryDate, onDateChange }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Cập nhật mã giảm giá</DialogTitle>
      <Box>
      <DialogContent>
        <DiscountPopup initialValues={initialValues} onSubmit={onSubmit} expiryDate={expiryDate} onDateChange={onDateChange}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ marginRight: '8px' }}>
          Hủy
        </Button>
      </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DiscountForm;
