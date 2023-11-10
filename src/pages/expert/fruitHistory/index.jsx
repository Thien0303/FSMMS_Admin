import React, { useEffect } from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header";
import { getAllFruitHistory, createAllFruitHistory } from "../../../redux/apiThunk/ExpertThunk/fruitHistoryThunk";
import { tokens } from '../../../theme';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FruitHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const fruitHistory = useSelector((state) => state.fruitHistory?.weather?.data);
  const [reload, setReload] = useState(true);
  console.log("fruit: ", fruitHistory);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllFruitHistory({ location: '', createdDate: ''}));
  }, [dispatch]);
  const handleCreateNewFruitHistory = async () => {
    try {
      await dispatch(createAllFruitHistory({ userId: user?.userId }));
      setReload(!reload);
      toast.success('Bảng so sánh giá đã được cập nhật thành công!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật so sánh giá!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };
  const columns = [
    { field: 'historyId', headerName: 'Mã', flex: 1 },
    { field: 'fruitName', headerName: 'Trái cây', flex: 1 },
    { field: 'price', headerName: 'Giá', flex: 1 },
    { field: 'location', headerName: 'Địa điểm', flex: 1 },
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
  const rows = fruitHistory?.map(item => ({
    ...item,
    id: item.historyId // Sử dụng historyId làm id
  })) || [];
  return (
    <Box m="20px">
      <Header title="Giá cả thị trường" subtitle="Dữ liệu giá trái cây" />
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
       <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px"
          }}
        >
     <Button variant="contained" color="success" onClick={handleCreateNewFruitHistory}>
        Cập nhật mới nhất
      </Button>
      </Box>
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default FruitHistory;
