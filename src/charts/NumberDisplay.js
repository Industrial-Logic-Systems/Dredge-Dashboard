import React from "react";

const NumberDisplay = (props) => {
  const { name, value, suffix } = props;

  return (
    <div className="NumberDisplay">
      <h3>{name}</h3>
      <h4>
        {value} {suffix}
      </h4>
    </div>
  );
};

export default NumberDisplay;
