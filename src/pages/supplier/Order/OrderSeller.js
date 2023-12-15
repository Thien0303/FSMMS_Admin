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
  const [rows, setRows] = useState([]);
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
    setSelectedOrderDetails(row.orderDetails,);
    setIsDetailPopupOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailPopupOpen(false);
  };
  const handleUpdateOrder = (action, status) => {
    if (selectedOrderId) {
      let updatedStatus;
      switch (action) {
        case "Shipping":
          updatedStatus = "Shipping"; 
          break;
          case "Accepted":
            if (status === "Đang giao hàng") {
              updatedStatus = "Accepted";
            } else {
              toast.warning("The order must be in 'Shipping' status to mark as 'Accepted'");
            }
            break;
          case "UserRefused":
            if (status === "Đang giao hàng") {
              updatedStatus = "UserRefused";
            } else {
              toast.warning("The order must be in 'Shipping' status to mark as 'UserRefused'");
            }
            break;
        case "Rejected":
          updatedStatus = "Rejected";
          break;
        default:
          break;
      }
  
      if (updatedStatus) {
        dispatch(updateAllOrder({ id: selectedOrderId, action: updatedStatus }))
          .then((response) => {
            console.log("Update successful:", response);
            const updatedRows = rows.map(row => {
              if (row.id === selectedOrderId) {
                return {
                  ...row,
                  status: updatedStatus,
                };
              }
              return row;
            });
            setRows(updatedRows);
  
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
      headerName: "Số tiền cần thanh toán",
      flex: 1,
      valueFormatter: (params) => `${params.value * 1000} vnđ`,
    },
    {
      field: `deliveryAddress`,
      headerName: "Địa chỉ nhận hàng",
      flex: 1,
    },
    {
      field: `phoneNumber`,
      headerName: "Số điện thoại",
      flex: 1,
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
      headerName: "Quản lý",
      flex: 0.5,
      renderCell: (params) => {
        const status = params.row.status;
        if (status === "Đang chờ xử lý" || status === "Đang giao hàng") {
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
                {status === "Đang giao hàng" && (
                  <div>
                    <MenuItem onClick={() => handleUpdateOrder("Accepted",  params.row.status)}>
                      Nhận hàng thành công
                    </MenuItem>
                    <MenuItem onClick={() => handleUpdateOrder("UserRefused",  params.row.status)}>
                      Từ chối nhận hàng
                    </MenuItem>
                  </div>
                )}
                {status !== "Đang giao hàng" && (
                  <div>
                    <MenuItem onClick={() => handleUpdateOrder("Shipping")}>
                      Đồng ý
                    </MenuItem>
                    <MenuItem onClick={() => handleUpdateOrder("Rejected")}>
                      Từ chối
                    </MenuItem>
                  </div>
                )}
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
    }
    
    
  ];
  const updatedRow = orderSeller?.map((item) => {
    const orderDetails = item.orderDetails || [];
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
  
    // Mapping các trạng thái từ mã sang văn bản
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
      ...item,
      id: item.orderId,
      fullName: item.fullName,
      deliveryAddress: item.deliveryAddress,
      phoneNumber: item.phoneNumber,
      discountName: item.discountName,
      orderDate: item.orderDate,
      totalAmount: item.totalAmount,
      fruitName: fruitName,
      quantity: quantity,
      unitPrice: unitPrice,
      oderDetailType: oderDetailType,
      status: statusText, 
      orderDetails: orderDetails,
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
          rows={updatedRow}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        <OrderDetailSeller
          open={isDetailPopupOpen}
          anchorEl={anchorEl}
          handleClose={handleDetailClose}
          orderDetails={selectedOrderDetails}
        />
      </Box>
    </Box>
  );
};

export default OrderSeller;
