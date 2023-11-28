import React from "react";
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

const OrderDetailSeller = ({ open, handleClose, orderDetails }) => {
    console.log("abc: ", orderDetails);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Thông tin chi tiết đơn hàng</DialogTitle>
      <DialogContent dividers >
        <Table>
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
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{detail.unitPrice}</TableCell>
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{detail.oderDetailType}</TableCell>
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{detail.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailSeller;
