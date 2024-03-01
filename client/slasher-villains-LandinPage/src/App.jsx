import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddEntity from "./components/AddEntity"; 
import UpdateEntity from "./components/UpdateEntity"; // Import the new component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-entity" element={<AddEntity />} />
      <Route path="/update-entity/:id" element={<UpdateEntity />} /> {/* New route for updating */}
    </Routes>
  );
}

export default App;
