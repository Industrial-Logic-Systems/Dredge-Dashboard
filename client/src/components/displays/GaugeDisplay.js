import { Box } from "@mui/material";
import React, { useEffect } from "react";
import "../../styles.css";

const GaugeDisplay = (props) => {
  const { name, value, suffix, min, max } = props;

  const [percent, setPercent] = React.useState(0.25);

  useEffect(() => {
    const percent_ = (value - min) / (max - min);
    setPercent(percent_ * 0.5);
  }, [value, min, max]);

  return (
    <div className="GaugeDisplay">
      <Box className="GaugeDisplay-body">
        <Box
          className="GaugeDisplay-fill"
          sx={{
            transform: `rotate(${percent}turn)`,
          }}
        ></Box>
        <Box className="GaugeDisplay-cover">
          <h3 className="GaugeDisplay-text">{name}</h3>
          <h3 className="GaugeDisplay-text">
            {value} {suffix}
          </h3>
        </Box>
        <p className="GaugeDisplay-minmax GaugeDisplay-min">{min}</p>
        <p className="GaugeDisplay-minmax GaugeDisplay-max">{max}</p>
      </Box>
    </div>
  );
};

export default GaugeDisplay;
