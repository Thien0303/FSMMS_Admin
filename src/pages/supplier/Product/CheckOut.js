import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiscountFruit } from "../../../redux/apiThunk/SupplierThunk/discountFruitThunk";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectPercent,
  removeFromCartByFamer,
} from "../../../redux/Reducers/SupplierSlice/cartSlice";
import {
  createAllOrder,
  getAllFarmer,
} from "../../../redux/apiThunk/SupplierThunk/orderThunk";
import { toast } from "react-toastify";
const validationSchema = yup.object({
  deliveryAddress: yup.string().required("Delivery address is required"),
  phoneNumber: yup.string().matches(/^0/, "Số điện thoại phải bắt đầu bằng '0'").min(10, "Số điện thoại ít nhất là 10 số").max(11, "Số điện thoại nhiều nhất là 11 số").required("Bắt buộc nhập số điện thoại"),
});
function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}
const CheckoutPage = () => {
  const currentDate = new Date().toLocaleDateString();
  const cartItems = useSelector((state) => state.cart);
  console.log("cart: ", cartItems);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [discountData, setDiscountData] = useState([]);
  console.log("discount: ", discountData);
  const [userData, setUserData] = useState([]);
  console.log("user: ", userData);
  const [loadAgain, setLoadAgain] = useState(true);
  console.log("abc: ", cartItems);
  useEffect(() => {
    dispatch(getAllDiscountFruit({ discountName: "", discountExpiryDate: "" }))
      .unwrap()
      .then((data) => {
        setDiscountData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching discount data:", error);
      });
  }, []);
  useEffect(() => {
    if (loadAgain) {
      const updatedUserData = userData.map((user) => {
        let total = 0;

        for (let j = 0; j < cartItems.length; j++) {
          if (user.userId === cartItems[j].userId) {
            const quantity = cartItems[j].quantity || 0;
            const percent = cartItems[j].percent || 0;
            const price = cartItems[j].price || 0;
            total += quantity * price - (quantity * price * percent) / 100;

          }
        }
        return {
          ...user,
          total: total,
        };
      });
      setUserData(updatedUserData);
      setLoadAgain(false);
    }
  }, [loadAgain, userData, cartItems]);

  useEffect(() => {
    dispatch(getAllFarmer({ fullName: "", roleName: "Farmer" }))
      .unwrap()
      .then((data) => {
        if (data.data.length > 0) {
          const updatedUserData = data.data.map((apiUser) => {
            const existingUser = userData.find(
              (user) => user.userId === apiUser.userId
            );

            if (existingUser) {
              return {
                ...existingUser,
                total: apiUser.total,
              };
            } else {
              return apiUser;
            }
          });

          setUserData(updatedUserData);
          setLoadAgain(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching discount data:", error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      deliveryAddress: "",
      phoneNumber: "",
      userId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { userId } = values;
      const cartItemsByFarmer = cartItems.filter(
        (item) => item.userId === userId
      );
      const orderDetail = [];
      for (const item of cartItemsByFarmer) {
        var orderDetailData = {
          fruitId: item.fruitId,
          quantity: item.quantity,
        };

        if (item.orderType === "PreOrder") {
          const discountInfo = discountData.find(
            (discount) => discount.fruitName === item.fruitName
          );

          if (discountInfo) {
            orderDetailData.fruitDiscountId = discountInfo.fruitDiscountId;
          }
        }
        orderDetail.push(orderDetailData);
      }
      const orderData = {
        userId: user.userId,
        deliveryAddress: values.deliveryAddress,
        phoneNumber: values.phoneNumber,
        orderDetails: orderDetail,
      };
      try {
          dispatch(createAllOrder(orderData));
          dispatch(removeFromCartByFamer(userId));      
      } catch (error) {
        console.log(error?.respone?.data)
        toast.error("Lỗi khi đặt hàng");
      }

      resetForm();
    },
  });
  const handleRemove = (fruitId) => {
    dispatch(removeFromCart({ fruitId }));
    setLoadAgain(true);
  };

  const handleIncreaseQuantity = (fruitId) => {
    const fruit = cartItems.find(item => item.fruitId === fruitId);
    if (fruit && fruit.quantity < fruit.quantityAvailable) {
      dispatch(increaseQuantity({ fruitId }));
      setLoadAgain(true);
    } else {
      alert('Số lượng sản phẩm không đủ');
    }
  };
  

  const handleDecreaseQuantity = (fruitId) => {
    dispatch(decreaseQuantity({ fruitId }));
    setLoadAgain(true);
  };
  const handleSelectDiscount = (fruitId, id) => {
    const discountItem = discountData?.find(
      (item) => item?.fruitDiscountId === id
    );
    dispatch(
      selectPercent({
        fruitId,
        percent: discountItem?.discountPercentage * 100 || 0,
        depositAmount: discountItem.depositAmount,
        fruitDiscountId: discountItem?.fruitDiscountId,
      })
    );
    setLoadAgain(true);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      minHeight="76.8vh"
      padding="20px"
      boxSizing="border-box"
    >
      <Typography variant="h2" sx={{fontWeight: "bold", color: "green"}} gutterBottom>
        Đơn hàng
      </Typography>
      <Typography variant="h5" mb={2} gutterBottom>
        Đơn hàng chi tiết
      </Typography>
      {cartItems?.length > 0 &&
        userData?.map((f) => (
          <Box key={f.id}>
            {cartItems.filter((check) => check.userId === f.userId)
              ?.length > 0 && <Typography sx={{fontSize: "15px", fontWeight: "bold"}} mb={1}>{f.fullName}</Typography>}
            {cartItems
              .filter((check) => check.userId === f.userId)
              .map((item) => {
                return (
                  <Paper
                    key={item.fruitId}
                    elevation={3}
                    style={{
                      marginBottom: "10px",
                      padding: "15px",
                      width: "120%",
                      maxWidth: "900px",
                    }}
                  >
                    <Box key={item.fruitId} display="flex" alignItems="center">
                      <img
                        src={item.fruitImages[0]?.imageUrl}
                        alt={item.fruitImages[0]?.fruitName}
                        style={{
                          width: "50px",
                          marginRight: "10px",
                          objectFit: "cover",
                        }}
                      />
                      <Box flexGrow={1}>
                        <Typography variant="subtitle1">
                          {item.fruitName}
                        </Typography>
                        <Typography>
                          Số lượng: {item?.quantity} x {formatCurrency(item?.price * 1000)}/kg
                        </Typography>
                        {item?.orderType === "PreOrder" && (
                          <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            size="small"
                          >
                            <InputLabel id="demo-select-small-label">
                              Mã giảm giá
                            </InputLabel>
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              label="Discount"
                              value={item?.fruitDiscountId}
                              onChange={(value) => {
                                handleSelectDiscount(
                                  item?.fruitId,
                                  value?.target?.value
                                );
                                console.log("Handle: ", value);
                                return value;
                              }}
                            >
                              {discountData?.map((ite) => {
                                if (
                                  item?.fruitId === ite?.fruitId &&
                                  ite?.discountThreshold > 0
                                ) {
                                  return (
                                    <MenuItem value={ite?.fruitDiscountId}>{`${
                                      ite?.discountName
                                    }: (${
                                      ite?.discountPercentage * 100
                                    } %)`}</MenuItem>
                                  );
                                }
                                return null;
                              })}
                            </Select>
                          </FormControl>
                        )}
                      </Box>
                      <Box display="flex" alignItems="center">
                        <IconButton
                          onClick={() => handleDecreaseQuantity(item.fruitId)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          onClick={() => handleIncreaseQuantity(item.fruitId)}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton onClick={() => handleRemove(item.fruitId)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            {cartItems.filter((check) => check.userId === f.userId)
              ?.length > 0 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Tổng số tiền cần trả sau khi nhận hàng:{" "}
                  {f?.total *1000} vnđ
                </Typography>
                <Button
                  onClick={() => {
                    formik.setValues({
                      ...formik.values,
                      userId: f.userId,
                    });
                    formik.handleSubmit();
                  }}
                  variant="contained"
                  color="success"
                >
                  Đặt hàng
                </Button>
              </Box>
            )}
          </Box>
        ))}

      <hr />
      <Typography variant="subtitle1" gutterBottom>
        Thông tin cá nhân
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Địa chỉ nhận hàng"
          variant="outlined"
          name="deliveryAdress"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("deliveryAddress")}
          error={
            formik.touched.deliveryAddress &&
            Boolean(formik.errors.deliveryAddress)
          }
          helperText={
            formik.touched.deliveryAddress && formik.errors.deliveryAddress
          }
          sx={{ width: "200%" }}
        />

        <TextField
          label="Số điện thoại"
          variant="outlined"
          fullWidth
          name="phoneNumber"
          margin="normal"
          {...formik.getFieldProps("phoneNumber")}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          sx={{ width: "200%" }}
        />

        <Typography variant="subtitle1" gutterBottom>
          Ngày đặt hàng: {currentDate}
        </Typography>
      </form>
    </Box>
  );
};

export default CheckoutPage;
