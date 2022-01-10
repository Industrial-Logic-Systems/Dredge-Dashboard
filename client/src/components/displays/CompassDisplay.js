import React from "react";
import "../../styles.css";

function ticks(divisions) {
  var t = [];
  for (let i = 0; i < divisions; i++) {
    t.push(
      <div
        className="CompassDisplay-tick"
        style={{
          transform: `rotate(${
            i * (360 / divisions)
          }deg) translate(-0.02em, 4.5em)`,
        }}
      />
    );
  }
  return t;
}

const CompassDisplay = (props) => {
  const { name, value, divisions = 8 } = props;

  return (
    <div className="CompassDisplay">
      <div className="CompassDisplay-body">
        <div className="CompassDisplay-center">
          {ticks(divisions)}
          <div
            className="CompassDisplay-dial"
            style={{ transform: `translate(0em, -3.5em) rotate(${value}deg)` }}
          >
            <div className="CompassDisplay-dial-arrow" />
          </div>
        </div>
        <h3
          className="CompassDisplay-text"
          style={{
            transform: "translate(0em, 5.5em)",
          }}
        >
          {value}
        </h3>
        <h3
          className="CompassDisplay-text"
          style={{
            transform: "translate(0em, 4.5em)",
          }}
        >
          {name}
        </h3>
      </div>
    </div>
  );
};

export default CompassDisplay;
