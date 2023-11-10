import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header";
import { getAllWeather, createAllWeather } from '../../../redux/apiThunk/ExpertThunk/weatherThunk';
import { tokens } from '../../../theme';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const WeatherTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather?.weather?.data);
  const [reload, setReload] = useState(true);
  console.log("weather: ", weatherData);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllWeather({ location: '', createdDate: '' }));
  }, [dispatch, reload]);
  const handleCreateNewWeather = async () => {
    try {
      await dispatch(createAllWeather({ userId: user?.userId }));
      setReload(!reload);
      toast.success('Thời tiết đã được cập nhật thành công!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật thời tiết!', {
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
    { field: 'weatherName', headerName: 'Thời Tiết', flex: 1 },
    { field: 'location', headerName: 'Địa điểm', flex: 1 },
    { field: 'image', headerName: '', flex: 1, renderCell: (params) => <img src={params.value} alt="Weather" style={{ width: 50, height: 50 }} /> },
    {
      field: 'description',
      headerName: 'Mô tả chi tiết',
      flex: 1,
      renderCell: (params) => {
        const descriptionData = params.row.description.match(/\[(.*?)\]/g);
        const nhietdo = descriptionData[1];
        const rainChance = descriptionData[2];
        const humidity = descriptionData[6];
        return (
          <div>
            <div><strong>Nhiệt độ:</strong> {nhietdo}</div>
            <div><strong>Dự đoán mưa:</strong> {rainChance}</div>
            <div><strong>Độ ẩm:</strong> {humidity}</div>
          </div>
        );
      }
    }
  ];
  

  const rows = weatherData?.map(item => ({
    ...item,
    id: item.weatherId 
  })) || [];

  return (
    <Box m="20px">
      <Header title="Thời tiết" subtitle="Dữ liệu dự đoán thời tiết" />
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
     <Button variant="contained" color="success" onClick={handleCreateNewWeather}>
        Cập nhật mới nhất
      </Button>
      </Box>
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default WeatherTable;
