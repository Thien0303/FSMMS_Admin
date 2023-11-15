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
      width: "90%", // Đặt chiều rộng cho TextField
      marginBottom: "10px", // Khoảng cách giữa TextField và Button
    },
    button: {
      minWidth: "10%", // Đặt chiều rộng tối thiểu cho Button
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
        // Nếu parentId không hợp lệ, coi comment hiện tại là root
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
          maxWidth: "50vw",
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
          <Typography variant="h4" gutterBottom>
            {postDataDetail?.postTitle}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Được đăng bởi {postDataDetail?.fullName} vào ngày{" "}
            {new Date(postDataDetail?.createdDate).toLocaleDateString()}
          </Typography>
          <Typography variant="h6" color="text.secondary" dangerouslySetInnerHTML={{ __html: postDataDetail?.postContent }} />
        </CardContent>
      </Card>
      {commentTree
        .filter(comment => comment.postContent === postDataDetail?.postContent)
        .map(comment => (
            <div key={comment.commentId}>
            <div style={{ display: "flex",flex: 1, flexDirection: "column", alignItems: "flex-start" }}>
            <Comment comment={comment} onDeleteComment={handleDeleteComment}/>
            <Typography
             variant="body2"
             color="primary"
             style={{
               cursor: "pointer",
               fontWeight: "bold",
               color: "steelblue",
               marginRight: "50px" /* Khoảng cách giữa nút và Comment */
              }}
             onClick={() => handleReply(comment.commentId)}
           >
           Trả Lời
           </Typography>
           </div>
            {comment.commentId === replyingCommentId && isReplying && (
              <div ref={replyInputRef}>
                <TextField
                  label="Viết trả lời..."
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={replyingCommentContent}
                  onChange={e => setReplyingCommentContent(e.target.value)}
                  margin="normal"
                />
                <Button variant="contained" size="small" color="success" onClick={handleReplySubmit}>
                  Gửi Trả Lời
                </Button>
              </div>
            )}
          </div>
        ))}
    <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "flex-start" }}>
      <TextField
        label="Viết bình luận..."
        variant="outlined"
        fullWidth
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        margin="normal"
        style={styles.commentInput} // Áp dụng CSS cho TextField
      />
      <Button
        variant="contained"
        color="success"
        onClick={handleCommentChange}
        style={styles.button} // Áp dụng CSS cho Button
      >
        Gửi Bình Luận
      </Button>
    </div>
    </>
  );
};

export default PostDetail;
