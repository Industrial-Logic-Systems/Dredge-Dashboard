import React, { useState } from "react";
import { Button } from "@mui/material";

import NumberDisplay from "./displays/NumberDisplay";
import Map from "./displays/Map";
import LineGraph from "./displays/LineGraph";

const DredgeTest = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <h1>Dredge Test</h1>
      <NumberDisplay value={value} name="Value" suffix="v" />
      <Button onClick={() => setValue(value + 1)}>Increment</Button>
      <Button onClick={() => setValue(value - 1)}>Decrement</Button>
      <Map
        positions={[
          [33.860121, -117.819219],
          [33.860531, -117.819629],
          [33.860731, -117.819429],
        ]}
      />
      <LineGraph
        x_axis={"x"}
        y_axis={"y"}
        data={[
          { x: 10, y: 15 },
          { x: 7, y: 3 },
          { x: 8, y: 4 },
        ]}
      />
    </div>
  );
};

export default DredgeTest;
