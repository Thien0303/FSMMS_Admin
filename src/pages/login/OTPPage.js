import { Box, Button, TextField, Typography } from "@mui/material";

const OTPPage = () => {
  const backgroundImage = {
    backgroundImage: `url('path_to_your_fruit_image.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý logic khi người dùng nhập mã OTP và ấn submit
  };

  return (
    <Box sx={backgroundImage}>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Nhập mã OTP
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Mã OTP"
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
          />
          <Button variant="contained" type="submit">
            Xác nhận
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default OTPPage;
