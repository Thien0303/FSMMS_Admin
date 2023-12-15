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
    {
        field: `totalAmount`,
        headerName: "Tổng số tiền cần thanh toán",
        flex: 1,
        valueFormatter: (params) => `${params.value * 1000} vnđ`,
      },
      // {
      //   field: `depositAmount`,
      //   headerName: "Số tiền thanh toán trước",
      //   flex: 1,
      //   valueFormatter: (params) => `${params.value * 1000} vnđ`,
      // },
      // {
      //   field: `remainingAmount`,
      //   headerName: "Số tiền thanh toán sau",
      //   flex: 1,
      //   valueFormatter: (params) => `${params.value *1000} vnđ`,
      // },
    { field: "status", headerName: "Trạng thái", flex: 1 },
    {
        field: "orderDetails",
        headerName: "Xem đơn hàng chi tiết",
        flex: 1,
        renderCell: (params) => (
          <Button onClick={(event) => handleDetailClick(event, params.row)} sx={{ textTransform: 'none' }}>
            Xem đơn hàng
          </Button>
        ),
      },
  ];
  const rows =
  orderSeller?.map((item) => {
    const orderDetails = item.orderDetails || []; // Kiểm tra và thiết lập mặc định nếu orderDetails không tồn tại
    let fruitName = "";
    let quantity = "";
    let unitPrice = "";
    let oderDetailType = "";
    if (orderDetails.length > 0) {
      const firstOrderDetail = orderDetails[0];
      fruitName = firstOrderDetail.fruitName;
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
      fullName: item.fullName,
      discountName: item.discountName,
      orderDate: item.orderDate,
      remainingAmount: item.remainingAmount,
      depositAmount: item.depositAmount,
      totalAmount: item.totalAmount,
      fruitName: fruitName,
      quantity: quantity,
      unitPrice: unitPrice,
      oderDetailType: oderDetailType,
      status: statusText,
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
