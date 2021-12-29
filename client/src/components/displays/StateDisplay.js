import React from "react";
import { Chip } from "@mui/material";

const StateDisplay = (props) => {
  const { name, value, color, secondary_color = color } = props;

  return (
    <div className="StateDisplay">
      {value ? (
        <Chip label={name} color={color} />
      ) : color === secondary_color ? (
        <Chip label={name} color={secondary_color} variant="outlined" />
      ) : (
        <Chip label={name} color={secondary_color} />
      )}
    </div>
  );
};

export default StateDisplay;
