import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const Popup = ({ open, onClose, imageUrl }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Vui lòng quét mã</DialogTitle>
      <DialogContent>
        <img
          src={imageUrl}
          alt="QR Code"
          style={{ width: "100%", height: "auto" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
