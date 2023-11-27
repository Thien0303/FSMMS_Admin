import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { createAllFruitImage } from "../../../../redux/apiThunk/SupplierThunk/fruitThunk";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const FruitImage = ({ open, handleClosePopup, FruitId }) => {
//   const { FruitId } = useParams();
  const [imgSrc, setImgSrc] = useState([]);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("FruitId", FruitId);
    for (let i = 0; i < values.UploadFiles.length; i++) {
        formData.append("UploadFiles", values.UploadFiles[i]);
    }
    try {
      await dispatch(createAllFruitImage(formData));
      handleClosePopup();
      toast.success('Tạo ảnh trái cây thành công'); 
    } catch (error) {
      console.error("Error uploading UploadFiles:", error);
      toast.error('Tạo ảnh trái cây thất bại');
    }
  };

  const handleImageChange = (event) => {
    const files = event.currentTarget.files;
    const updatedImgSrcArray = [];
    const readNextFile = (index) => {
      if (index < files.length) {
        const reader = new FileReader();
        reader.onload = () => {
          updatedImgSrcArray.push(reader.result);
          if (updatedImgSrcArray.length === files.length) {
            setImgSrc(updatedImgSrcArray);
          } else {
            readNextFile(index + 1);
          }
        };
        reader.readAsDataURL(files[index]);
      }
    };
    readNextFile(0);
  };

  return (
    <Container sx={{ marginTop: "20px" }}>
      <Dialog open={open} onClose={handleClosePopup}>
        <DialogTitle>Thêm ảnh trái cây</DialogTitle>
        <DialogContent style={{ width: "500px" }}>
          <Formik
            initialValues={{ UploadFiles: null }}
            validationSchema={Yup.object().shape({
              UploadFiles: Yup.array().nullable(),
            })}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Field name="UploadFiles">
                  {({ field, form, meta }) => (
                    <>
                      <input
                        multiple
                        type="file"
                        name="UploadFiles"
                        id="UploadFiles"
                        onChange={(event) => {
                        form.setFieldValue(field.name, event.currentTarget.files);
                          handleImageChange(event); 
                        }}
                      />
                      {meta.touched && meta.error && (
                        <div style={{ color: "red" }}>{meta.error}</div>
                      )}
                    </>
                  )}
                </Field>
                <Grid container spacing={2}>
                  {imgSrc.map((src, index) => (
                    <Grid item xs={6} key={index} sx={{marginTop: "10px"}}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={src}
                          alt={`Image ${index}`}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <DialogActions style={{marginTop: "50px"}}>
                  <Button onClick={handleClosePopup}>Hủy</Button>
                  <Button type="submit" variant="contained" color="success">
                    Tải lên ảnh
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default FruitImage;
