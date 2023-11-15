import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  IconButton,
  Avatar,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const WeatherPopup = ({ location, weatherData, onClose }) => {
  return (
    <div>
      {weatherData
        ?.filter((item) => item.location === location)
        ?.map((item) => (
          <Accordion key={item.weatherId} style={{ marginBottom: "10px" }}>
            <AccordionSummary
              style={{
                display: "flex",
                justifyContent: "space-between", // Align items at the start and end of the container
                alignItems: "center", // Center items vertically
              }}
            >   
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                {`Thời tiết ${location} ngày ${
                  item.description.match(
                    /(Hiện tại|T\d{1,2} \d{1,2}\/\d{1,2})/
                  )?.[0] || "Chủ nhật"
                }`}
              </Typography>
              <div style={{ marginLeft: "auto" }}> 
              <Chip
                avatar={
                  <Avatar
                    alt="Weather Image"
                    src={item.image} // Replace 'item.image' with the actual path to the image
                  />
                }
                style={{
                    backgroundColor: "white", // Set the background color to white
                    marginRight: 0, // Adjust margin as needed
                  }}
              />
              </div>
            </AccordionSummary>
            <AccordionDetails style={{ justifyContent: "center" }}>
              <div key={item.weatherId}>
                <Typography style={{ fontWeight: "bold" }}>
                  {`Nhiệt độ: ${
                    item.description.match(/(\d+)° \/ (\d+)°/)?.[1] || "N/A"
                  }° / ${
                    item.description.match(/(\d+)° \/ (\d+)°/)?.[2] || "N/A"
                  }°`}
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>
                  {item.description.includes("Mưa") &&
                  item.description.match(/Mưa [^\d]*(\d+) %/)
                    ? `Dự đoán mưa: ${
                        item.description.match(/Mưa [^\d]*(\d+) %/)[0]
                      }`
                    : item.description.includes("Mây") &&
                      item.description.match(/Mây [^\d]*(\d+) %/)
                    ? `Dự đoán mưa: ${
                        item.description.match(/Mây [^\d]*(\d+) %/)[0]
                      }`
                    : "Dự đoán mưa: N/A"}
                </Typography>

                <Typography style={{ fontWeight: "bold" }}>
                  {`Sức gió: ${
                    item.description.match(/Wind (\d+\.\d+) km\/h/)?.[1] ||
                    "N/A"
                  } km/h`}
                </Typography>
                <Typography style={{ fontWeight: "bold" }}>
                  {`Độ ẩm: ${
                    item.description.match(/Độ ẩm (\d+) %/)?.[1] || "N/A"
                  }%`}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      <IconButton
        style={{ position: "absolute", top: "8px", right: "8px" }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default WeatherPopup;
