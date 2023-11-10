import React from 'react';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UpdatePostForm from './UpdatePostForm';
import { Box } from '@mui/material';

const UpdatePostPopup = ({ open, handleClose, initialValues, onSubmit }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Post</DialogTitle>
      <Box>
      <DialogContent>
        <UpdatePostForm initialValues={initialValues} onSubmit={onSubmit} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ marginRight: '8px' }}>
          Cancel
        </Button>
      </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UpdatePostPopup;
