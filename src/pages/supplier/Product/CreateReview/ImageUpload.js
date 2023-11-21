// ImageUpload.js
import React from "react";
import { useField } from "formik";
import { Button, Typography } from "@mui/material";

const ImageUpload = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    helpers.setValue(file || null); // Set to null if no file is selected
  };

  const handleClick = (fileInputRef) => {
    fileInputRef.click();
  };

  return (
    <div>
      <Typography variant="body2" mb={1} style={{ fontWeight: "bold" }}>
        {label}
      </Typography>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
        ref={(ref) => (this.fileInput = ref)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick(this.fileInput)}
      >
        Chọn Hình Ảnh
      </Button>
      {meta.touched && meta.error && (
        <Typography variant="caption" color="error">
          {meta.error}
        </Typography>
      )}
    </div>
  );
};

export default ImageUpload;
