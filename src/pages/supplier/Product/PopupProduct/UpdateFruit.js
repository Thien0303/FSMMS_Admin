import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
const validationSchema = Yup.object().shape({
  discountName: Yup.string().required("Vui lòng nhập tên sản phẩm"),
  discountThreshold: Yup.number()
    .required("Vui lòng nhập giá")
    .positive("Giá phải là số dương"),
  discountPercentage: Yup.number()
    .required("Vui lòng nhập số lượng có sẵn")
    .positive("Số lượng phải là số dương"),
  discountExpiryDate: Yup.string().required("Vui lòng nhập địa điểm"),
});
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
