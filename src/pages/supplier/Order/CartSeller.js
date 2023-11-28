import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const PopupSeller = ({ open, onClose, imageMomoUrl, depositAmount }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Vui lòng quét mã</DialogTitle>
      <DialogContent>
        <Typography variant="h5" color="green" sx={{marginBottom: "10px", fontWeight: "bold"}}>Số tiền cần hoàn trả: {depositAmount} đồng</Typography>
        <img
          src={imageMomoUrl}
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

export default PopupSeller;
