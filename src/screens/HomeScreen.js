import React from "react";
import Navbar from "../components/Navbar";

const HomeScreen = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold">Home Screen</h1>
      <p>Welcome to the Diagnosis Application.</p>
    </div>
  );
};

export default HomeScreen;
