import React from "react";
import { useField } from "formik";
import { Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const RatingField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (value) => {
    helpers.setValue(value);
  };

  const renderStarRating = (rating) => {
    const maxRating = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return Array(maxRating)
      .fill(0)
      .map((_, index) => {
        if (index < filledStars) {
          return <StarIcon key={index} style={{ color: "#FFD700", fontSize: "1rem", verticalAlign: "middle" }} />;
        } else if (hasHalfStar && index === filledStars) {
          return <StarOutlineIcon key={index} style={{ color: "#FFD700", fontSize: "1rem", verticalAlign: "middle" }} />;
        } else {
          return <StarOutlineIcon key={index} style={{ color: "transparent", fontSize: "1rem", verticalAlign: "middle" }} />;
        }
      });
  };

  return (
    <div>
      <Typography variant="body2" mb={1} style={{ fontWeight: "bold" }}>
        {label}
      </Typography>
      <Rating
        name={field.name}
        value={field.value}
        onChange={(event, newValue) => handleChange(newValue)}
        precision={1}
        icon={renderStarRating(field.value)}
      />
      {meta.touched && meta.error && (
        <Typography variant="caption" color="error">
          {meta.error}
        </Typography>
      )}
    </div>
  );
};

export default RatingField;
