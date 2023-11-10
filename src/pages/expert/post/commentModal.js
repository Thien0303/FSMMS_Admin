import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Comment from "./Comment";

const CommentModal = ({ isOpen, onClose, comments, postId }) => {
  const filteredComments = comments.filter(comment => comment.postId === postId);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        {filteredComments.map((comment) => (
          <Comment key={comment.commentId} comment={comment} />
        ))}
        {/* Thêm giao diện để viết bình luận ở đây */}
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
