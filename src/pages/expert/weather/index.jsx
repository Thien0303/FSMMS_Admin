import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import {
  getAllWeather,
  createAllWeather,
} from "../../../redux/apiThunk/ExpertThunk/weatherThunk";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeatherPopup from "./WeatherPopup";

const WeatherTable = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather?.weather?.data);
  const [reload, setReload] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationDataLoaded, setLocationDataLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!locationDataLoaded) {
      dispatch(
        getAllWeather({ location: "", createdDate: "", userId: user.userId })
      );
      setLocationDataLoaded(true);
    }
  }, [dispatch, locationDataLoaded, reload, user]);

  const handleCreateNewWeather = async () => {
    try {
      await dispatch(createAllWeather({ userId: user?.userId }));
      setReload(!reload);
      setLocationDataLoaded(false);
      toast.success("Thời tiết đã được cập nhật thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật thời tiết!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedLocation(newValue);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedLocation(null);
    setDialogOpen(false);
  };

  const allLocations = [
    "Cà Mau",
    "Sóc Trăng",
    "Hậu Giang",
    "Cần Thơ",
    "Kiên Giang",
    "An Giang",
    "Đồng Tháp",
    "Vĩnh Long",
    "Trà Vinh",
    "Bến Tre",
    "Tiền Giang",
    "Long An",
    "Bình Dương",
    "Bình Phước",
    "Đồng Nai",
    "Tây Ninh",
    "Vũng Tàu",
    "Hồ Chí Minh",
  ];

  return (
    <Box m="20px">
      <Header title="Thời tiết" subtitle="Dữ liệu dự đoán thời tiết" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "30px",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={handleCreateNewWeather}
        >
          Cập nhật mới nhất
        </Button>
      </Box>
      <Grid container spacing={2}>
        {allLocations.map((location) => (
          <Grid key={location} item xs={12} sm={6} md={1.5}>
            <Card
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedLocation === location ? "#e0e0e0" : "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={() => {
                handleTabChange(null, location);
                setLocationDataLoaded(false);
              }}
            >
            <Box
                component={Chip}
                style={{
                  width: "70%",
                  height: "100px",
                  overflow: "hidden",
                  backgroundColor: "white",
                }}
                color="primary"
                clickable
                avatar={
                  <Avatar
                    src={
                      weatherData?.find((item) => item.location === location)
                        ?.image
                    }
                    alt={location}
                    style={{ width: 60, height: 60 }}
                  />
                }
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {location}
                </Typography>
              </CardContent>
            </Card>
            {selectedLocation === location && (
              <Dialog open={dialogOpen} onClose={handleCloseDialog} PaperProps={{
                style: {
                  maxWidth: '700px', 
                  width: '100%',
                  height: "80vh"
                },
              }}>
                <DialogTitle  variant="body" style={{ fontWeight: "bold", marginBottom: "16px", color: "#6633FF" }}>{`Thông tin thời tiết tại ${location}`}</DialogTitle>
                <DialogContent>
                  <WeatherPopup
                    location={location}
                    weatherData={weatherData}
                    onClose={handleCloseDialog}
                  />
                </DialogContent>
              </Dialog>
            )}
          </Grid>
        ))}
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default WeatherTable;
