import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Menu,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllFruitSupplier } from "../../../redux/apiThunk/SupplierThunk/fruitThunk";
import { ToastContainer, toast } from "react-toastify";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../api/api";
const ListFruitSupplier = () => {
  const productsPerRow = 4;
  const productsPerPage = productsPerRow * 2;
  const [visibleProducts, setVisibleProducts] = useState(productsPerPage);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectFruitId, setSelectFruitId] = useState();
  const dispatch = useDispatch();
  const handleShowMore = () => {
    setVisibleProducts(visibleProducts + productsPerPage);
  };
  const handleShowLess = () => {
    setVisibleProducts(productsPerPage);
  };
  const userId = JSON.parse(localStorage.getItem("user"));
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    if (!isDataLoaded && userId) {
      dispatch(
        getAllFruitSupplier({
          fruitName: "",
          minPrice: "",
          maxPrice: "",
          newestDate: "",
          createdDate: "",
          userId: userId.userId,
        })
      );
      setIsDataLoaded(true);
    }
  }, [dispatch, userId, isDataLoaded]);
  const products = useSelector((state) => state.fruit?.fruitSupplier.data);
  if (!products || products.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "76.52vh",
        }}
      >
        Sản phẩm chưa được tạo
      </div>
    );
  }
  const handleDeletePost = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Fruit?"
    );
    if (confirmed) {
      try {
        await api.delete(`api/fruits/supplier/${id}`);
        dispatch(
          getAllFruitSupplier({
            fruitName: "",
            minPrice: "",
            maxPrice: "",
            newestDate: "",
            createdDate: "",
            userId: userId.userId,
          })
        )  
        toast.success("Delete successful");
      } catch (error) {
        toast.error("Delete failed!");
      }
    }
  };
  const handleMenuClick = (event, fruitId) => {
    setSelectFruitId(fruitId);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSelectFruitId(null);
    setAnchorEl(null);
  };
  return (
    <Container sx={{ marginTop: "20px" }}>
      <Grid container spacing={2}>
        {products?.slice(0, visibleProducts).map((product, index) => (
          <Grid item key={product.fruitId} xs={12} sm={6} md={3}>
            <Paper
                elevation={3}
                style={{ padding: 16, position: "relative" }}
              >
                <Chip
                  label="Mới"
                  color="secondary"
                  style={{ position: "absolute", top: 8, left: 8 }}
                />
             <NavLink
              to={`/listFruitDetail/${product.fruitId}`}
              style={{ textDecoration: "none" }}
            >
              
                {product.fruitImages && product.fruitImages.length > 0 && (
                  <img
                    src={product.fruitImages[0]?.imageUrl}
                    alt={product.fruitImages[0]?.fruitName}
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                )}
                 </NavLink>
                <Typography variant="subtitle1" style={{ marginTop: 8 }}>
                  {product.fruitName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Loại: {product.categoryFruitName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Số lượng: {product.quantityAvailable}
                </Typography>
                <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
                <Typography variant="h6" style={{ marginTop: 8 }}>
                  ${product.price?.toFixed(2)}
                </Typography>
                <span style={{ cursor: "pointer" }}>
                <MoreVertIcon
                  color="action"
                  onClick={(event) => handleMenuClick(event, product.fruitId)}
                />
                {selectFruitId === product.fruitId && (
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {/* <MenuItem onClick={() => handleUpdatePost(product.fruitId)}>
                      <EditIcon fontSize="small" sx={{ mr: 1 }} /> Update
                    </MenuItem> */}
                    <MenuItem onClick={() => handleDeletePost(product.fruitId)}>
                      <DeleteForeverOutlinedIcon
                        fontSize="small"
                        color="error"
                      />{" "}
                      Xóa sản phẩm
                    </MenuItem>
                  </Menu>
                )}
              </span>
              </Box>
              </Paper>
          </Grid>
        ))}
      </Grid>
      {visibleProducts < products?.length ? (
        <Box textAlign="center" marginTop={2}>
          {visibleProducts <= productsPerPage ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowMore}
              style={{
                color: "green",
                borderColor: "green",
                backgroundColor: "white",
              }}
            >
              Show More
            </Button>
          ) : (
            <React.Fragment>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShowLess}
                style={{
                  marginRight: 8,
                  color: "green",
                  borderColor: "green",
                  backgroundColor: "white",
                }}
              >
                Show Less
              </Button>
              {visibleProducts < products.length && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShowMore}
                  style={{
                    color: "green",
                    borderColor: "green",
                    backgroundColor: "white",
                  }}
                >
                  Show More
                </Button>
              )}
            </React.Fragment>
          )}
        </Box>
      ) : null}
    </Container>
  );
};

export default ListFruitSupplier;
