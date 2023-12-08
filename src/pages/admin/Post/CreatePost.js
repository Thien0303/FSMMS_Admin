import {
    Box,
    Button,
    Container,
    Divider,
    TextField,
    Typography,
  } from "@mui/material";
  import { ErrorMessage, Field, Form, Formik } from "formik";
  import React from "react";
  import { useNavigate } from "react-router-dom";
  import * as Yup from "yup";
  import { useDispatch } from "react-redux";
  import { createAllPost } from "../../../redux/apiThunk/ExpertThunk/postThunk";
  import ReactQuill from "react-quill";
  import "react-quill/dist/quill.snow.css";
  import { toast } from "react-toastify";
  const validationSchema = Yup.object().shape({
    postTitle: Yup.string().required("Title is required"),
    postContent: Yup.string().required("Content is required"),
    type: Yup.string().required("Type is required"),
    uploadFile: Yup.mixed().required("File is required"),
  });
  const CreatePostAdmin = () => {
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("user"));
    console.log("userId", userId);
    const dispatch = useDispatch();
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      try {
        console.log("values", values);
        const formData = new FormData();
        formData.append("PostTitle", values.postTitle);
        formData.append("PostContent", values.postContent);
        formData.append("Type", values.type);
        formData.append("UserId", userId.userId);
        formData.append("UploadFile", values.uploadFile);
        const respone = await dispatch(createAllPost({ data: formData })); // Sử dụng hàm API từ postThunk
        console.log("response", respone);
        toast.success("Post created successfully");
        resetForm();
        // navigate("/post");
      } catch (error) {
        console.error("Error creating post: ", error);
        toast.error("Error in creating post");
      } finally {
        setSubmitting(false);
      }
    };
  
    return (
      <Container fixed>
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h2" sx={{ mb: 7, textAlign: "center" }}>
            Tạo mới bài viết
          </Typography>
          <Formik
            initialValues={{
              postTitle: "",
              postContent: "",
              type: "",
              uploadFile: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting, handleChange, setFieldValue }) => (
              <Form>
                <Field name="postTitle">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Tiêu đề"
                      fullWidth
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                      sx={{ mb: 2 }}
                    />
                  )}
                </Field>
                <Field name="postContent">
                  {({ field, meta, form }) => (
                    <div
                      style={{
                        marginBottom: "16px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label style={{ marginBottom: "8px" }}>Nội dung</label>
                      <ReactQuill
                        style={{ height: "150px", marginBottom: "16px" }}
                        theme="snow"
                        value={field.value}
                        onChange={(value) => setFieldValue("postContent", value)}
                        onBlur={() => form.setFieldTouched("postContent", true)}
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
  
                <Field name="type">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Loại bài viết"
                      fullWidth
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                      sx={{ mb: 2, marginTop: "26px" }}
                    />
                  )}
                </Field>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    mt: 3,
                  }}
                >
                  <label
                    htmlFor="uploadFile"
                    style={{ fontSize: "16px", mr: 2, margin: 5 }}
                  >
                    Tải ảnh
                  </label>
                  <Field name="uploadFile">
                    {({ field, form, meta }) => (
                      <>
                        <input
                          type="file"
                          id="uploadFile"
                          onChange={(event) => {
                            setFieldValue(
                              "uploadFile",
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
                  name="uploadFile"
                  component="div"
                  sx={{ color: "red" }}
                />
                <Divider sx={{ mb: 2 }} />
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Tạo bài viết
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    );
  };
  
  export default CreatePostAdmin;
  