import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik} from "formik";
import { useDispatch } from "react-redux";
import { createAllCropVarities } from "../../../redux/apiThunk/AdminThunk/growthThunk";

const CropVaritiesForm = ({ open, handleClose, handleCropVarities }) => {
    const dispatch = useDispatch();
  const validationSchema = yup.object({
    CropVarietyName: yup.string().required("Tên loại cây trồng là bắt buộc"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("values", values);
      const formData = new FormData();
      formData.append("CropVarietyName", values.CropVarietyName);
      formData.append("Description", values.Description);
      formData.append("UploadFile", values.UploadFile);
      await dispatch(createAllCropVarities({ data: formData }));
      resetForm();
      handleClose();
      handleCropVarities();
    } catch (error) {
      console.error("Error creating post: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Nhập tên loại sản phẩm</DialogTitle>
        <DialogContent style={{ width: "500px" }}>
        <Formik
          initialValues={{
            CropVarietyName: "",
            Description: "",
            UploadFile: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, handleChange, setFieldValue }) => (
            <Form>
              <Field name="CropVarietyName">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label="Tên cây trồng"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                    sx={{ mb: 2 }}
                  />
                )}
              </Field>
              <Field name="Description">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label="Mô tả (có thể để trống)"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                    sx={{ mb: 0, marginTop: "6px" }}
                  />
                )}
              </Field>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 0,
                  mt: 2,
                }}
              >
                <label
                  htmlFor="UploadFile"
                  style={{ fontSize: "16px", mr: 2, margin: 5 }}
                >
                  Upload File
                </label>
                <Field name="UploadFile">
                  {({ field, form, meta }) => (
                    <>
                      <input
                        type="file"
                        id="UploadFile"
                        onChange={(event) => {
                          setFieldValue(
                            "UploadFile",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      {meta.touched && meta.error && <div>{meta.error}</div>}
                    </>
                  )}
                </Field>
              </Box>
              <ErrorMessage
                name="UploadFile"
                component="div"
                sx={{ color: "red" }}
              />
              <Divider sx={{ mb: 3 }} />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                color="success"
              >
                Tạo loại cây trồng
              </Button>
            </Form>
          )}
        </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
    </Dialog>
  );
};
export default CropVaritiesForm;