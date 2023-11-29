import { Box, Divider, Menu } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { getAllPostAdmin } from "../../../redux/apiThunk/AdminThunk/systemThunk";
const GetListPostAdmin = () => {
  const postData = useSelector((state) => state.getUser.getPost?.data);
  console.log("data", postData);
  const dispatch = useDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
      setIsDataLoaded(true);
      dispatch(getAllPostAdmin({ postTitle: ""}));
      setIsDataLoaded(false);
    }
  , [dispatch]);

  if (!postData || postData.length === 0) {
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
      {postData.filter((e) => e.status !== "Cancelled" ).map((post) => (
        <Card key={post.postId} sx={{ maxWidth: "50vw", m: "auto", mb: 5 }}>
          <NavLink to={`/postdetailAdmin/${post.postId}`}>
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
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Được đăng bởi {post?.fullName} vào ngày{" "}
            {new Date(post?.createdDate).toLocaleDateString()}
          </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
export default GetListPostAdmin;