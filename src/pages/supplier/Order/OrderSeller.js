import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  updateAllOrder,
} from "../../../redux/apiThunk/SupplierThunk/orderThunk";
import EditIcon from "@mui/icons-material/Edit";
import { Popover, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";
import OrderDetailSeller from "./OrderDetailSellerPopup";
import PopupSeller from "./CartSeller";
const OrderSeller = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const orderSeller = useSelector((state) => state.order?.order?.data);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(null);
  const [imageMomoUrl, setImageMomoUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleMenuClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const handleDetailClick = (event, row) => {
    console.log("row.orderDetails", row.orderDetails);
    setAnchorEl(event.currentTarget);
    setSelectedOrderDetails(row.orderDetails);
    setIsDetailPopupOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailPopupOpen(false);
  };
  const handleUpdateOrder = (action) => {
    if (selectedOrderId && (action === "Accepted" || action === "Rejected")) {
      dispatch(updateAllOrder({ id: selectedOrderId, action: action }))
        .then((response) => {
          console.log("Update successful:", response);
          if (
            action === "Rejected" &&
            response?.payload.depositAmount &&
            response?.payload.imageMomoUrl
          ) {
            setDepositAmount(response?.payload.depositAmount);
            setImageMomoUrl(response?.payload.imageMomoUrl);
            setOpen(true);
          }
          dispatch(
            getAllOrder({
              buyerUserId: "",
              sellerUserId: user.userId,
              status: "",
            })
          );
          handleMenuClose();
          toast.success("Cập nhật trạng thái đơn hàng thành công");
        })
        .catch((error) => {
          console.error("Update failed:", error);
          toast.error("Cập nhật trạng thái đơn hàng thất bại");
        });
    }
  };
  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(
        getAllOrder({ buyerUserId: "", sellerUserId: user.userId, status: "" })
      );
      setIsDataLoaded(true);
    }
  }, [dispatch, user, isDataLoaded]);

  const columns = [
    { field: "id", headerName: "Mã đơn hàng", flex: 0.7},
    { field: "fullName", headerName: "Tên khách hàng", flex: 0.9 },
    {
      field: `totalAmount`,
      headerName: "Tổng số tiền",
      flex: 1,
      valueFormatter: (params) => `${params.value * 1000} vnđ`,
    },
    {
      field: `depositAmount`,
      headerName: "Số tiền thanh toán trước",
      flex: 1.2,
      valueFormatter: (params) => `${params.value * 1000} vnđ`,
    },
    {
      field: `remainingAmount`,
      headerName: "Số tiền thanh toán sau",
      flex: 1,
      valueFormatter: (params) => `${params.value * 1000} vnđ`,
    },
    {
      field: "discountExpiryDate",
      headerName: "Ngày đặt hàng",
      flex: 1,
      valueGetter: (params) => {
        const createdDate = new Date(params.row.orderDate);
        return createdDate.toLocaleDateString("en-US");
      },
    },
    { field: "status", headerName: "Trạng thái", flex: 1 },
    {
      field: "orderDetails",
      headerName: "Xem đơn hàng chi tiết",
      flex: 1,
      renderCell: (params) => (
        <Button
          onClick={(event) => handleDetailClick(event, params.row)}
          sx={{ textTransform: "none" }}
        >
          Xem đơn hàng
        </Button>
      ),
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => {
        if (params.row.status === "Đang chờ xử lý") {
          return (
            <span style={{ cursor: "pointer" }}>
              <MoreVertIcon
                color="action"
                onClick={(event) => handleMenuClick(event, params.row.id)}
              />
              <Popover
                open={isMenuOpen && selectedOrderId === params.row.id}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => handleUpdateOrder("Accepted")}>
                  Đồng ý
                </MenuItem>
                <MenuItem onClick={() => handleUpdateOrder("Rejected")}>
                  Từ chối
                </MenuItem>
              </Popover>
            </span>
          );
        } else {
          return (
            <MoreVertIcon
              color="action"
              style={{ color: "gray", cursor: "not-allowed" }}
            />
          );
        }
      },
    },
  ];
  const rows =
    orderSeller?.map((item) => {
      const orderDetails = item.orderDetails || []; // Kiểm tra và thiết lập mặc định nếu orderDetails không tồn tại
      let fruitName = "";
      let quantity = "";
      let unitPrice = "";
      let totalAmount = "";
      let oderDetailType = "";
      let status = "";
      if (orderDetails.length > 0) {
        const firstOrderDetail = orderDetails[0];
        fruitName = firstOrderDetail.fruitName;
        quantity = firstOrderDetail.quantity;
        unitPrice = firstOrderDetail.unitPrice;
        totalAmount = firstOrderDetail.totalAmount;
        oderDetailType = firstOrderDetail.oderDetailType;
        status =
          firstOrderDetail.status === "Pending"
            ? "Đang chờ xử lý"
            : firstOrderDetail.status === "Rejected"
            ? "Đơn hàng đã bị từ chối"
            : firstOrderDetail.status === "Accepted"
            ? "Đơn hàng đã được duyệt"
            : firstOrderDetail.status;
      }
      return {
        id: item.orderId,
        fullName: item.fullName,
        discountName: item.discountName,
        orderDate: item.orderDate,
        remainingAmount: item.remainingAmount,
        depositAmount: item.depositAmount,
        fruitName: fruitName,
        quantity: quantity,
        unitPrice: unitPrice,
        totalAmount: totalAmount,
        oderDetailType: oderDetailType,
        status: status,
        orderDetails: orderDetails, // Thêm orderDetails vào dòng dữ liệu
      };
    }) || [];
  return (
    <Box m="20px">
      <Header title="Đơn hàng" subtitle="Quản lý danh sách đơn hàng" />
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
        <OrderDetailSeller
          open={isDetailPopupOpen}
          anchorEl={anchorEl}
          handleClose={handleDetailClose}
          orderDetails={selectedOrderDetails}
        />
        <PopupSeller
          open={open}
          onClose={() => setOpen(false)}
          depositAmount={depositAmount} 
          imageMomoUrl={imageMomoUrl} 
        />
      </Box>
    </Box>
  );
};

export default OrderSeller;
