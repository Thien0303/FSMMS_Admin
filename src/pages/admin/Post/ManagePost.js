import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";
import { getAllPost } from "../../../redux/apiThunk/ExpertThunk/postThunk";
import { getAllPostAdmin, updateAllPost } from "../../../redux/apiThunk/AdminThunk/systemThunk";
import { NavLink } from "react-router-dom";
const UpdatePost = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.getUser.getPost?.data);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
    setIsMenuOpen(true);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const handleUpdateOrder = (action) => {
    if (selectedOrderId && (action === "Accepted" || action === "Rejected")) {
      dispatch(updateAllPost({ id: selectedOrderId, action: action }))
        .then(() => {
          dispatch(getAllPostAdmin({ postTitle: ""}));
          handleMenuClose();
          toast.success("Cập nhật trạng thái đơn hàng thành công");
        })
        .catch((error) => {
          console.error("Update failed:", error);
          toast.error("Cập nhật trạng thái đơn hàng thất bại");
        });
    }
  };
  useEffect(() => {
      setIsDataLoaded(true);
      dispatch(getAllPostAdmin({ postTitle: ""}));
      setIsDataLoaded(false);
    }
  , [dispatch]);
  const getStatusText = (status) => {
    switch (status) {
      case "Accepted":
        return "Đồng ý";
     case "Pending":
        return "Đang chờ xử lý";
      case "Cancelled":
        return "Từ chối";
        case "Rejected":
          return "Từ chối";
      default:
        return status;
    }
  };
  const columns = [
    { field: "postTitle", headerName: "Tên bài viết", flex: 1 },
    {
      field: `fullName`,
      headerName: "Tên người đăng bài",
      flex: 1,
    },
    {
      field: `type`,
      headerName: "Thể loại bài viết",
      flex: 1,
    },
    {
      field: "createdDate",
      headerName: "Ngày đăng bài",
      flex: 1,
      valueGetter: (params) => {
        const createdDate = new Date(params.row.createdDate);
        return createdDate.toLocaleDateString("en-US");
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      valueGetter: (params) => getStatusText(params.row.status),
    },
    {
      field: 'view',
      headerName: 'Xem chi tiết',
      flex: 1,
      renderCell: (params) => (
        <NavLink to={`/postdetailAdmin/${params.row.postId}`}>
          Xem chi tiết
        </NavLink>
      ),
    },    
    {
      field: "Actions",
      headerName: "Quản lý",
      flex: 0.5,
      renderCell: (params) => {
        if (params.row.status === "Pending") {
          return (
            <span style={{ cursor: "pointer" }}>
              <MoreVertIcon
                color="action"
                onClick={(event) => handleMenuClick(event, params.row.id)}
              />
              <Popover
                open={isMenuOpen && selectedOrderId === params.row.id}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => handleUpdateOrder("Accepted")}>
                  Đồng ý
                </MenuItem>
                <MenuItem onClick={() => handleUpdateOrder("Rejected")}>
                  Từ chối
                </MenuItem>
              </Popover>
            </span>
          );
        } else {
          return (
            <MoreVertIcon
              color="action"
              style={{ color: "gray", cursor: "not-allowed" }}
            />
          );
        }
      },
    },
  ];
  const rows = postData?.map(item => ({
    ...item,
    id: item.postId 
  })) || [];
  return (
    <Box m="20px">
      <Header title="Bài viết" subtitle="Quản lý danh sách bài viết" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={20} 
          pagination
        />
      </Box>
    </Box>
  );
};

export default UpdatePost;
