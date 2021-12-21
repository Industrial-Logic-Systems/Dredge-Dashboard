import React from "react";
import "./styles.css";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";

import DredgeTest from "./components/dredgeTest";
import Home from "./Home";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="spacer" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dredge-test" element={<DredgeTest />} />
      </Routes>
    </div>
  );
};

export default App;
