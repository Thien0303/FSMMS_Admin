import React, { useEffect } from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header";
import { tokens } from '../../../theme';
import { useState } from 'react';
import { getAllUser } from '../../../redux/apiThunk/AdminThunk/systemThunk';
const GetUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.getUser?.getUser?.data);
  console.log("data: ", getUser);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
  if(!isDataLoaded){
    dispatch(getAllUser());
    setIsDataLoaded(true);
  }
  }, [dispatch, isDataLoaded]);
  const columns = [
    { field: 'fullName', headerName: 'Tên người dùng', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 1 },
    { field: 'address', headerName: 'Địa chỉ', flex: 1 },
    { field: 'roleName', headerName: 'Vai trò', flex: 1 },
    { 
      field: 'createdDate', 
      headerName: 'Ngày tạo', 
      flex: 1, 
      valueGetter: (params) => {
        const createdDate = new Date(params.row.createdDate);
        return createdDate.toLocaleDateString('en-US');
      }
    }
  ];
  const rows = getUser?.map(item => ({
    ...item,
    id: item.userId
  })) || [];
  return (
    <Box m="20px">
      <Header title="Dữ liệu" subtitle="Thông tin người dùng hệ thống" />
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
        }}
      >

        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default GetUser;
