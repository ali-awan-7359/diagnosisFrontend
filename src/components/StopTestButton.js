import React from "react";

function StopTestButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition"
    >
      Stop Test
    </button>
  );
}

export default StopTestButton;
