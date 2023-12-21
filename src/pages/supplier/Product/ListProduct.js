import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllFruit } from "../../../redux/apiThunk/SupplierThunk/fruitThunk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../../redux/Reducers/SupplierSlice/cartSlice";
import { getAllDiscountFruit } from "../../../redux/apiThunk/SupplierThunk/discountFruitThunk";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import IconButton from "@mui/material/IconButton";
function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}
const ListProduct = () => {
  const productsPerRow = 4;
  const productsPerPage = productsPerRow * 2;
  const [visibleProducts, setVisibleProducts] = useState(productsPerPage);
  const [discountData, setDiscountData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();
  const handleShowMore = () => {
    setVisibleProducts(visibleProducts + productsPerPage);
  };
  const handleShowLess = () => {
    setVisibleProducts(productsPerPage);
  };
  useEffect(() => {
    dispatch(
      getAllFruit({ fruitName: "", minPrice: "", maxPrice: "", newestDate: "" })
    );
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllDiscountFruit({ discountName: "", discountExpiryDate: "" }))
      .unwrap()
      .then((data) => {
        setDiscountData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching discount data:", error);
      });
  }, [dispatch]);
  const products = useSelector((state) => state.fruit?.fruit.data);
  const handleAddToCart = (product) => {
    const findDis = discountData?.reduce((prev, curr, index) => {
      if (
        product?.fruitId === curr?.fruitId &&
        curr?.discountPercentage > (prev?.discountPercentage || 0) &&
        (curr?.discountThreshold || 0) > 0
      ) {
        return curr;
      }
      return prev;
    }, {});

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        percent: findDis.discountPercentage * 100,
        depositAmount: findDis.depositAmount,
        fruitDiscountId: findDis?.fruitDiscountId,
      })
    );
    toast.success("Đã thêm vào vỏ hàng!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleSortByPrice = () => {
    const sorted = [...products];

    if (sortOrder === "asc") {
      sorted.sort((a, b) => a.price - b.price);
      setSortOrder("desc");
    } else {
      sorted.sort((a, b) => b.price - a.price);
      setSortOrder("asc");
    }

    setSortedProducts(sorted);
  };
  const handleSearch = () => {
    if (searchText.trim() === "") {
      setSearchResults([]);
    } else {
      const results = products.filter((product) =>
        product.fruitName.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(results);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const resetSearch = () => {
    setSearchText("");
    setSearchResults([]);
  };
  const isSearching = searchText.trim() !== "";
  const hasSearchResults = searchResults.length > 0;

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
  return (
    <Container sx={{ marginTop: "0px" }}>
      <Typography
        variant="h1"
        sx={{ mb: 7, textAlign: "center" }}
        color="green"
      >
        Trái cây của nông dân
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {!isSearching && (
            <IconButton
              onClick={handleSortByPrice}
              style={{
                backgroundColor: "green",
                marginBottom: "15px",
              }}
              aria-label="sort-by-price"
            >
              <FilterAltOutlinedIcon style={{ color: "white" }} />
            </IconButton>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tìm kiếm theo tên sản phẩm"
              style={{
                padding: "8px 30px 8px 8px", // Khoảng padding để biểu tượng không bị chồng lên văn bản
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginRight: "10px",
              }}
            />
            <SearchOutlinedIcon
              onClick={handleSearch} // Sự kiện khi icon được nhấn
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer", // Biến con trỏ thành dấu tay khi di chuột qua icon
                color: "#777", // Tuỳ chỉnh màu sắc của biểu tượng tìm kiếm
              }}
            />
          </div>
          {hasSearchResults && (
            <Button
              variant="contained"
              color="success"
              onClick={resetSearch}
              style={{ marginLeft: "10px" }}
            >
              Quay lại
            </Button>
          )}
        </div>
      </div>
      <Grid container spacing={2}>
        {searchResults.length > 0
          ? searchResults.map((product, index) => (
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
                  <NavLink to={`/fruitDetail/${product.fruitId}`}>
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
                    style={{
                      marginTop: 8,
                      fontWeight: "bold",
                      color: "#009900",
                    }}
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
                    style={{
                      color: "black",
                      marginTop: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Số lượng: {product.quantityAvailable} kg
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ marginTop: 5, color: "#FF0000" }}
                  >
                    Giá: {formatCurrency(product?.price * 1000)} /kg
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    style={{
                      marginTop: 5,
                      color: "white",
                      backgroundColor: "green",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                    }}
                  >
                    Thêm vào vỏ hàng
                  </Button>
                  <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </Paper>
              </Grid>
            ))
          : (sortedProducts.length > 0 ? sortedProducts : products)
              .slice(0, visibleProducts)
              .map((product, index) => (
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
                    <NavLink to={`/fruitDetail/${product.fruitId}`}>
                      {product.fruitImages &&
                        product.fruitImages.length > 0 && (
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
                      style={{
                        marginTop: 8,
                        fontWeight: "bold",
                        color: "#009900",
                      }}
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
                      style={{
                        color: "black",
                        marginTop: 2,
                        fontWeight: "bold",
                      }}
                    >
                      Số lượng: {product.quantityAvailable} kg
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ marginTop: 5, color: "#FF0000" }}
                    >
                      Giá: {formatCurrency(product?.price * 1000)} /kg
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(product)}
                      style={{
                        marginTop: 5,
                        color: "white",
                        backgroundColor: "green",
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                      }}
                    >
                      Thêm vào vỏ hàng
                    </Button>
                    <ToastContainer
                      position="top-center"
                      autoClose={1000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
                  </Paper>
                </Grid>
              ))}
      </Grid>
      {!isSearching && visibleProducts < products?.length ? (
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
            </React.Fragment>
          )}
        </Box>
      ) : null}
    </Container>
  );
};

export default ListProduct;
