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
import { getAllFruitSupplier, updateFruitAllSupplier } from "../../../redux/apiThunk/SupplierThunk/fruitThunk";
import { ToastContainer, toast } from "react-toastify";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../api/api";
import UpdateProductDialog from "./PopupProduct/UpdateFruit";
import UpdateForm from "./PopupProduct/UpdateForm";
const ListFruitSupplier = () => {
  const productsPerRow = 4;
  const productsPerPage = productsPerRow * 2;
  const [visibleProducts, setVisibleProducts] = useState(productsPerPage);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectFruitId, setSelectFruitId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
  const handleUpdateFruit = async (id) => {
    const productToUpdate = products.find(item => item.fruitId === id);
    setSelectedProduct(productToUpdate);
    setOpenModal(true);
    setAnchorEl(null);
  };
  const handleUpdateSubmit = async(values, { setSubmitting, resetForm }) =>{
    try{
    const dataFruit = {
      fruitName: values.fruitName,
      fruitDescription: values.fruitDescription,
      price: values.price,
      quantityAvailable: values.quantityAvailable,
      quantityInTransit: 0,
      originCity: values.originCity,
      orderType: values.orderType,
      status: "Active",  
    };
    await dispatch(
      updateFruitAllSupplier({ id: selectedProduct.fruitId, data: dataFruit })
    );
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
    toast.success("Update successful");
    resetForm();
    setOpenModal(false);
  } catch (error) {
    toast.error("Update failed");
  } finally {
    setSubmitting(false);
  }
  }
  const handleCloseModal = () => {
    setOpenModal(false);
  };
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
        );
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
    <Container sx={{ marginTop: "0px" }}>
      <Typography
        variant="h1"
        sx={{ mb: 7, textAlign: "center" }}
        color="green"
      >
        Sản phẩm đã tạo
      </Typography>
      <Grid container spacing={2}>
        {products?.slice(0, visibleProducts).map((product, index) => (
          <Grid item key={product.fruitId} xs={12} sm={6} md={3}>
            <Paper elevation={3} style={{ padding: 16, position: "relative" }}>
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
              <Typography
                variant="subtitle1"
                style={{ marginTop: 8, fontWeight: "bold", color: "#009900" }}
              >
                {product.fruitName}
              </Typography>
              <Typography variant="body2" style={{}}>
                Loại: {product.categoryFruitName}
              </Typography>
              <Typography variant="body2" style={{ marginTop: 2 }}>
                Đặt hàng: {product.orderType}
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "black", marginTop: 2, fontWeight: "bold" }}
              >
                Số lượng: {product.quantityAvailable} kg
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ marginTop: 5, color: "#FF0000" }}
                >
                  Giá: {product?.price?.toFixed(3)} vnđ
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
                      <MenuItem
                        onClick={() => handleUpdateFruit(product.fruitId)}
                      >
                        <EditIcon fontSize="small" sx={{ mr: 1 }} /> Cập nhật
                        sản phẩm
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleDeletePost(product.fruitId)}
                      >
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
       {selectedProduct && (
      <UpdateForm open={openModal} handleClose={handleCloseModal} initialValues={selectedProduct} onSubmit={handleUpdateSubmit}/>
      )}
    </Container>
  );
};

export default ListFruitSupplier;
