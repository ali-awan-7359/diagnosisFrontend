import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import ResultScreen from './screens/ResultScreen';
import Diagnosis from './screens/DiagnosisScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {/* <Route path="/test" element={<TestScreen />} /> */}
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
      </Routes>
    </Router>
  );
};

export default App;
