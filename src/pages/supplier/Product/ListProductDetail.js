import {
  Box,
  Container,
  Divider,
  Grid,
  Rating,
  Typography
} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllFruitDetail } from "../../../redux/apiThunk/SupplierThunk/fruitThunk";
import {
  deleteReview,
  getAllReview,
} from "../../../redux/apiThunk/SupplierThunk/reviewThunk";
const ProductDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fruitDetail = useSelector((state) => state?.fruit?.fruitDetail.data);
  const reviews = useSelector((state) => state.review.review.data);
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  const baseUrl = "https://fruitseasonms.azurewebsites.net/api/review-fruits";
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({
    ReviewComment: "",
    Rating: 0,
    FruitId: id,
    ParentId: 0,
    UserId: user?.userId,
    UploadFile: "",
  });
  useEffect(() => {
    dispatch(getAllFruitDetail({ id: id }));
    dispatch(getAllReview({ fruitId: id }));
  }, [dispatch, id, reload]);
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

  const handlePostReview = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("ReviewComment", data.ReviewComment);
    formData.append("Rating", data.Rating);
    formData.append("FruitId", data.FruitId);
    formData.append("ParentId", data.ParentId);
    formData.append("UserId", data.UserId);
    formData.append("UploadFile", data.UploadFile);
    // await dispatch(postReview({ data: formData }))
    const response = await fetch(baseUrl, {
      method: "POST",
      body: formData,
    });
    // const data = await response.json();
    if (response.ok) {
      setReload(!reload);
    } else {
      console.log("Registration failed");
    }
    setData({
      ReviewComment: "",
      Rating: 0,
      FruitId: id,
      ParentId: 0,
      UserId: user?.userId,
      UploadFile: "",
    });
  };

  const handleDeleteReview = async (e, id) => {
    e.preventDefault();
    await dispatch(deleteReview({ id: id }));
    setReload(!reload);
  };

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
        <section className="py-0">
                <div className="container px-2 px-lg-5 my-5">
                    <div className="card-body">
                        <form className="mb-4" onSubmit={(e) => handlePostReview(e)}>
                            <Rating
                                name="half-rating"
                                value={data.Rating}
                                // precision={0.5}
                                onChange={(e) => setData({ ...data, Rating: e.target.value })}
                            />
                            {/* <span>Image</span>
                            <input
                                class="form-control form-control-sm"
                                id="File"
                                type="file"
                                placeholder='File'
                                onChange={(e) => setData({ ...data, UploadFile: e.target.value })}>
                            </input> */}
                            <textarea
                                className="form-control mb-3"
                                rows="3"
                                placeholder="Bạn hãy đánh giá về sản phẩm này"
                                onChange={(e) =>
                                    setData({ ...data, ReviewComment: e.target.value })
                                }
                                required
                                value={data.ReviewComment}
                            ></textarea>
                            <button className="btn btn-success" type="submit">
                                Post
                            </button>
                        </form>
                        {reviews?.map(
                            (reviewParent) =>
                                reviewParent.parentId === 0 && (
                                    <div className="d-flex mb-4" key={reviewParent.reviewId}>
                                        <div className="flex-shrink-0">
                                            <img
                                                className="rounded-circle"
                                                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                                alt="avatar user"
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </div>
                                        <div className="ms-3">
                                            <div className="fw-bold">
                                                {reviewParent.fullName}&nbsp;
                                                <Rating
                                                    name="read-only"
                                                    value={reviewParent.rating}
                                                    readOnly
                                                    precision={0.5}
                                                />
                                            </div>
                                            {reviewParent.reviewComment}
                                            <div>
                                                <button
                                                    className="btn btn-light"
                                                    style={{ color: '#198754' }}
                                                >
                                                    reply
                                                </button>
                                                {reviewParent.fullName === user?.fullName && (
                                                    <>
                                                        <button
                                                            className="btn btn-light"
                                                            style={{ color: '#ffc107' }}
                                                        >
                                                            edit
                                                        </button>
                                                        <button
                                                            className="btn btn-light"
                                                            style={{ color: '#dc3545' }}
                                                            onClick={(e) =>
                                                                handleDeleteReview(
                                                                    e,
                                                                    reviewParent.reviewId
                                                                )
                                                            }
                                                        >
                                                            delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                            {reviews?.map(
                                                (reviewChild) =>
                                                    reviewChild.parentId ===
                                                        reviewParent.reviewId && (
                                                        <div
                                                            className="d-flex mt-4"
                                                            key={reviewChild.reviewId}
                                                        >
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    className="rounded-circle"
                                                                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                                                    alt="avatar user"
                                                                    style={{
                                                                        width: '50px',
                                                                        height: '50px',
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="ms-3">
                                                                <div className="fw-bold">
                                                                    {reviewChild.fullName}
                                                                </div>
                                                                {reviewChild.reviewComment}
                                                            </div>
                                                        </div>
                                                    )
                                            )}
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                </div>
            </section>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
