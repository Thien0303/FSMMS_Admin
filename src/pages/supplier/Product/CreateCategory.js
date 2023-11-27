import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createAllCategory } from "../../../redux/apiThunk/SupplierThunk/Categories";
import { toast } from "react-toastify";

const CategoryForm = ({ open, handleClose, handleCategoryCreated }) => {
    const dispatch = useDispatch();
  const validationSchema = yup.object({
    categoryFruitName: yup.string().required("Tên loại sản phẩm là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      categoryFruitName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const data = {
        categoryFruitName: values.categoryFruitName,
      }
      dispatch(createAllCategory(data));
      toast.success("Tạo loại sản phẩm thành công")
      resetForm();
      handleClose();
      handleCategoryCreated(); 
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Nhập tên loại sản phẩm</DialogTitle>
        <DialogContent style={{ width: "500px" }}>
          <TextField
            fullWidth
            id="categoryFruitName"
            name="categoryFruitName"
            label="Tên loại sản phẩm"
            value={formik.values.categoryFruitName}
            onChange={formik.handleChange}
            error={
              formik.touched.categoryFruitName &&
              Boolean(formik.errors.categoryFruitName)
            }
            helperText={
              formik.touched.categoryFruitName &&
              formik.errors.categoryFruitName
            }
            style={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button color="success" variant="contained" type="submit">
            Lưu
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default CategoryForm;