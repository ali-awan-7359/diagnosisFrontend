import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Diagnosis from "./screens/DiagnosisScreen"; // Load DiagnosisScreen on start
import ResultScreen from "./screens/ResultScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Diagnosis />} />{" "}
        {/* Set Diagnosis as default */}
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
