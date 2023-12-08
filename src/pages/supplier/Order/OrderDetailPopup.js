import React from "react";
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";

const OrderDetailsPopup = ({ open, handleClose, orderDetails }) => {
    console.log("abc: ", orderDetails);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle style={{color: "green", fontSize: "20px"}}>Thông tin chi tiết đơn hàng</DialogTitle>
      <DialogContent>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row" style={{fontSize: "15px"}}>Tên trái cây</TableCell>
              <TableCell component="th" scope="row" style={{fontSize: "15px"}}>Số lượng</TableCell>
              <TableCell component="th" scope="row" style={{fontSize: "15px"}}>Giá sản phẩm</TableCell>
              <TableCell component="th" scope="row" style={{fontSize: "15px"}}>Loại đặt hàng</TableCell>
              <TableCell component="th" scope="row" style={{fontSize: "15px"}}>Tổng tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails?.map((detail, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{detail.fruitName}</TableCell>
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{detail.quantity}</TableCell>
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{detail.unitPrice * 1000} vnđ</TableCell>
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{detail.oderDetailType}</TableCell>
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{detail.totalAmount * 1000} vnđ</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsPopup;
