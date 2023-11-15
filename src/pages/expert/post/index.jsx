import { Box, Divider, Menu } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getAllPost,
  updateAllPost,
} from "../../../redux/apiThunk/ExpertThunk/postThunk";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import api from "../../../api/api";
import { toast } from "react-toastify";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";
import UpdatePostPopup from "./Popup/UpdatePostPopup";
export default function SinglePost() {
  const postData = useSelector((state) => state.post.post?.data);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user"));
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    if (!isDataLoaded && userId) {
      dispatch(getAllPost({ postTitle: "", userId: userId.userId }));
      setIsDataLoaded(true);
    }
  }, [dispatch, userId, isDataLoaded]);
  const handleDeletePost = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Article?"
    );
    if (confirmed) {
      try {
        await api.delete(`/api/posts/${id}`);
        const updatedList = postData.filter((post) => post.postId !== id);
        dispatch(getAllPost({ postTitle: "", userId: userId.userId }));
        toast.success("Delete successful");
      } catch (error) {
        toast.error("Delete failed!");
      }
    }
  };
  const handleUpdatePost = (id) => {
    const postToUpdate = postData.find((post) => post.postId === id);
    setSelectedPostData(postToUpdate);
    setUpdatePopupOpen(true);
    setAnchorEl(null);
  };
  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Values: ", values);
      const formData = new FormData();
      formData.append("PostTitle", values.postTitle);
      formData.append("PostContent", values.postContent);
      formData.append("Type", values.type);
      formData.append("UploadFile", values.postImage);
      await dispatch(
        updateAllPost({ id: selectedPostData.postId, data: formData })
      );
      dispatch(getAllPost({ postTitle: "", userId: userId.userId }));
      toast.success("Update successful");
      resetForm();
      setUpdatePopupOpen(false);
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };
  if (!postData || postData.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", 
        }}
      >
        Nội dung chưa được tạo.
      </div>
    );
  }
  const handleMenuClick = (event, postId) => {
    setSelectedPostId(postId);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSelectedPostId(null);
    setAnchorEl(null);
  };
  return (
    <>
      {postData.map((post) => (
        <Card key={post.postId} sx={{ maxWidth: "50vw", m: "auto", mb: 5 }}>
          <NavLink to={`/postdetail/${post.postId}`}>
            <CardMedia
              component="img"
              height={100}
              image={post.postImage}
              alt="alt name"
              sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </NavLink>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h2">{post.postTitle}</Typography>
              <span style={{ cursor: "pointer" }}>
                <MoreVertIcon
                  color="action"
                  onClick={(event) => handleMenuClick(event, post.postId)}
                />
                {selectedPostId === post.postId && (
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleUpdatePost(post.postId)}>
                      <EditIcon fontSize="small" sx={{ mr: 1 }} /> Update
                    </MenuItem>
                    <MenuItem onClick={() => handleDeletePost(post.postId)}>
                      <DeleteForeverOutlinedIcon
                        fontSize="small"
                        color="error"
                      />{" "}
                      Delete
                    </MenuItem>
                  </Menu>
                )}
              </span>
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography
              variant="h6"
              color="text.secondary"
              dangerouslySetInnerHTML={{ __html: post.postContent }}
            />
          </CardContent>
        </Card>
      ))}
      {selectedPostData && (
        <UpdatePostPopup
          open={updatePopupOpen}
          handleClose={() => setUpdatePopupOpen(false)}
          initialValues={selectedPostData}
          onSubmit={handleUpdateSubmit}
        />
      )}
    </>
  );
}
