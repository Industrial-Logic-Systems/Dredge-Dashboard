import { Box } from "@mui/material";
import React from "react";
import "../../styles.css";

const CompassDisplay = (props) => {
  const { name, value } = props;

  return (
    <div className="CompassDisplay">
      <Box
        sx={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor: "compass.back",
          outlineStyle: "solid",
          outlineColor: "black",
          outlineWidth: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "compass.dial",
            position: "absolute",
            width: 10,
            height: 10,
            borderRadius: "50%",
            transform: "translate(70px, 70px)",
          }}
        >
          <Box
            className="CompassDisplay-tick"
            sx={{
              transform: "rotate(0deg) translate(50%, 300%)",
            }}
          />
          <Box
            className="CompassDisplay-tick"
            sx={{
              transform: "rotate(90deg) translate(-100%, 310%)",
            }}
          />
          <Box
            className="CompassDisplay-tick"
            sx={{
              transform: "rotate(0deg) translate(50%, -350%)",
            }}
          />
          <Box
            className="CompassDisplay-tick"
            sx={{
              transform: "rotate(90deg) translate(-100%, -340%)",
            }}
          />
          <Box
            className="CompassDisplay-tick"
            sx={{
              transform: "rotate(45deg) translate(-50%, -350%)",
            }}
          />
          <Box
            className="CompassDisplay-tick"
            sx={{
              transform: "rotate(-45deg) translate(100%, 315%)",
            }}
          />
          <Box
            className="CompassDisplay-tick"
            sx={{
              transform: "rotate(45deg) translate(-50%, 300%)",
            }}
          />
          <Box
            className="CompassDisplay-tick"
            sx={{
              transform: "rotate(-45deg) translate(100%, -335%)",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: 10,
            height: 50,
            backgroundColor: "compass.dial",
            transformOrigin: "center bottom",
            transform: `translate(70px,25px) rotate(${value}deg)`,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "20px solid var(--compassDial)",
              transform: "translate(-5px, -19px)",
            }}
          />
        </Box>
        <h3
          style={{
            position: "absolute",
            textAlign: "center",
            width: "150px",
            transform: "translate(0px, 80px)",
          }}
        >
          {value}
        </h3>
        <h3
          style={{
            position: "absolute",
            textAlign: "center",
            width: "150px",
            transform: "translate(0px, 60px)",
          }}
        >
          {name}
        </h3>
      </Box>
    </div>
  );
};

export default CompassDisplay;
