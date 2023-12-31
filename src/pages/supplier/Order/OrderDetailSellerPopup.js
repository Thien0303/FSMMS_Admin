import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}
const OrderDetailSeller = ({ open, handleClose, orderDetails }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle style={{ color: "green", fontSize: "20px" }}>
        Thông tin chi tiết đơn hàng
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "15px" }}
                >
                  Tên trái cây
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "15px" }}
                >
                  Số lượng
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "15px" }}
                >
                  Giá sản phẩm
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "15px" }}
                >
                  Loại đặt hàng
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetails?.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "15px" }}
                  >
                    {detail.fruitName}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "15px" }}
                  >
                    {detail.quantity}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "15px" }}
                  >
                    {formatCurrency(detail.unitPrice * 1000)}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "15px" }}
                  >
                    {detail.oderDetailType}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailSeller;
