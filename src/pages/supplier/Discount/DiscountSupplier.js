import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiscoutSupplier } from "../../../redux/apiThunk/SupplierThunk/discountFruitThunk";

const DiscountSupplier = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const fruitDiscount = useSelector((state) => state.discountFruit?.discountFruitSupplier?.data);
  useEffect(() => {
    if(!isDataLoaded && user){
      dispatch(getAllDiscoutSupplier({discountName :"", discountExpiryDate: "", fruitId: "",userId: user.userId  }));
      setIsDataLoaded(true);
    }
}, [dispatch, user, isDataLoaded]);
  const columns = [
    { field: 'fruitName', headerName: 'Sản phẩm', flex: 1 },
    { field: 'discountName', headerName: 'Tên giảm giá', flex: 1 },
    { field: 'discountThreshold', headerName: 'Số lượng giảm giá', flex: 1 },
    { field: `discountPercentage`, headerName: 'Số phần trăm giảm giá', flex: 1, valueFormatter: (params) => `${params.value * 100}%`, },
    { field: 'depositAmount', headerName: 'Số phần trăm trả trước', flex: 1,  valueFormatter: (params) => `${params.value * 100}%`, },
    { 
      field: 'discountExpiryDate', 
      headerName: 'Hạn giảm giá', 
      flex: 1, 
      valueGetter: (params) => {
        const createdDate = new Date(params.row.discountExpiryDate);
        return createdDate.toLocaleDateString('en-US');
      }
    }
  ];
  const rows = fruitDiscount?.map(item => ({
    ...item,
    id: item.fruitDiscountId
  })) || [];
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

export default DiscountSupplier;
