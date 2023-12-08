import React, {useState } from "react";
import { TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
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
const DiscountPopup = ({ initialValues, onSubmit }) => {
  const [expiryDate, setExpiryDate] = useState(new Date());
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="discountName">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Tên mã giảm giá"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          <Field name="discountThreshold">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Số lượng mã giảm giá"
                type="number"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          <Field name="discountPercentage">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Phần trăm giảm giá"
                type="number"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          <Field name="discountExpiryDate">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Ngày hết hạn"
                type="date" 
                value={expiryDate.toISOString().split("T")[0]} 
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setExpiryDate(selectedDate);
                }}
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
            Cập nhật mã giảm giá
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DiscountPopup;
