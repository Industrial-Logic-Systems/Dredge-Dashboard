import React from "react";
import "./styles.css";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";

import DredgeTest from "./components/dredgeTest";
import DredgeConstellation from "./components/dredgeConstellation";
import DredgeIngenuity from "./components/dredgeIngenuity";
import DredgeIntegrity from "./components/dredgeIntegrity";
import DredgeKellyL from "./components/dredgeKellyL";
import DredgeRanger from "./components/dredgeRanger";
import Home from "./Home";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="spacer" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dredge-test" element={<DredgeTest />} />
        <Route path="/dredge-constellation" element={<DredgeConstellation />} />
        <Route path="/dredge-ingenuity" element={<DredgeIngenuity />} />
        <Route path="/dredge-integrity" element={<DredgeIntegrity />} />
        <Route path="/dredge-kellyl" element={<DredgeKellyL />} />
        <Route path="/dredge-ranger" element={<DredgeRanger />} />
      </Routes>
    </div>
  );
};

export default App;
