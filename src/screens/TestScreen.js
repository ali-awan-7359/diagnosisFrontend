import React, { useState } from "react";
import axios from "axios";

const TestScreen = () => {
  const [status, setStatus] = useState("");

  const startScript = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/diagnosis/start"
      );
      setStatus("Script started successfully.");
    } catch (error) {
      setStatus("Error starting the script.");
    }
  };

  const stopScript = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/diagnosis/stop"
      );
      setStatus("Script stopping request sent.");
    } catch (error) {
      setStatus("Error stopping the script.");
    }
  };

  return (
    <div>
      <button onClick={startScript}>Start Test</button>
      <button onClick={stopScript}>Stop Test</button>
      <p>{status}</p>
    </div>
  );
};

export default TestScreen;
