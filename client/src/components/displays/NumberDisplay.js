import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const NumberDisplay = (props) => {
  const { name, value, suffix } = props;

  return (
    <Card
      className="NumberDisplay"
      sx={{
        backgroundColor: "primary.light",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {value} {suffix}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NumberDisplay;
