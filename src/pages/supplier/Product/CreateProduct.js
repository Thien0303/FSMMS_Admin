import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../../../redux/apiThunk/SupplierThunk/Categories";
import { createAllFruit } from "../../../redux/apiThunk/SupplierThunk/fruitThunk";
import { toast } from "react-toastify";
import CategoryForm from "./CreateCategory";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Tooltip, IconButton } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const validationSchema = yup.object({
  fruitName: yup.string().required("Tên sản phẩm là bắt buộc"),
  productDescription: yup.string().required("Mô tả sản phẩm là bắt buộc"),
  price: yup
    .number()
    .required("Giá sản phẩm là bắt buộc")
    .positive("Giá phải là số dương"),
  quantityAvailable: yup
    .number()
    .required("Số lượng có sẵn là bắt buộc")
    .positive("Số lượng phải là số dương"),
  quantityInTransit: yup.number().required('Cân nặng là bắt buộc').positive('Cân nặng phải là số dương'),
  originCity: yup.string().required("Thành phố xuất xứ là bắt buộc"),
  orderType: yup.string().required("Loại đơn hàng là bắt buộc"),
});

const ProductForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [categories, setCategories] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  const [defaultCategoryId, setDefaultCategoryId] = useState("");
  const {id} = useParams();
  useEffect(() => {
    if (categories.length > 0) {
      setDefaultCategoryId(categories[0].categoryFruitId);
    }
  }, [categories]);
  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const dispatch = useDispatch();
  const handleCategoryCreated = () => {
    dispatch(getAllCategories({ categoryName: "" }))
      .unwrap()
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error("Error fetching updated categories:", error);
      });
  };
  useEffect(() => {
    dispatch(getAllCategories({ categoryName: "" }))
      .unwrap()
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error("Error fetching discount data:", error);
      });
  }, []);
  const formik = useFormik({
    initialValues: {
      fruitName: "",
      productDescription: "",
      price: 0,
      quantityAvailable: 0,
      quantityInTransit: 0,
      originCity: "",
      orderType: "",
      categoryFruitId: defaultCategoryId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const datafruit = {
        fruitName: values.fruitName,
        productDescription: values.productDescription,
        price: values.price,
        quantityAvailable: values.quantityAvailable,
        quantityInTransit: values.quantityInTransit,
        originCity: values.originCity,
        orderType: values.orderType,
        categoryFruitId: values.categoryFruitId,
        userId: user.userId,
      };
      try {
        const response = await dispatch(createAllFruit(datafruit));
        console.log("response: ", response);

        let newProductId = null;
        if (response.payload && response.payload.fruitId) {
          newProductId = response.payload.fruitId;
        }
        if (newProductId) {
          resetForm();
          navigate(`/listFruitDetail/${newProductId}`);
        } else {
          toast.error("Không thể lấy ID của sản phẩm mới");
        }
      } catch (error) {
      }
    },
  });
  return (
    <>
      <Typography variant="h2" sx={{ mb: 4, textAlign: "center" }}>
        Tạo mới sản phẩm
      </Typography>
      <Container maxWidth="lg">
        <Grid container justifyContent="flex-end" sx={{ mb: 0 }}>
          <Button
            color="success"
            variant="contained"
            onClick={handleOpenPopup}
            style={{ width: "13.4%", height: "50%" }}
          >
            Tạo loại sản phẩm
          </Button>
        </Grid>
        <CategoryForm
          open={openPopup}
          handleClose={handleClosePopup}
          handleCategoryCreated={handleCategoryCreated}
        />
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="fruitName"
            name="fruitName"
            label="Tên sản phẩm"
            value={formik.values.fruitName}
            onChange={formik.handleChange}
            error={formik.touched.fruitName && Boolean(formik.errors.fruitName)}
            helperText={formik.touched.fruitName && formik.errors.fruitName}
            margin="normal"
          />
          <div style={{ marginTop: "5px" }}>
            <label style={{ marginBottom: "8px" }}>Mô tả sản phẩm</label>
            <ReactQuill
              style={{ height: "150px", marginBottom: "16px" }}
              theme="snow"
              value={formik.values.productDescription}
              onChange={(value) =>
                formik.setFieldValue("productDescription", value)
              }
              onBlur={() => formik.setFieldTouched("productDescription", true)}
              modules={{
                toolbar: [
                  ["bold", "italic", "underline", "strike"],
                  ["link"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["clean"],
                ],
              }}
            />
          </div>
          <TextField
            style={{marginTop: "50px"}}
            fullWidth
            id="price"
            name="price"
            label="Giá sản phẩm /kg"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            margin="normal"
            InputProps={{
              endAdornment: (
                <Tooltip title="Ví dụ: 10 là 10.000 vnđ">
                  <IconButton aria-label="tooltip">
                    <HelpOutlineIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <TextField
            fullWidth
            id="quantityAvailable"
            name="quantityAvailable"
            label="Số lượng"
            type="number"
            value={formik.values.quantityAvailable}
            onChange={formik.handleChange}
            error={
              formik.touched.quantityAvailable &&
              Boolean(formik.errors.quantityAvailable)
            }
            helperText={
              formik.touched.quantityAvailable &&
              formik.errors.quantityAvailable
            }
            margin="normal"
          />
          <TextField
            fullWidth
            id="quantityInTransit"
            name="quantityInTransit"
            label="Cân nặng ước tính cho mỗi sản phẩm"
            type="number"
            value={formik.values.quantityInTransit}
            onChange={formik.handleChange}
            error={
              formik.touched.quantityInTransit &&
              Boolean(formik.errors.quantityInTransit)
            }
            helperText={
              formik.touched.quantityInTransit &&
              formik.errors.quantityInTransit
            }
            margin="normal"
          />
          <TextField
            fullWidth
            id="originCity"
            name="originCity"
            label="Địa điểm"
            value={formik.values.originCity}
            onChange={formik.handleChange}
            error={
              formik.touched.originCity && Boolean(formik.errors.originCity)
            }
            helperText={formik.touched.originCity && formik.errors.originCity}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="categoryFruitId-label">
              Chọn loại đặt hàng
            </InputLabel>
            <Select
              fullWidth
              id="orderType"
              name="orderType"
              label="Chọn loại đặt hàng"
              value={formik.values.orderType}
              onChange={formik.handleChange}
              error={
                formik.touched.orderType && Boolean(formik.errors.orderType)
              }
              helperText={formik.touched.orderType && formik.errors.orderType}
              margin="normal"
            >
              <MenuItem value="Order">Đặt hàng</MenuItem>
              <MenuItem value="PreOrder">Đặt hàng trước</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="categoryFruitId-label">
              Chọn loại sản phẩm
            </InputLabel>
            <Select
              labelId="categoryFruitId-label"
              id="categoryFruitId"
              name="categoryFruitId"
              value={formik.values.categoryFruitId}
              onChange={formik.handleChange}
              error={
                formik.touched.categoryFruitId &&
                Boolean(formik.errors.categoryFruitId)
              }
              label="Chọn loại sản phẩm"
              style={{
                width: "100%",
                maxHeight: "150px",
                overflowY: "auto",
                height: "52px",
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "250px",
                  },
                },
              }}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.categoryFruitId}
                  value={category.categoryFruitId}
                >
                  {category.categoryFruitName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            color="success"
            variant="contained"
            fullWidth
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Tạo sản phẩm
          </Button>
        </form>
      </Container>
    </>
  );
};

export default ProductForm;
