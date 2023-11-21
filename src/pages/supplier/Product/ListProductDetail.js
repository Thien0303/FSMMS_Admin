import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllFruitDetail } from "../../../redux/apiThunk/SupplierThunk/fruitThunk";
import { useParams } from "react-router-dom";
import { createAllReview, getAllReview } from "../../../redux/apiThunk/SupplierThunk/reviewThunk";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ReviewForm from "./CreateReview/ReviewForm";
const ProductDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fruitDetail = useSelector((state) => state?.fruit?.fruitDetail.data);
  const reviews = useSelector((state) => state.review.review.data);
  console.log("reviews: ", reviews);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFruitDetail({ id: id }));
    dispatch(getAllReview({ fruitId: id }));
  }, [dispatch, id]);
  if (!fruitDetail) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "76.52vh",
        }}
      >
        Sản phẩm không tồn tại
      </div>
    );
  }

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const renderStarRating = (rating) => {
    const maxRating = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

const stars = Array(maxRating)
    .fill(0)
    .map((_, index) => {
      if (index < filledStars) {
        return <StarIcon key={index} style={{ color: "#FFD700", fontSize: "1rem", verticalAlign: "middle" }} />;
      } else if (hasHalfStar && index === filledStars) {
        return <StarOutlineIcon key={index} style={{ color: "#FFD700", fontSize: "1rem", verticalAlign: "middle" }} />;
      } else {
        return <StarOutlineIcon key={index} style={{ color: "transparent", fontSize: "1rem", verticalAlign: "middle" }} />;
      }
    });

  return stars;

  };
  // const handleReviewSubmit = (reviewData) => {
  //   // Implement the logic to dispatch the review creation action
  //   // You can dispatch the action using createAllReview or any other action you have
  //   // Also, make sure to include the necessary data such as FruitId and UserId
  //   const data = {
  //     ...reviewData,
  //     fruitId: id, // Assuming id is the FruitId
  //     parentId: 0, // Default parentId
  //     userId: "user123", // Replace with the actual userId
  //   };

  //   // Dispatch the action
  //   dispatch(createAllReview({ data }));
  // };
  return (
    <Container sx={{ marginTop: "20px" }}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <img
            src={fruitDetail?.fruitImages[currentImageIndex]?.imageUrl}
            alt={fruitDetail?.fruitName}
            style={{ width: "100%", height: "auto" }}
          />
          {/* Ảnh nhỏ */}
          <Box mt={2}>
            {fruitDetail?.fruitImages.map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                alt={`Thumbnail ${index}`}
                style={{
                  width: "80px",
                  height: "auto",
                  marginRight: "8px",
                  cursor: "pointer",
                  border:
                    index === currentImageIndex ? "2px solid green" : "none",
                }}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Divider orientation="vertical" flexItem />
          <Box pl={3}>
            <Typography
              variant="h4"
              mb={2}
              style={{ fontWeight: "bold", fontSize: "30px", color: "#6cc51d" }}
            >
              {fruitDetail?.fruitName}
            </Typography>
            <Typography variant="h6" mb={1} style={{ fontWeight: "bold" }}>
              Giá: ${fruitDetail?.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" mb={2}>
              Mô tả: {fruitDetail?.fruitDescription}
            </Typography>
            <Typography variant="body2" mb={2} style={{ fontWeight: "bold" }}>
              Số lượng có sẵn: {fruitDetail?.quantityAvailable}
            </Typography>
            <Typography variant="body2" mb={2} style={{ fontWeight: "bold" }}>
              Nơi xuất xứ: {fruitDetail?.originCity}
            </Typography>
            <Typography variant="body2" mb={2} style={{ fontWeight: "bold" }}>
              Loại đặt hàng: {fruitDetail?.orderType}
            </Typography>
            <Typography variant="body2" mb={2} style={{ fontWeight: "bold" }}>
              Loại trái cây: {fruitDetail?.categoryFruitName}
            </Typography>
            <Typography variant="body2" mb={2} style={{ fontWeight: "bold" }}>
              Người sản xuất: {fruitDetail?.fullName}
            </Typography>
            <Typography variant="body2" mb={2} style={{ fontWeight: "bold" }}>
              Tên cây trồng: {fruitDetail?.plantName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={1}>
          <Divider orientation="vertical" flexItem />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h3" mb={2} style={{ fontWeight: "bold", color: "#6cc51d" }}>
            Đánh Giá
          </Typography>
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.reviewId}>
                <Typography
                  variant="body1"
                  mb={1}
                  style={{ fontWeight: "bold" }}
                >
                  {review.fullName}
                </Typography>
                <Typography
                  variant="body2"
                  mb={1}
                  style={{ display: "flex", alignItems: "center" }}
                >
                    <span style={{ marginRight: "8px" }}>Đánh giá:</span>
                 {renderStarRating(review.rating)}
                </Typography>
                <Typography variant="body2">
                  Bình luận: {review.reviewComment}
                </Typography>
                {review.reviewImageUrl && (
                  <img
                    src={review.reviewImageUrl}
                    alt={`Review ${review.reviewId}`}
                    style={{ width: "30%", height: "auto", marginTop: "8px" }}
                  />
                )}
              </div>
            ))
          ) : (
            <Typography variant="body2">Không có đánh giá nào.</Typography>
          )}
        </Grid>
        {/* <ReviewForm onSubmit={handleReviewSubmit} /> */}
      </Grid>
    </Container>
  );
};

export default ProductDetail;
