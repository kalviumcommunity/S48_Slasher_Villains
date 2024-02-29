// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddEntity from "./components/AddEntity"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-entity" element={<AddEntity />} />
    </Routes>
  );
}

export default App;
