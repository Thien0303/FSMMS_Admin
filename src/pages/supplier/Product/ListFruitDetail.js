import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  Button,
  Paper,
  TableContainer,
  Rating,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllFruitSupplierDetail } from "../../../redux/apiThunk/SupplierThunk/fruitThunk";
import { useParams } from "react-router-dom";
import { deleteReview, getAllReview } from "../../../redux/apiThunk/SupplierThunk/reviewThunk";
import FruitImage from "./CartPopup/CartFruitImage";
import DiscountPopup from "./CartPopup/CartDiscount";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}
const FruitSupplierDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fruitDetail = useSelector(
    (state) => state?.fruit?.fruitSupplierDetail.data
  );
  const reviews = useSelector((state) => state.review.review.data);
  const [reload, setReload] = useState(false);
  const [replyingCommentId, setReplyingCommentId] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const replyInputRef = useRef(null);
  const [replyData, setReplyData] = useState([]);
  const [replyingCommentContent, setReplyingCommentContent] = useState("");
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
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupDiscount, setOpenPopupDiscount] = useState(false);
  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const handleOpenDiscountPopup = () => {
    setOpenPopupDiscount(true);
  };

  const handleCloseDiscountPopup = () => {
    setOpenPopupDiscount(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFruitSupplierDetail({ id: id }));
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
    const response = await fetch(baseUrl, {
      method: "POST",
      body: formData,
    });
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
  const handleReply = (reviewId) => {
    setReplyingCommentId(reviewId);
    setIsReplying(true);
    const selectedReview = reviews.find(
      (review) => review.reviewId === reviewId
    );

    if (selectedReview) {
      const replyDataItem = {
        reviewId: reviewId,
        rating: selectedReview.rating,
        replyingCommentContent: "",
      };

      const existingIndex = replyData.findIndex(
        (item) => item.reviewId === reviewId
      );

      if (existingIndex === -1) {
        setReplyData([...replyData, replyDataItem]);
      } else {
        const updatedReplyData = [...replyData];
        updatedReplyData[existingIndex] = replyDataItem;
        setReplyData(updatedReplyData);
      }
    }
  };
  const handleReplySubmit = async (event) => {
    event.preventDefault();

    const replyInfo = replyData.find(
      (item) => item.reviewId === replyingCommentId
    );
    if (replyInfo) {
      const formData = new FormData();
      formData.append("ReviewComment", replyingCommentContent);
      formData.append("Rating", 0);
      formData.append("FruitId", id);
      formData.append("ParentId", replyingCommentId);
      formData.append("UserId", user?.userId);
      formData.append("UploadFile", data.UploadFile);

      try {
        const response = await fetch(baseUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setReload(!reload);
          setReplyingCommentId(null);
          setIsReplying(false);
          setReplyingCommentContent("");
        } else {
          console.log("Reply failed");
        }
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    }
  };
  const handleDeleteReview = async (e, id) => {
    e.preventDefault();
    await dispatch(deleteReview({ id: id }));
    setReload(!reload);
  };
  return (
    <Container sx={{ marginTop: "10px" }}>
      <Grid container justifyContent="flex-end" sx={{ mb: 3 }}>
        <Button variant="contained" onClick={handleOpenPopup} color="success">
          Tạo ảnh trái cây
        </Button>
        <Button
          variant="contained"
          onClick={handleOpenDiscountPopup}
          color="success"
          style={{
            display: fruitDetail?.orderType === "PreOrder" ? "block" : "none",
            marginLeft: "5px",
          }}
        >
          Tạo mã giảm giá
        </Button>
      </Grid>
      <Grid container spacing={6} sx={{ marginTop: "none" }}>
        <Grid item xs={12} sm={6}>
          {fruitDetail?.fruitImages && fruitDetail?.fruitImages.length > 0 ? (
            <img
              src={fruitDetail?.fruitImages[currentImageIndex]?.imageUrl}
              alt={fruitDetail?.fruitName}
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            <div
              style={{
                border: "2px solid #ccc",
                width: "90%",
                minHeight: "51vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1">Chưa có ảnh được chọn</Typography>
            </div>
          )}
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
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  color: "#6cc51d",
                }}
              >
                {fruitDetail?.fruitName}
              </Typography>
              <Typography variant="h6" style={{ fontWeight: "bold"}}>
                Mô tả:
              </Typography>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: fruitDetail?.fruitDescription,
                }}
              />
              <Box>
              <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell
                      variant="head"
                      component="th"
                      style={{ fontWeight: "bold" }}
                    >
                      Giá:
                    </TableCell>
                    <TableCell>{formatCurrency(fruitDetail?.price * 1000)} /kg</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      variant="head"
                      component="th"
                      style={{ fontWeight: "bold" }}
                    >
                      Số lượng có sẵn:
                    </TableCell>
                    <TableCell>
                      {fruitDetail?.quantityAvailable}/kg
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      variant="head"
                      component="th"
                      style={{ fontWeight: "bold" }}
                    >
                      Cân nặng ước tính:
                    </TableCell>
                    <TableCell>
                      {fruitDetail?.quantityInTransit}/kg
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      variant="head"
                      component="th"
                      style={{ fontWeight: "bold" }}
                    >
                      Nơi xuất xứ:
                    </TableCell>
                    <TableCell>{fruitDetail?.originCity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      variant="head"
                      component="th"
                      style={{ fontWeight: "bold" }}
                    >
                      Loại đặt hàng:
                    </TableCell>
                    <TableCell>{fruitDetail?.orderType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      variant="head"
                      component="th"
                      style={{ fontWeight: "bold" }}
                    >
                      Loại trái cây:
                    </TableCell>
                    <TableCell>{fruitDetail?.categoryFruitName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      variant="head"
                      component="th"
                      style={{ fontWeight: "bold" }}
                    >
                      Người bán:
                    </TableCell>
                    <TableCell>{fruitDetail?.fullName}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              </TableContainer>
              </Box>
            
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
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  placeholder="Bạn hãy đánh giá về sản phẩm này"
                  onChange={(e) =>
                    setData({ ...data, ReviewComment: e.target.value })
                  }
                  required
                  value={data.ReviewComment}
                  style={{width: "210%"}}
                ></textarea>
                <button className="btn btn-success" type="submit">
                  Đánh giá
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
                          style={{ width: "50px", height: "50px" }}
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
                            style={{ color: "#198754" }}
                            onClick={() => handleReply(reviewParent.reviewId)}
                          >
                            Trả lời
                          </button>
                          {reviewParent.reviewId === replyingCommentId &&
                            isReplying && (
                              <div ref={replyInputRef}>
                                <form
                                  className="mb-4"
                                  onSubmit={(event) => handleReplySubmit(event)}
                                  style={{ marginTop: "10px" }}
                                >
                                  <textarea
                                    className="form-control mb-3"
                                    rows="3"
                                    placeholder="Bạn hãy phản hồi đánh giá này ở đây"
                                    onChange={(e) =>
                                      setReplyingCommentContent(e.target.value)
                                    }
                                    required
                                    value={replyingCommentContent}
                                    style={{width: "200%"}}
                                  ></textarea>
                                  <button
                                    className="btn btn-success"
                                    type="submit"
                                  >
                                    Gửi câu trả lời
                                  </button>
                                </form>
                              </div>
                            )}
                          {reviewParent.fullName === user?.fullName && (
                            <>
                              <button
                                className="btn btn-light"
                                style={{ color: "#dc3545" }}
                                onClick={(e) =>
                                  handleDeleteReview(e, reviewParent.reviewId)
                                }
                              >
                                Xóa
                              </button>
                            </>
                          )}
                        </div>
                        {reviews
                          ?.filter(
                            (reviewChild) =>
                              reviewChild.parentId === reviewParent.reviewId
                          )
                          .map((reviewChild) => (
                            <div
                              className="d-flex mt-4"
                              key={reviewChild.reviewId}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div className="flex-shrink-0">
                                <img
                                  className="rounded-circle"
                                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                  alt="avatar user"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                  }}
                                />
                              </div>
                              <div className="ms-3">
                                <div className="fw-bold">
                                  {reviewChild.fullName}
                                </div>
                                {reviewChild.reviewComment}
                              </div>
                              <div
                                style={{
                                  marginLeft: "20px",
                                  marginTop: "15px",
                                }}
                              >
                                {reviewChild.fullName === user?.fullName && (
                                  <>
                                    <button
                                      className="btn btn-light"
                                      style={{ color: "#dc3545" }}
                                      onClick={(e) =>
                                        handleDeleteReview(
                                          e,
                                          reviewChild.reviewId
                                        )
                                      }
                                    >
                                      Xóa
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </section>
      </Grid>
      <FruitImage
        open={openPopup}
        handleClosePopup={handleClosePopup}
        FruitId={id}
      />
      <DiscountPopup
        open={openPopupDiscount}
        handleCloseDiscountPopup={handleCloseDiscountPopup}
        fruitId={id}
      />
    </Container>
  );
};

export default FruitSupplierDetail;
