import React from "react";
import "./styles.css";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";

import Test from "./Test";
import Home from "./Home";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};

export default App;
