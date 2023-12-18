import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
  createAllCropVarietyGrowthTasks,
  getAllCropVarietyStages,
} from "../../../redux/apiThunk/AdminThunk/growthThunk";
import { Link } from "react-router-dom";
const buttonLinkStyle = {
  display: "inline-block",
  padding: "10px 20px",
  textAlign: "center",
  textDecoration: "none",
  backgroundColor: "#009900",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const validationSchema = yup.object({
  taskName: yup.string().required("Tên công việc là bắt buộc"),
  description: yup.string().required("Mô tả công việc là bắt buộc"),
  startDate: yup
    .date()
    .required("Vui lòng nhập ngày bắt đầu")
    .min(new Date(), "Ngày bắt đầu không hợp lệ"),
  endDate: yup
    .date()
    .required("Vui lòng nhập ngày kết thúc")
    .min(new Date(), "Ngày kết thúc không hợp lệ"),
});
const GrowthTask = () => {
  const [cropVarietyStage, setCropVaritiesStage] = useState([]);
  const [defaultcropVarietyStageId, setDefaultcropVarietyStageId] =
    useState("");
  useEffect(() => {
    if (cropVarietyStage.length > 0) {
      setDefaultcropVarietyStageId(cropVarietyStage[0].cropVarietyStageId);
    }
  }, [cropVarietyStage]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCropVarietyStages())
      .unwrap()
      .then((data) => {
        setCropVaritiesStage(data.data);
      })
      .catch((error) => {
        console.error("Error fetching discount data:", error);
      });
  }, []);
  const formik = useFormik({
    initialValues: {
      taskName: "",
      description: "",
      startDate: "",
      endDate: "",
      cropVarietyStageId: defaultcropVarietyStageId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Values: ", values);
      const data = {
        taskName: values.taskName,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        cropVarietyStageId: values.cropVarietyStageId,
      };
      console.log("data: ", data);
      try {
        await dispatch(createAllCropVarietyGrowthTasks(data));
        resetForm();
      } catch (error) {}
    },
  });
  return (
    <>
      <Typography variant="h2" sx={{ mb: 4, textAlign: "center" }}>
        Tạo mới công việc cây trồng
      </Typography>
      <Container maxWidth="lg">
        <Grid container justifyContent="flex-end" sx={{ mb: 0 }}>
          <Link
            to="/cropVarietyStages"
            style={buttonLinkStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#0056b3";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#009900";
            }}
          >
            Tạo giai đoạn cây trồng
          </Link>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="taskName"
            name="taskName"
            label="Tên công việc"
            value={formik.values.taskName}
            onChange={formik.handleChange}
            error={formik.touched.taskName && Boolean(formik.errors.taskName)}
            helperText={formik.touched.taskName && formik.errors.taskName}
            margin="normal"
          />
          <div style={{ marginTop: "5px" }}>
            <label style={{ marginBottom: "8px" }}>Mô tả công việc</label>
            <ReactQuill
              style={{ height: "150px", marginBottom: "16px" }}
              theme="snow"
              value={formik.values.description}
              onChange={(value) => formik.setFieldValue("description", value)}
              onBlur={() => formik.setFieldTouched("description", true)}
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
          <div style={{ marginTop: "65px", display: "flex", gap: "20px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày bắt đầu công việc"
                value={formik.values.startDate}
                onChange={(date) => formik.setFieldValue("startDate", date)}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                    helperText={
                      formik.touched.startDate && formik.errors.startDate
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày kết thúc công việc"
                value={formik.values.endDate}
                onChange={(date) => formik.setFieldValue("endDate", date)}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.endDate && Boolean(formik.errors.endDate)
                    }
                    helperText={formik.touched.endDate && formik.errors.endDate}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <FormControl fullWidth margin="normal">
            <InputLabel id="cropVarietyStageId-label">
              Chọn giai đoạn cây trồng
            </InputLabel>
            <Select
              labelId="cropVarietyStageId-label"
              id="cropVarietyStageId"
              name="cropVarietyStageId"
              value={formik.values.cropVarietyStageId}
              onChange={formik.handleChange}
              error={
                formik.touched.cropVarietyStageId &&
                Boolean(formik.errors.cropVarietyStageId)
              }
              label="Chọn giai đoạn cây trồng"
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
              {cropVarietyStage.map((category) => (
                <MenuItem
                  key={category.cropVarietyStageId}
                  value={category.cropVarietyStageId}
                >
                  {category.stageName}
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
            Tạo công việc cho cây trồng
          </Button>
        </form>
      </Container>
    </>
  );
};

export default GrowthTask;
