import React from "react";
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}
const OrderDetailsPopup = ({ open, handleClose, orderDetails}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/createFruit");
  };
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
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails?.map((detail, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{detail.fruitName}</TableCell>
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{detail.quantity}</TableCell>
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{formatCurrency(detail.unitPrice * 1000)}</TableCell>
                <TableCell component="th" scope="row" style={{fontSize: "15px"}}>{detail.oderDetailType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button variant="contained" color="success" onClick={handleNavigate}>
            Tạo sản phẩm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsPopup;
