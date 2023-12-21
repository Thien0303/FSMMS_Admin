import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { getAllCropVarities } from "../../../redux/apiThunk/AdminThunk/growthThunk";
import StageForm from "./Popup/StageForm";

const ListCropVarities = () => {
  const dispatch = useDispatch();
  const [openStageForm, setOpenStageForm] = useState(false);
  const [selectedCropVarietyId, setSelectedCropVarietyId] = useState(null);
  useEffect(() => {
    dispatch(getAllCropVarities());
  }, [dispatch]);

  const products = useSelector(
    (state) => state?.getGrowth?.getCropVarities?.data
  );
  const handleOpenStageForm = (cropVarietyId) => {
    setSelectedCropVarietyId(cropVarietyId);
    setOpenStageForm(true);
  };

  const handleCloseStageForm = () => {
    setOpenStageForm(false);
  };


  return (
    <Container sx={{ marginTop: "0px" }}>
    <Typography
        variant="h1"
        sx={{ mb: 7, textAlign: "center" }}
        color="green"
      >
        Loại cây trồng
      </Typography>
      <Grid container spacing={2}>
        {products?.map((product, index) => (
          <Grid item key={product.cropVarietyId} xs={12} sm={6} md={3}>
            <Paper
              elevation={3}
              style={{
                padding: 16,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {product.image && product.image.length > 0 && (
                <img
                  src={product?.image}
                  alt={product.image?.cropVarietyName}
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              )}
              <Typography
                variant="h5"
                style={{
                  marginTop: 8,
                  fontWeight: "bold",
                  color: "#009900",
                }}
              >
                {product.cropVarietyName}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "bold",
                  marginTop: "5px",
                }}
              >
                Mô tả: {product.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: 10,
                  color: "white",
                  backgroundColor: "green",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
                onClick={() => handleOpenStageForm(product.cropVarietyId)}
              >
                Xem giai đoạn của loại cây
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <StageForm
        open={openStageForm}
        handleClose={handleCloseStageForm}
        cropVarietyId={selectedCropVarietyId} // Truyền cropVarietyId
      />
    </Container>
  );
};

export default ListCropVarities;
