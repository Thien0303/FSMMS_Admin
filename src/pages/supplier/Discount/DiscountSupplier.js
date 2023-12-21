import { Box, Button, IconButton, Menu } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDiscoutSupplier,
  updateFruitAllDiscount,
} from "../../../redux/apiThunk/SupplierThunk/discountFruitThunk";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "../../../api/api";
import { toast } from "react-toastify";
const DiscountSupplier = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const fruitDiscount = useSelector(
    (state) => state.discountFruit?.discountFruitSupplier?.data
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectDiscountId, setSelectDiscountId] = useState();
  useEffect(() => {
    if (!isDataLoaded && user) {
      dispatch(
        getAllDiscoutSupplier({
          discountName: "",
          discountExpiryDate: "",
          fruitId: "",
          userId: user.userId,
        })
      );
      setIsDataLoaded(true);
    }
  }, [dispatch, user, isDataLoaded]);
  const handleMenuClose = () => {
    setSelectDiscountId(null);
    setAnchorEl(null);
  };
  const handleMenuClick = (event, id) => {
    setSelectDiscountId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteDiscount = async (id) => {
    const confirmed = window.confirm("Bạn có muốn xóa mã giảm giá này chứ?");
    if (confirmed) {
      try {
        await api.delete(`api/fruit-discounts/${id}`);
        dispatch(
          getAllDiscoutSupplier({
            discountName: "",
            discountExpiryDate: "",
            fruitId: "",
            userId: user.userId,
          })
        );
        toast.success("Xóa mã giảm giá thành công");
      } catch (error) {
        toast.error("Xóa mã giảm giá thất bại!");
      }
    }
  };
  const columns = [
    { field: "fruitName", headerName: "Sản phẩm", flex: 1 },
    { field: "discountName", headerName: "Tên giảm giá", flex: 1 },
    { field: "discountThreshold", headerName: "Số lượng giảm giá", flex: 1 },
    {
      field: `discountPercentage`,
      headerName: "Số phần trăm giảm giá",
      flex: 1,
      valueFormatter: (params) => `${params.value * 100}%`,
    },
    {
      field: "discountExpiryDate",
      headerName: "Hạn giảm giá",
      flex: 1,
      valueGetter: (params) => {
        const createdDate = new Date(params.row.discountExpiryDate);
        return createdDate.toLocaleDateString("en-US");
      },
    },
    {
      field: "action",
      headerName: "Quản lý",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <span style={{ cursor: "pointer" }}>
            <MoreVertIcon
              color="action"
              onClick={(event) => handleMenuClick(event, params.row.id)}
            />
            {selectDiscountId === params.row.id && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleDeleteDiscount(params.row.id)}>
                  <DeleteForeverOutlinedIcon fontSize="small" color="error" />{" "}
                  Xóa mã giảm giá
                </MenuItem>
              </Menu>
            )}
          </span>
        </Box>
      ),
    },
  ];
  const rows =
    fruitDiscount?.map((item) => ({
      ...item,
      id: item.fruitDiscountId,
    })) || [];
  return (
    <Box m="20px">
      <Header title="Giảm giá" subtitle="Bảng dữ liệu giảm giá" />
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

export default DiscountSupplier;
