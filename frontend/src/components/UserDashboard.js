import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NaturalDisasters from "./NaturalDisasters";
import StudyCenters from "./StudyCenters";
import Forums from "./Forums";

function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 text-white p-4">
        <ul className="flex space-x-4 justify-center">
          <li>
            <Link
              to="/user/natural-disasters"
              className="hover:bg-blue-700 p-2 rounded"
            >
              Natural Disasters
            </Link>
          </li>
          <li>
            <Link
              to="/user/study-centers"
              className="hover:bg-blue-700 p-2 rounded"
            >
              Study Centers
            </Link>
          </li>
          <li>
            <Link to="/user/forums" className="hover:bg-blue-700 p-2 rounded">
              Forums
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/natural-disasters" element={<NaturalDisasters />} />
          <Route path="/study-centers" element={<StudyCenters />} />
          <Route path="/forums" element={<Forums />} />
        </Routes>
      </div>
      <div className="flex justify-center mt-4">
        <a
          href="/"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Return to Login Page
        </a>
      </div>
    </div>
  );
}

export default UserDashboard;
