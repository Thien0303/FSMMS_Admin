import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import DifferenceOutlinedIcon from "@mui/icons-material/DifferenceOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");
  let isAuthenticated = JSON.parse(localStorage.getItem("user"));
  let renderItem;
  if (isAuthenticated.roleName === "Expert") {
    renderItem = (
      <>
        <Item
          title="Danh sách bài viết"
          to="/list"
          icon={<ListAltOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Tạo bài viết"
          to="/create"
          icon={<CreateNewFolderOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Giá thị trường"
          to="/history"
          icon={<DifferenceOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Thời tiết"
          to="/weather"
          icon={<CloudOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Top người đăng bài"
          to="/countPost"
          icon={<ListAltOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Bài viết của tôi"
          to="/post"
          icon={<ListAltOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </>
    );
  } else if (isAuthenticated.roleName === "Admin") {
    renderItem = (
      <>
        <Item
          title="Dashboard"
          to="/dashboard"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Tạo bài viết"
          to="/createPost"
          icon={<ListAltOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
       <Item
          title="Danh sách bài viết"
          to="/listAllPost"
          icon={<ListAltOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
       <Item
          title="Quản lý bài viết"
          to="/updatePost"
          icon={<ListAltOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
         <Item
          title="Danh sách người dùng"
          to="/getUser"
          icon={<ListAltOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </>
    );
  } else if (isAuthenticated.roleName === "Supplier") {
    renderItem = (
      <>
        <Item
          title="Trái cây của nông dân"
          to="/listproduct"
          icon={<LocalMallOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Đặt hàng"
          to="/checkout"
          icon={<LocalAtmOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Chat"
          to="/chat"
          icon={<ChatOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Tạo sản phẩm"
          to="/createFruit"
          icon={<CreateNewFolderOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Sản phẩm đã tạo"
          to="/listFruit"
          icon={<ListAltOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Quản lý giảm giá"
          to="/listDiscountFruit"
          icon={<DiscountOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Quản lý đơn hàng"
          to="/listOrderSeller"
          icon={<BorderColorOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Lịch sử đơn hàng"
          to="/listOrderFruit"
          icon={<HistoryOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </>
    );
  }

  return (
    <Box
      sx={{
        zIndex: 1000,
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Mùa trái cây
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../user.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                ></Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Hệ thống quản lý
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>{renderItem}</Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
