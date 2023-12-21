import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostDetail } from "../../../redux/apiThunk/ExpertThunk/postThunk";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import {
  getAllComment,
  createAllComment,
  removeAllComment
} from "../../../redux/apiThunk/ExpertThunk/commentThunk";
const styles = {
    commentInput: {
      width: "75%", // Đặt chiều rộng cho TextField
      marginBottom: "10px", // Khoảng cách giữa TextField và Button
    },
    button: {
      minWidth: "10%", // Đặt chiều rộng tối thiểu cho Button
      height: "40px",    
    },
  };
  function createCommentTree(comments) {
    const commentMap = {};
    const commentTree = [];
  
    comments.forEach(comment => {
      commentMap[comment.commentId] = { ...comment, children: [] };
    });
  
    comments.forEach(comment => {
      const { parentId } = comment;
      if (parentId in commentMap) {
        commentMap[parentId].children.push(commentMap[comment.commentId]);
      } else {
        commentTree.push(commentMap[comment.commentId]);
      }
    });
  
    return commentTree;
  }
  

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const postDataDetail = useSelector(state => state.post.postDetail.data);
  const commentData = useSelector(state => state.comment.comment?.data);
  const user = JSON.parse(localStorage.getItem("user"));
  const [commentTree, setCommentTree] = useState([]);
  const [reload, setReload] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [replyingCommentContent, setReplyingCommentContent] = useState("");
  const [data, setData] = useState({
    commentContent: "",
    postId: id,
    parentId: 0,
    userId: user.userId
  });
  const [replyingCommentId, setReplyingCommentId] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const replyInputRef = useRef(null);
  useEffect(() => {
    dispatch(getAllPostDetail({ id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllComment());
  }, [dispatch, reload]);

  useEffect(() => {
    if (commentData && commentData.length > 0) {
      const tree = createCommentTree(commentData);
      setCommentTree(tree);
    }
  }, [commentData]);
  useEffect(() => {
    const handleOutsideClick = event => {
      if (replyInputRef.current && !replyInputRef.current.contains(event.target)) {
        setIsReplying(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleCommentChange = async () => {
    if (!newComment) {
        alert("Vui lòng nhập nội dung bình luận.");
        return;
      }
    const updatedData = { ...data, commentContent: newComment };
    await setData(updatedData);
    handleCommentSubmit(updatedData);
  };

  const handleReply = commentId => {
    setReplyingCommentId(commentId);
    setIsReplying(true); // Hiển thị ô phản hồi khi nhấp vào "Trả Lời"
  };

  const handleCommentSubmit = async updatedData => {
    await dispatch(createAllComment({ data: updatedData }));
    setReload(!reload);
    setData({
      commentContent: "",
      postId: id,
      parentId: 0,
      userId: user.userId
    });
    setNewComment("");
    setIsReplying(false); // Tắt ô phản hồi sau khi post phản hồi
  };

  const handleReplySubmit = async () => {
    if (!replyingCommentContent) {
        alert("Vui lòng nhập nội dung trả lời.");
        return;
      }
    const replyData = {
      commentContent: replyingCommentContent,
      postId: id,
      parentId: replyingCommentId,
      userId: user.userId
    };
    await dispatch(createAllComment({ data: replyData }));
    setReload(!reload);
    setReplyingCommentContent("");
    setReplyingCommentId(null);
    setIsReplying(false); // Tắt ô phản hồi sau khi post phản hồi
  };
  const removeCommentFromTree = (tree, commentId) => {
    return tree.filter(comment => {
      if (comment.commentId === commentId) {
        return false;
      }
      comment.children = removeCommentFromTree(comment.children || [], commentId);
      return true;
    });
  };
  const handleDeleteComment = async (commentId) => {
    try {
      // Gọi API để xóa comment
      await dispatch(removeAllComment({ id: commentId }));
      // Cập nhật lại commentTree sau khi xóa
      setCommentTree((prevTree) => removeCommentFromTree(prevTree, commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: "60vw",
          m: "auto",
          mb: 5
        }}
      >
        <CardMedia
          component="img"
          height={500}
          image={postDataDetail?.postImage}
          alt={postDataDetail?.postTitle}
        />
        <CardContent>
          <Typography variant="h2" gutterBottom color={"#FF3300"}>
            {postDataDetail?.postTitle}
          </Typography>
          <Typography variant="h5" color="black" sx={{fontWeight: "bold"}} gutterBottom>
            Được đăng bởi {postDataDetail?.fullName} vào ngày{" "}
            {new Date(postDataDetail?.createdDate).toLocaleDateString()}
          </Typography>
          <Typography variant="h5" color="black" dangerouslySetInnerHTML={{ __html: postDataDetail?.postContent }} />
        </CardContent>
      </Card>
      <Typography variant="h3" style={{marginLeft: "155px", fontWeight: "bold"}}>Nội dung bình luận</Typography>
      <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center"}}>
      <TextField
        label="Viết bình luận..."
        variant="outlined"
        fullWidth
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        margin="normal"
        style={styles.commentInput} 
      />
      </div>
      <div style={{display: "block", marginLeft: "155px", marginBottom: "30px"}}>
      <Button
        variant="contained"
        color="success"
        onClick={handleCommentChange}
        style={styles.button}
      >
        Gửi Bình Luận
      </Button>
      </div>
      {commentTree
        .filter(comment => comment.postContent === postDataDetail?.postContent)
        .map(comment => (
            <div key={comment.commentId}>
            <div style={{ display: "flex",flex: 1, flexDirection: "column", alignItems: "flex-start", marginLeft: "150px" }}>
            <Comment comment={comment} onDeleteComment={handleDeleteComment}/>
            <Button
             variant="contained"
             color="success"
             style={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "black",
              left: "0",
              top: "0",
              marginBottom: "20px"
              }}
             onClick={() => handleReply(comment.commentId)}
           >
           Trả Lời
           </Button>
           </div>
            {comment.commentId === replyingCommentId && isReplying && (
              <div ref={replyInputRef}>
              <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center"}}>
              <TextField
                label="Viết trả lời..."
                variant="outlined"
                fullWidth
                size="small"
                value={replyingCommentContent}
                onChange={e => setReplyingCommentContent(e.target.value)}
                margin="normal"
                style={styles.commentInput}
              />
              </div>
            <div style={{display: "block", marginLeft: "150px", marginBottom: "30px"}}>
              <Button variant="contained" size="small" color="success" onClick={handleReplySubmit}>
                Gửi Trả Lời
              </Button>
             </div>
           </div> 
            )}
          </div>
        ))}
    </>
  );
};

export default PostDetail;
