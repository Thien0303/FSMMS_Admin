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
  createAllCropVarietyStages,
  getAllCropVarities,
} from "../../../redux/apiThunk/AdminThunk/growthThunk";
import CropVaritiesForm from "./CropVarities";
import { useNavigate } from "react-router-dom";
const CropVarietyStages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    stageName: yup.string().required("Tên giai đoạn là bắt buộc"),
    description: yup.string().required("Mô tả giai đoạn là bắt buộc"),
    startDate: yup
      .date()
      .required("Vui lòng nhập ngày bắt đầu")
      .min(new Date(), "Ngày bắt đầu không hợp lệ"),
    endDate: yup
      .date()
      .required("Vui lòng nhập ngày kết thúc")
      .min(new Date(), "Ngày kết thúc không hợp lệ"),
  });
  const [cropVarities, setCropVarities] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [defaultCropId, setDefaultCropId] = useState("");
  useEffect(() => {
    if (cropVarities.length > 0) {
      setDefaultCropId(cropVarities[0].cropVarietyId);
    }
  }, [cropVarities]);
  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const handleCropVarities = () => {
    dispatch(getAllCropVarities())
      .unwrap()
      .then((data) => {
        setCropVarities(data.data);
      })
      .catch((error) => {
        console.error("Error fetching updated cropVarities:", error);
      });
  };
  useEffect(() => {
    dispatch(getAllCropVarities())
      .unwrap()
      .then((data) => {
        setCropVarities(data.data);
      })
      .catch((error) => {
        console.error("Error fetching cropVarities data:", error);
      });
  }, []);
  const formik = useFormik({
    initialValues: {
      cropVarietyId: defaultCropId,
      stageName: "",
      description: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("values: ", values);
      const data = {
        cropVarietyId: values.cropVarietyId,
        stageName: values.stageName,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
      };
      console.log("data: ", values.startDate);
      try {
        await dispatch(createAllCropVarietyStages(data));
        resetForm();
        navigate(`/growthTask`);
      } catch (error) {}
    },
  });

  return (
    <>
      <Typography variant="h2" sx={{ mb: 4, textAlign: "center" }}>
        Tạo giai đoạn cây trồng
      </Typography>
      <Container maxWidth="lg">
        <Grid container justifyContent="flex-end" sx={{ mb: 0 }}>
          <Button
            color="success"
            variant="contained"
            onClick={handleOpenPopup}
            style={{ width: "20%", height: "50%" }}
          >
            Tạo giống cây trồng
          </Button>
        </Grid>
        <CropVaritiesForm
          open={openPopup}
          handleClose={handleClosePopup}
          handleCropVarities={handleCropVarities}
        />
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="stageName"
            name="stageName"
            label="Tên công việc"
            value={formik.values.stageName}
            onChange={formik.handleChange}
            error={formik.touched.stageName && Boolean(formik.errors.stageName)}
            helperText={formik.touched.stageName && formik.errors.stageName}
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
            <InputLabel id="cropVarietyId-label">
              Chọn loại cây trồng
            </InputLabel>
            <Select
              labelId="cropVarietyId-label"
              id="cropVarietyId"
              name="cropVarietyId"
              value={formik.values.cropVarietyId}
              onChange={formik.handleChange}
              error={
                formik.touched.cropVarietyId &&
                Boolean(formik.errors.cropVarietyId)
              }
              label="Chọn loại cây trồng"
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
              {cropVarities.map((category) => (
                <MenuItem
                  key={category.cropVarietyId}
                  value={category.cropVarietyId}
                >
                  {category.cropVarietyName}
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
            Tạo giai đoạn cây trồng
          </Button>
        </form>
      </Container>
    </>
  );
};
export default CropVarietyStages;
