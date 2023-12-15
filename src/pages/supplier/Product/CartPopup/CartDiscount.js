import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useDispatch } from "react-redux";
import { createAllFruitDiscount } from "../../../../redux/apiThunk/SupplierThunk/discountFruitThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const validationSchema = yup.object({
  discountName: yup.string().required("Vui lòng nhập tên mã giảm giá"),
  discountThreshold: yup
    .number()
    .required("Vui lòng nhập ngưỡng giảm giá")
    .positive("Ngưỡng giảm giá phải là số dương"),
  discountPercentage: yup
    .number()
    .required("Vui lòng nhập tỉ lệ giảm giá")
    .min(0, "Tỉ lệ giảm giá không hợp lệ")
    .max(1, "Tỉ lệ giảm giá không được lớn hơn 1"),
  discountExpiryDate: yup
    .date()
    .required("Vui lòng nhập ngày hết hạn")
    .min(new Date(), "Ngày hết hạn không hợp lệ"),
});

const DiscountPopup = ({ open, handleCloseDiscountPopup, fruitId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      discountName: "",
      discountThreshold: 0,
      discountPercentage: 0,
      discountExpiryDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const data = {
        discountName: values.discountName,
        discountThreshold: values.discountThreshold,
        discountPercentage: values.discountPercentage,
        discountExpiryDate: values.discountExpiryDate,
        fruitId: fruitId,
      };
      try {
        const response = await dispatch(createAllFruitDiscount(data));
        console.log("response: ", response);      
          resetForm();
          handleCloseDiscountPopup();
          toast.success("Tạo sản phẩm thành công");
          navigate("/listDiscountFruit")
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi tạo sản phẩm");
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleCloseDiscountPopup}>
      <DialogTitle>Tạo mã giảm giá</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="discountName"
            label="Tên mã giảm giá"
            value={formik.values.discountName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.discountName && Boolean(formik.errors.discountName)
            }
            helperText={
              formik.touched.discountName && formik.errors.discountName
            }
            fullWidth
            margin="normal"
          />
          <TextField
            name="discountThreshold"
            label="Ngưỡng giảm giá"
            type="number"
            value={formik.values.discountThreshold}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.discountThreshold &&
              Boolean(formik.errors.discountThreshold)
            }
            helperText={
              formik.touched.discountThreshold &&
              formik.errors.discountThreshold
            }
            fullWidth
            margin="normal"
          />
          <TextField
            name="discountPercentage"
            label="Số phần trăm giảm giá"
            type="number"
            value={formik.values.discountPercentage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.discountPercentage &&
              Boolean(formik.errors.discountPercentage)
            }
            helperText={
              formik.touched.discountPercentage &&
              formik.errors.discountPercentage
            }
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <Tooltip title="Ví dụ: 0.1 là 10%">
                  <IconButton aria-label="tooltip">
                    <HelpOutlineIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Ngày hết hạn"
            value={formik.values.discountExpiryDate}
            onChange={(date) =>
              formik.setFieldValue("discountExpiryDate", date)
            }
            onBlur={formik.handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="normal"
                error={
                  formik.touched.discountExpiryDate &&
                  Boolean(formik.errors.discountExpiryDate)
                }
                helperText={
                  formik.touched.discountExpiryDate &&
                  formik.errors.discountExpiryDate
                }
              />
            )}
          />
          </LocalizationProvider>
          <DialogActions>
            <Button onClick={handleCloseDiscountPopup}>Hủy</Button>
            <Button type="submit" color="success" variant="contained">
              Lưu
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountPopup;
