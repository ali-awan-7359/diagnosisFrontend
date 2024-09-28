import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
// import "./Diagnosis.css"; // Assuming you use a separate CSS file

const Diagnosis = () => {
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showStopButton, setShowStopButton] = useState(false);

  const startScript = async () => {
    setIsLoading(true);
    setShowStopButton(false); // Hide stop button when starting

    try {
      const response = await axios.post(
        "http://localhost:9000/api/diagnosis/start"
      );

      if (response.data === "Script started successfully") {
        setOutput("Script started successfully.");
        setError("");

        // Simulate an 8-second loading before showing stop button
        setTimeout(() => {
          setIsLoading(false); // Stop loading animation
          setShowStopButton(true); // Show stop button
        }, 8000);
      } else {
        setError("Script failed to start.");
        setOutput("");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Error connecting to server.");
      setOutput("");
      setIsLoading(false);
    }
  };

  const stopScript = async () => {
    try {
      await axios.post("http://localhost:9000/api/diagnosis/stop");
      setOutput("Script stopped.");
      setError("");
    } catch (err) {
      setError("Error stopping the script.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen mt-12">
        <h1 className="text-2xl font-bold">Diagnosis</h1>
        <p className="text-4xl text-center my-8 min-h-40">
          INSTRUCTIONS: This test will track your eye movements. Sit still and
          click "Start Test". After the test starts, you can stop it after a few
          seconds. Ensure you are comfortable and maintain a steady position to
          achieve accurate results. The system will monitor your eye movements
          and record the data accordingly. Follow the instructions carefully and
          avoid making sudden movements during the test. Your cooperation is
          essential for accurate diagnosis. Thank you for participating in this
          test. The results will be analyzed to help in understanding eye
          movement patterns and their implications.
        </p>

        <button
          onClick={startScript}
          className="bg-blue-500 text-white p-4 rounded-lg text-xl mb-4"
          disabled={isLoading}
        >
          Start Test
        </button>

        {isLoading && (
          <div className="mt-4">
            <div className="loading-spinner">Loading...</div>
            <p>Running test, please wait...</p>
          </div>
        )}

        {showStopButton && (
          <button
            onClick={stopScript}
            className="bg-red-500 text-white p-4 rounded-lg text-xl"
          >
            Stop Test
          </button>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Output:</h2>
          <pre>{output}</pre>
          {error && (
            <div>
              <h2 className="text-xl font-semibold">Error:</h2>
              <pre>{error}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
