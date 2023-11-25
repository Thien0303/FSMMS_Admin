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
import Popup from "./CartPopup/CartPayment";
import { toast } from "react-toastify";
const validationSchema = yup.object({
  deliveryAddress: yup.string().required("Delivery address is required"),
  phoneNumber: yup.string().required("Phone number is required"),
});

const CheckoutPage = () => {
  const currentDate = new Date().toLocaleDateString();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const cartItems = useSelector((state) => state.cart);
  const userId = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [discountData, setDiscountData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loadAgain, setLoadAgain] = useState(true);
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
        let intrasitAmout = 0;

        for (let j = 0; j < cartItems.length; j++) {
          if (user.fullName === cartItems[j].fullName) {
            const quantity = cartItems[j].quantity || 0;
            const percent = cartItems[j].percent || 0;
            const price = cartItems[j].price || 0;
            const deposit = cartItems[j].depositAmount || 0;

            total += quantity * price - (quantity * price * percent) / 100;

            if (percent > 0) {
              intrasitAmout +=
                (quantity * price - (quantity * price * percent) / 100) *
                deposit;
            }
          }
        }
        return {
          ...user,
          total: total,
          intrasitAmout: intrasitAmout,
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
                intrasitAmout: apiUser.intrasitAmout,
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
      fullName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { fullName } = values;
      const cartItemsByFarmer = cartItems.filter(
        (item) => item.fullName === fullName
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
        userId: userId.userId,
        deliveryAddress: values.deliveryAddress,
        phoneNumber: values.phoneNumber,
        orderDetails: orderDetail,
      };
      try {
        const [orderResult] = await Promise.all([
          dispatch(createAllOrder(orderData)),
        ]);

        if (orderResult?.payload) {
          const hasPreOrder = cartItemsByFarmer.some(
            (item) => item.orderType === "PreOrder"
          );
          console.log("hasPreorder: ", hasPreOrder);
          if (hasPreOrder) {
            const res = orderResult.payload;
            setImageUrl(res?.sellerImageMomoUrl);
            setOpen(true);
            toast.success("Đặt hàng thành công");
          } else {
            toast.success("Đặt hàng thành công");
          }

          dispatch(removeFromCartByFamer(fullName));
        } else {
          toast.error("Lỗi khi đặt hàng");
        }
      } catch (error) {
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
    dispatch(increaseQuantity({ fruitId }));
    setLoadAgain(true);
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
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Order Details
      </Typography>
      {cartItems?.length > 0 &&
        userData?.map((f) => (
          <Box key={f.id}>
            {cartItems.filter((check) => check.fullName === f.fullName)
              ?.length > 0 && <Typography>{f.fullName}</Typography>}
            {cartItems
              .filter((check) => check.fullName === f.fullName)
              .map((item) => {
                return (
                  <Paper
                    key={item.fruitId}
                    elevation={3}
                    style={{
                      marginBottom: "10px",
                      padding: "15px",
                      width: "100%",
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
                          Quantity: {item.quantity} x ${item.price.toFixed(2)}
                        </Typography>
                        {item?.orderType === "PreOrder" && (
                          <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            size="small"
                          >
                            <InputLabel id="demo-select-small-label">
                              Discount
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
            {cartItems.filter((check) => check.fullName === f.fullName)
              ?.length > 0 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Tổng số tiền cần trả trước: {f?.intrasitAmout || 0}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Tổng số tiền cần trả sau khi nhận hàng:{" "}
                  {f?.total ? f.total - f.intrasitAmout : 0}
                </Typography>
                <Button
                  onClick={() => {
                    formik.setValues({
                      ...formik.values,
                      fullName: f.fullName,
                    });
                    formik.handleSubmit();
                  }}
                  variant="contained"
                  color="primary"
                >
                  Đặt hàng
                </Button>
              </Box>
            )}
          </Box>
        ))}

      <hr />
      <Typography variant="subtitle1" gutterBottom>
        User Information
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Delivery Address"
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
          label="Phone Number"
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
          Order Date: {currentDate}
        </Typography>
      </form>
      <Popup open={open} onClose={() => setOpen(false)} imageUrl={imageUrl} />
    </Box>
  );
};

export default CheckoutPage;
