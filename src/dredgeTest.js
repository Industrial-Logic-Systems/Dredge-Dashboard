import React from "react";

import Map from "./charts/Map";

const data = {
  positions: [
    [33.862841, -117.81836],
    [33.863742, -117.817454],
  ],
};

const DredgeTest = () => {
  return (
    <div>
      <h1>Dredge Test</h1>
      <Map {...data} />
    </div>
  );
};

export default DredgeTest;
