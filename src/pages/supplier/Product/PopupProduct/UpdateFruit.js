import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import ReactQuill from "react-quill";
import { Tooltip, IconButton } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const validationSchema = yup.object().shape({
  fruitName: yup.string().required("Tên sản phẩm là bắt buộc"),
  fruitDescription: yup.string().required("Mô tả sản phẩm là bắt buộc"),
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
})
const UpdateProductDialog = ({ initialValues, onSubmit }) => {
  const [editorValue, setEditorValue] = useState("");
  useEffect(() => {
    setEditorValue(initialValues.fruitDescription || ""); // Set editor value when initialValues change
  }, [initialValues.fruitDescription]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="fruitName">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Tên trái cây"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          <Field name="fruitDescription">
            {({ field, form }) => (
              <div
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ marginBottom: "8px" }}>Mô tả sản phẩm</label>
                <ReactQuill
                  theme="snow"
                  value={editorValue}
                  onChange={(value) => {
                    setEditorValue(value);
                    form.setFieldValue("fruitDescription", value);
                  }}
                  onBlur={() => form.setFieldTouched("fruitDescription", true)}
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
            )}
          </Field>

          <Field name="price">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Giá"
                type="number"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
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
            )}
          </Field>
          <Field name="quantityAvailable">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Số lượng có sẵn"
                type="number"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          <Field name="quantityInTransit">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Cân nặng ước tính cho mỗi sản phẩm"
                type="number"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          <Field name="originCity">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Địa điểm"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          <Field name="orderType">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Loại đặt hàng"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
            style={{ marginTop: "16px", alignItems: "flex-start" }}
          >
            Cập nhật sản phẩm
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProductDialog;
