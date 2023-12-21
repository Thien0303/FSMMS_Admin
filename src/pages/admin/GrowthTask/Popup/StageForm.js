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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCropVarietyStages } from "../../../../redux/apiThunk/AdminThunk/growthThunk";
import TaskForm from "./TaskForm";
const StageForm = ({ open, handleClose, cropVarietyId }) => {
  const dispatch = useDispatch();
  const [openStageForm, setOpenStageForm] = useState(false);
  const [selectedCropVarityStageId, setSelectedCropVarityStageId] = useState(null);
  useEffect(() => {
    if (cropVarietyId) {
      dispatch(getAllCropVarietyStages({ id: cropVarietyId }));
    }
  }, [dispatch, cropVarietyId]);

  const data = useSelector(
    (state) => state?.getGrowth?.getCropVarityTask?.data
  );
  const handleOpenStageForm = (cropVarietyStageId) => {
    setSelectedCropVarityStageId(cropVarietyStageId);
    setOpenStageForm(true);
  };

  const handleCloseStageForm = () => {
    setOpenStageForm(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle style={{ color: "green", fontSize: "20px" }}>
        Các giai đoạn của cây
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
                  Tên loại cây
                </TableCell>
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
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontSize: "15px" }}
                >
                  Xem công việc
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
                    {detail.cropVarietyName}
                  </TableCell>
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
                    dangerouslySetInnerHTML={{ __html: detail.description }}
                  ></TableCell>
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
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: 10,
                        color: "white",
                        backgroundColor: "green",
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                      }}
                      onClick={() =>
                        handleOpenStageForm(detail.cropVarietyStageId)
                      }
                    >
                      Xem
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TaskForm
          open={openStageForm}
          handleClose={handleCloseStageForm}
          cropVarietyStageId={selectedCropVarityStageId}
        />
      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
    </Dialog>
  );
};

export default StageForm;
