import { Box} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../redux/apiThunk/SupplierThunk/orderThunk";

const OrderSeller = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const orderSeller = useSelector((state) => state.order?.order?.data);
  useEffect(() => {
    if(!isDataLoaded ){
      dispatch(getAllOrder({buyerUserId: "", sellerUserId: user.userId, status: ""}));
      setIsDataLoaded(true);
    }
}, [dispatch, user, isDataLoaded]);
  const columns = [
    { field: 'fullName', headerName: 'Tên khách hàng', flex: 1 },
    { field: 'fruitName', headerName: 'Tên sản phẩm', flex: 1 },
    { field: 'oderDetailType', headerName: 'Loại đặt hàng', flex: 1 },
    { field: `totalAmount`, headerName: 'Tổng số tiền', flex: 1, valueFormatter: (params) => `${params.value} vnd`, },
    { field: 'unitPrice', headerName: 'Tiền sản phẩm', flex: 1,  valueFormatter: (params) => `${params.value} vnd`, },
    { field: 'quantity', headerName: 'Số lượng', flex: 1 },
    { 
      field: 'discountExpiryDate', 
      headerName: 'Ngày đặt hàng', 
      flex: 1, 
      valueGetter: (params) => {
        const createdDate = new Date(params.row.orderDate);
        return createdDate.toLocaleDateString('en-US');
      }
    }, { field: 'status', headerName: 'Trạng thái', flex: 1 },
  ];
  const rows = orderSeller?.map(item => {
    let fruitName = '';
    let quantity = '';
    let unitPrice = '';
    let totalAmount = '';
    let oderDetailType = '';
    let status = '';
  
    if (item.orderDetails && item.orderDetails.length > 0) {
      const orderDetails = item.orderDetails[0];
      fruitName = orderDetails.fruitName;
      quantity = orderDetails.quantity;
      unitPrice = orderDetails.unitPrice;
      totalAmount = orderDetails.totalAmount;
      oderDetailType = orderDetails.oderDetailType;
      status = orderDetails.status === 'Pending' ? 'Đang chờ xử lý' : orderDetails.status;
    }
  
    return {
      id: item.orderId,
      fullName: item.fullName,
      discountName: item.discountName,
      orderDate: item.orderDate,
      // ...các thông tin khác từ phần tử cha (item)
      fruitName: fruitName,
      quantity: quantity,
      unitPrice: unitPrice,
      totalAmount: totalAmount,
      oderDetailType: oderDetailType,
      status: status,
      // ...các trường khác từ orderDetails
    };
  }) || [];
  return (
    <Box m="20px">
      <Header
        title="Giảm giá"
        subtitle="Bảng dữ liệu giảm giá"
      />
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
      </Box>
    </Box>
  );
};

export default OrderSeller;
