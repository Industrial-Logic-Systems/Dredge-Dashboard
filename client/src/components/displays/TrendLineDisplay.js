import React from "react";
import NumberDisplay from "./NumberDisplay";
import LineGraph from "./LineGraph";
import { CircularProgress } from "@mui/material";
import "../../styles.css";

const TrendLineDisplay = (props) => {
  const { name, data, x_axis, y_axis, suffix } = props;
  return (
    <div className="TrendLineDisplay">
      {data.length !== 0 ? (
        <>
          <NumberDisplay
            name={name}
            value={data.at(-1)[y_axis]}
            suffix={suffix}
          />
          <LineGraph x_axis={x_axis} y_axis={y_axis} data={data} />
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default TrendLineDisplay;
