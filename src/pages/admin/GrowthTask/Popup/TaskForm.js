import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCropVarietyGrowthTasks} from "../../../../redux/apiThunk/AdminThunk/growthThunk";
const TaskForm = ({ open, handleClose, cropVarietyStageId}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (cropVarietyStageId) {
          dispatch(getAllCropVarietyGrowthTasks({ id: cropVarietyStageId }));
        }
      }, [dispatch, cropVarietyStageId]);
    
      const data = useSelector(
        (state) => state?.getGrowth?.getCropVarityGrowthTask?.data
      );
      console.log("data", data);
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ color: "green", fontSize: "20px" }}>
          Các công việc của cây
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "15px" }}
                  >
                    Tên giai đoạn
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "15px" }}
                  >
                    Công việc
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "15px" }}
                  >
                    Mô tả
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "15px" }}
                  >
                    Ngày bắt đầu
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontSize: "15px" }}
                  >
                    Ngày kết thúc
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontSize: "15px" }}
                    >
                      {detail.stageName}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontSize: "15px" }}
                    >
                      {detail.taskName}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontSize: "15px" }}
                      dangerouslySetInnerHTML={{ __html: detail.description }}
                    >
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontSize: "15px" }}
                    >
                      {new Date(detail.startDate).toLocaleDateString("en-US")}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontSize: "15px" }}
                    >
                     {new Date(detail.endDate).toLocaleDateString("en-US")}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ fontSize: "15px" }}
                    >
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default TaskForm;
  