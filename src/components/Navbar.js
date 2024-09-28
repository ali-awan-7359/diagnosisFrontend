import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
        </li>
        {/* <li>
          <Link to="/test" className="text-white hover:text-gray-400">
            Test
          </Link>
        </li> */}
        <li>
          <Link to="/result" className="text-white hover:text-gray-400">
            Results
          </Link>
        </li>
        <li>
          <Link to="/diagnosis" className="text-white hover:text-gray-400">
            Diagnosis
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
