import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import {
  getAllOrder
} from "../../../redux/apiThunk/SupplierThunk/orderThunk";
import { tokens } from "../../../theme";
import OrderDetailsPopup from "./OrderDetailPopup";
function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

const OrderBuyer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const orderSeller = useSelector((state) => state.order?.order?.data);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const handleDetailClick = (event, row) => {
    console.log("row.orderDetails", row.orderDetails);
    setAnchorEl(event.currentTarget);
    setSelectedOrderDetails(row.orderDetails);
    setIsDetailPopupOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailPopupOpen(false);
  };


 ;
  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(
        getAllOrder({ buyerUserId: user.userId, sellerUserId: "", status: "" })
      );
      setIsDataLoaded(true);
    }
  }, [dispatch, user, isDataLoaded]);

  const columns = [ 
    { field: "id", headerName: "Mã đơn hàng", flex: 1 },
    {
      field: "orderDate",
      headerName: "Ngày đặt hàng",
      flex: 1,
      valueGetter: (params) => {
        const createdDate = new Date(params.row.orderDate);
        return createdDate.toLocaleDateString("en-US");
      },
    },
    { field: "fullName", headerName: "Người bán", flex: 1 },
    {
        field: `totalAmount`,
        headerName: "Tổng số tiền cần thanh toán",
        flex: 1,
        valueFormatter: (params) => `${formatCurrency(params.value * 1000)}`,
      },
      { field: "deliveryAddress", headerName: "Địa chỉ nhận hàng", flex: 1 },
    { field: "status", headerName: "Trạng thái", flex: 1 },
    {
        field: "orderDetails",
        headerName: "Xem đơn hàng chi tiết",
        flex: 1,
        renderCell: (params) => (
          <Button onClick={(event) => handleDetailClick(event, params.row)} sx={{ textTransform: 'none', color: "green" }}>
            Xem đơn hàng
          </Button>
        ),
      },
  ];
  const rows =
  orderSeller?.map((item) => {
    const orderDetails = item.orderDetails || []; // Kiểm tra và thiết lập mặc định nếu orderDetails không tồn tại
    let fruitName = "";
    let fullName = "";
    let quantity = "";
    let unitPrice = "";
    let oderDetailType = "";
    if (orderDetails.length > 0) {
      const firstOrderDetail = orderDetails[0];
      fruitName = firstOrderDetail.fruitName;
      fullName = firstOrderDetail.fullName;
      quantity = firstOrderDetail.quantity;
      unitPrice = firstOrderDetail.unitPrice;
      oderDetailType = firstOrderDetail.oderDetailType;
    }
    let statusText = "";
    switch (item.status) {
      case "Pending":
        statusText = "Đang chờ xử lý";
        break;
      case "Shipping":
        statusText = "Đang giao hàng";
        break;
      case "Rejected":
        statusText = "Từ chối đơn hàng";
        break;
      case "Accepted":
        statusText = "Đã nhận được hàng";
        break;
      case "UserRefused":
        statusText = "Người dùng từ chối nhận hàng";
        break;
      default:
        break;
    }
    return {
      id: item.orderId,
      discountName: item.discountName,
      orderDate: item.orderDate,
      deliveryAddress: item.deliveryAddress,
      remainingAmount: item.remainingAmount,
      depositAmount: item.depositAmount,
      totalAmount: item.totalAmount,
      fruitName: fruitName,
      quantity: quantity,
      unitPrice: unitPrice,
      oderDetailType: oderDetailType,
      status: statusText,
      fullName: fullName,
      orderDetails: orderDetails, // Thêm orderDetails vào dòng dữ liệu
    };
  }) || [];

  return (
    <Box m="20px">
      <Header title="Đơn hàng" subtitle="Dữ liệu đơn hàng đã đặt" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={20} 
          pagination
        />
    <OrderDetailsPopup
        open={isDetailPopupOpen}
        anchorEl={anchorEl}
        handleClose={handleDetailClose}
        orderDetails={selectedOrderDetails}
      />
      </Box>
    </Box>
  );
};

export default OrderBuyer;
