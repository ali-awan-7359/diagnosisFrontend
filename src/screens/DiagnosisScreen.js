import React, { useState } from "react";
import axios from "axios";

const Diagnosis = () => {
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showStopButton, setShowStopButton] = useState(false);
  const [testResults, setTestResults] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const startScript = async () => {
    setIsLoading(true);
    setShowStopButton(false); // Hide stop button when starting
    setOutput(""); // Reset output
    setTestResults(""); // Clear previous results

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
    setIsProcessing(true); // Show processing loader
    setShowStopButton(false); // Hide stop button when processing

    try {
      await axios.post("http://localhost:9000/api/diagnosis/stop");
      setOutput("Script stopped.");
      setError("");

      // Trigger the mergeRepeat and D56F.py scripts
      await runMergeRepeatAndPrediction();
    } catch (err) {
      setError("Error stopping the script.");
    } finally {
      setIsProcessing(false); // Hide processing loader
    }
  };

  const runMergeRepeatAndPrediction = async () => {
    try {
      // Merge the files and run the predictions
      const mergeResponse = await axios.post(
        "http://localhost:9000/api/diagnosis/run-scripts"
      );

      if (mergeResponse.data.output) {
        setTestResults(mergeResponse.data.output); // Capture the backend response output
      } else {
        setError("Failed to merge or run the prediction script.");
      }
    } catch (err) {
      setError("Error running the merge or prediction scripts.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen overflow-auto">
      {/* Title Section */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Diagnosis</h1>

      {/* Instruction Section */}
      <div className="text-4xl text-center my-8 w-full">
        <p className="min-h-[160px] px-4">
          INSTRUCTIONS: This test will track your eye movements. Sit still and
          click "Start Test". After the test starts, you can stop it after a few
          seconds. Ensure you are comfortable and maintain a steady position to
          achieve accurate results. The system will monitor your eye movements
          and record the data accordingly. Follow the instructions carefully and
          avoid making sudden movements during the test. Your cooperation is
          essential for accurate diagnosis. Thank you for participating in this
          test. The results will be analyzed to help in understanding eye
          movement patterns and their implications. The test aims to assess how
          your eyes react to various stimuli and to collect data that can
          provide insights into your visual processing abilities. This
          information will be critical in identifying any potential issues and
          developing strategies for improvement. We ask that you focus on the
          instructions and do not hesitate to reach out if you have any
          questions during the process. Remember, your comfort is paramount, and
          the test is designed to be as seamless as possible. Take a deep
          breath, relax, and let's get started. Your participation is vital in
          contributing to ongoing research and understanding of eye movement
          behaviors.
        </p>
      </div>

      {/* Button Section */}
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={startScript}
          className={`bg-blue-500 text-white p-4 rounded-lg text-xl ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          Start Test
        </button>

        {isLoading && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
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

        {isProcessing && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
            <p>Processing results, please wait...</p>
          </div>
        )}
      </div>

      {/* Output Section */}
      <div className="w-full max-w-4xl px-6 mt-8">
        <h2 className="text-xl font-semibold">Output:</h2>
        <div className="p-4 bg-gray-100 rounded-lg min-h-[100px]">
          <pre>{output}</pre>
        </div>

        {error && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-red-500">Error:</h2>
            <div className="p-4 bg-red-100 rounded-lg">
              <pre>{error}</pre>
            </div>
          </div>
        )}
      </div>

      {/* Test Results Section */}
      {testResults && (
        <div className="w-full max-w-4xl px-6 mt-8">
          <h2 className="text-xl font-semibold">Test Results:</h2>
          <div className="p-4 bg-green-100 rounded-lg min-h-[100px]">
            <pre>{testResults}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diagnosis;
