import React, { useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import {
  getAllFruitHistory,
  createAllFruitHistory,
} from "../../../redux/apiThunk/ExpertThunk/fruitHistoryThunk";
import { tokens } from "../../../theme";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { getAllTopPost } from "../../../redux/apiThunk/AdminThunk/systemThunk";
const CountPost = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const dataPost = useSelector((state) => state?.getUser?.getTopPost);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(getAllTopPost());
      setIsDataLoaded(true);
    }
  }, [dispatch, user, isDataLoaded]);

  const columns = [
    {
      field: "profileImageUrl",
      headerName: "Ảnh cá nhân",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    { field: "fullName", headerName: "Tên", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "postCount", headerName: "Số bài đăng", flex: 1 },
  ];
  const rows =
    dataPost?.map((item) => ({
      ...item,
      id: item.userId,
    })) || [];
  return (
    <Box m="20px">
      <Header title="Top 10" subtitle="Số người có bài đăng nhiều nhất" />
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
            marginBottom: "10px",
          }}
        ></Box>
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          pageSize={20}
          pagination
        />
      </Box>
    </Box>
  );
};

export default CountPost;
