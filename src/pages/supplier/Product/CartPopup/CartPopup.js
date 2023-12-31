import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../../../redux/Reducers/SupplierSlice/cartSlice"; // Thay đổi đường dẫn tới slice của bạn
import { useNavigate } from "react-router-dom";
function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}
const CartPopup = ({ cartPopupOpen, setCartPopupOpen }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.fruit?.fruit.data);
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleRemove = (fruitId) => {
    dispatch(removeFromCart({ fruitId }));
  };

  const handleIncreaseQuantity = (fruitId) => {
    const fruit = cartItems.find(item => item.fruitId === fruitId);
    if (fruit && fruit.quantity < fruit.quantityAvailable) {
      dispatch(increaseQuantity({ fruitId }));
    } else {
      alert('Số lượng sản phẩm không đủ');
    } 
  };

  const handleDecreaseQuantity = (fruitId) => {
    dispatch(decreaseQuantity({ fruitId }));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <Popover
        id={Boolean(cartPopupOpen) ? "simple-popover" : undefined}
        anchorEl={cartPopupOpen}
        open={Boolean(cartPopupOpen)}
        onClose={() => setCartPopupOpen(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List
          style={{
            minWidth: "450px",
            padding: "16px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {cartItems.map((item) => (
            <div key={item.fruitId}>
              <ListItem style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <img
                    src={item.fruitImages[0]?.imageUrl}
                    alt={item.fruitImages[0]?.fruitName}
                    style={{
                      width: "50px",
                      marginRight: "10px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <ListItemText
                  primary={item.fruitName}
                  secondary={`${formatCurrency(item.price * 1000)}/kg x ${item.quantity}`}
                  style={{ flex: 1 }}
                />
                <ListItemSecondaryAction style={{ marginLeft: "auto" }}>
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
                </ListItemSecondaryAction>
              </ListItem>
              {/* <ListItem style={{ display: "flex", alignItems: "center" }}>
  
              </ListItem> */}
              <Divider />
            </div>
          ))}
          <ListItem>
            <ListItemText primary="Tổng tiền" />
            <ListItemSecondaryAction>
              <strong>{getTotalPrice()?.toFixed(3)} vnđ</strong>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                navigate("/checkout");
                setCartPopupOpen(null); // Đóng CartPopup sau khi chuyển hướng
              }}
              fullWidth
            >
              Thanh toán
            </Button>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default CartPopup;
