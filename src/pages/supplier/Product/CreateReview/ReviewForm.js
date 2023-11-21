// ReviewForm.js
import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Rating } from "@mui/material";
import * as Yup from "yup";
import ImageUpload from "./ImageUpload";
import RatingField from "./RatingField";
const ReviewFormSchema = Yup.object().shape({
  reviewComment: Yup.string().required("Review comment is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        reviewComment: "",
        rating: 1,
      }}
      validationSchema={ReviewFormSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      <Form>
        <Typography
          variant="h5"
          mb={2}
          style={{ fontWeight: "bold", color: "#6cc51d" }}
        >
          Đánh Giá Sản Phẩm
        </Typography>
        <Box mb={2}>
          <Field name="rating" component={RatingField} label="Rating" max={5} />
        </Box>
        <Box mb={2}>
          <Field
            name="reviewComment"
            as={TextField}
            label="Bình luận"
            multiline
            rows={4}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <Field name="image" component={ImageUpload} label="Hình Ảnh" />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Gửi Đánh Giá
        </Button>
      </Form>
    </Formik>
  );
};

export default ReviewForm;
