import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Comment = ({ comment, onDeleteComment }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Gọi hàm xóa comment và truyền commentId
    onDeleteComment(comment.commentId);
    setAnchorEl(null);
  };

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column", // Đặt flex-direction thành column để comment con nằm dưới comment cha
      alignItems: "flex-start", // Đảm bảo các phần tử con căng trái
      marginLeft: "20px", // Khoảng cách giữa comment cha và comment con
      marginTop: "10px",
      position: "relative",
    }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ flex: 1 }}>
      <strong>{comment.fullName}</strong>: {comment.commentContent}
      </div>
      {comment.children && comment.children.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          {comment.children.map((child) => (
            <Comment
              key={child.commentId}
              comment={child}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      )}
      <div
         style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ visibility: isHovered ? "visible" : "hidden" }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{ marginTop: "30px" }} // Điều chỉnh vị trí menu
        >
          <MenuItem onClick={handleDelete}>
            <DeleteIcon /> Xóa Comment
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Comment;
