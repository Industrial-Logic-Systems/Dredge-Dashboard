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

const DREDGES = [
  {
    label: "Dredge Test",
    href: "/dredge-test",
    company: "ils",
  },
  {
    label: "Dredge Constellation",
    href: "/dredge-constellation",
    company: "encore",
  },
  {
    label: "Dredge Ingenuity",
    href: "/dredge-ingenuity",
    company: "encore",
  },
  {
    label: "Dredge Integrity",
    href: "/dredge-integrity",
    company: "encore",
  },
  {
    label: "Dredge KellyL",
    href: "/dredge-kellyl",
    company: "encore",
  },
  {
    label: "Dredge Ranger",
    href: "/dredge-ranger",
    company: "encore",
  },
];

const App = () => {
  return (
    <div className="App">
      <Header headersData={DREDGES} />
      <div className="spacer" />
      <Routes>
        <Route path="/" element={<Home dredges={DREDGES} />} />
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
