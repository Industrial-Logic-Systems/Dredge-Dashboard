import React, { useState } from "react";
import { Button } from "@mui/material";
import NumberDisplay from "./charts/NumberDisplay";

const DredgeTest = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <h1>Dredge Test</h1>
      <NumberDisplay value={value} name="Value" suffix="v" />
      <Button onClick={() => setValue(value + 1)}>Increment</Button>
      <Button onClick={() => setValue(value - 1)}>Decrement</Button>
    </div>
  );
};

export default DredgeTest;
