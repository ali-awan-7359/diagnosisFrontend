import React from "react";

function StartTestButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
    >
      Start Test
    </button>
  );
}

export default StartTestButton;
