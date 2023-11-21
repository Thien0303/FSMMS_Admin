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
} from "../../../redux/apiThunk/ExpertThunk/postThunk";
import { useState } from "react";
const GetListPost = () => {
  const postData = useSelector((state) => state.post.post?.data);
  console.log("data", postData);
  const dispatch = useDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): {userId: ""};
  useEffect(() => {
      setIsDataLoaded(true);
      dispatch(getAllPost({ postTitle: ""}));
      setIsDataLoaded(false);
    }
  , [dispatch]);
  
  const filteredPosts = postData?.filter((p) => p.userId !== user.userId);

  if (!filteredPosts || filteredPosts.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "76.52vh",
        }}
      >
        Chưa có nội dung bài viết
      </div>
    );
  }
  return (
    <>
      {postData?.filter((p) => p.userId !== user.userId)?.map((post) => (
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
    </>
  );
}
export default GetListPost;