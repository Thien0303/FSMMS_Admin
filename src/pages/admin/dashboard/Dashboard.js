import { FoodBankOutlined } from "@mui/icons-material";
import AddCardIcon from "@mui/icons-material/AddCard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Box, Typography, useTheme } from "@mui/material";
// import { format } from "date-fns";
import { useEffect, useState } from "react";
// import Apex from "../../components/ApexChart";
import Header from "../../../components/Header";
import StatBox from "../../../components/StatBox";
import { tokens } from "../../../theme";
import { getAllTotalOrder, getAllTotalPost, getAllTotalScales, getAllTotalUser } from "../../../redux/apiThunk/AdminThunk/dashboardThunk";
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);


  console.log(dashboardData); 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" sx={{ height: "100vh" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Bảng điều khiển" subtitle="Thống kê dữ liệu hệ thống" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData?.totalOrder}
            subtitle="Tổng số đơn đặt hàng"
            progress="0.3"
            increase="+30%"
            icon={
              <MenuBookIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData?.totalPost}
            subtitle="Tổng số bài viết"
            progress="0.50"
            increase="+21%"
            icon={
              <PersonPinIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData?.totalScales}
            subtitle="Tổng số giao dịch"
            progress="0.30"
            increase="+5%"
            icon={
              <AddCardIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData?.totalUser}
            subtitle="Tổng số người dùng"
            progress="0.80"
            increase="+43%"
            icon={
              <FoodBankOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{ height: "65vh" }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ${data.CurrentMonthProfits}
              </Typography>
            </Box>
          </Box>
          <Box height="300px" m="-20px 0 0 0">
            <Apex dataChart={data.MonthProfits} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{ height: "65vh" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {data.FiveNewOrders && data.FiveNewOrders.map((transaction, i) => (
            <Box
              key={`${transaction.ID}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  Order ID: {transaction.ID}
                </Typography>
                <Typography 
                   color={colors.blueAccent[500]}
                   variant="h5"
                   fontWeight="400"
                  >
                    {transaction.StyleFer.Email}
                  </Typography>

                  <Typography color={colors.grey[100]}>
                   {transaction.OrderStatus === 0 ? "Failed" : "Success"}
                  </Typography>
              </Box>
              <Box color={colors.grey[100]}>{format(new Date(transaction.OrderedDate), 'dd/MM/yyyy')}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.Total}
              </Box>
            </Box>
          ))}
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
