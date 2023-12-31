import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Blogin from "../../assets/images/Blogin.jpg"
export default function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("User name required")
        .max(30, "User is too long!"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "At least 6 characters")
        .max(20, "Password is too long, max 20 characters!"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      console.log(values);
      const dataLogin = {
        email: values?.email,
        password: values?.password,
      };
      axios
        .post(
          "https://fruitseasonms.azurewebsites.net/api/auths/login",
          dataLogin,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // Xử lý phản hồi từ API
          localStorage.setItem("user", JSON.stringify(response.data.data));
          switch(response.data.data.roleName) {
            case 'Admin':
              navigate('/dashboard')
              break;
            case 'Expert':
              navigate('/list')
              toast.success("Đăng nhập thành công")
              break;
            default:
              navigate('/listproduct')
              toast.success("Đăng nhập thành công")
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response && error.response.data && error.response.data.Message) {
            const messages = error.response.data.Message;
            if (messages.length > 0 && messages[0].DescriptionError) {
              for (let i = 0; i < messages[0].DescriptionError.length; i++) {
                toast.error(messages[0].DescriptionError[i]);
              }
            } else {
              toast.error("Email hoặc mật khẩu không hợp lệ !");
            }
          } else {
            toast.error("Email hoặc mật khẩu không hợp lệ !");
          }
          
        });
    },
  });

  const checkDisabled = (password, email) => {
    return password === "" || email === "" || loading;
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        paddingTop: "20vh",
        backgroundImage: `url(${Blogin})`,
        backgroundSize: "cover",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", p: 5 }}
      >
        <Box
          sx={{
            // m: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="green">
            Đăng nhập
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="success"
                disabled={checkDisabled(
                  formik.values.password,
                  formik.values.email
                )}
              >
                Đăng nhập
              </Button>
              <Grid>
                {/* <Grid item xs>
                  <Link to="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link to="/forgotPassword" variant="body2" style={{color: "green"}}>
                    {"Quên mật khẩu ?"}
                  </Link>
                </Grid>
             
                <Grid item>
                  <Link to="/register" variant="body2" style={{color: "green"}}>
                    {"Bạn chưa có tài khoản ?"}
                  </Link>
                </Grid>
                </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
}
