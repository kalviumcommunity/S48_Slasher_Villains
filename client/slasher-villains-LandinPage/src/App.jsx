import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddEntity from "./components/AddEntity";
import UpdateEntity from "./components/UpdateEntity";
import Home from "./components/Home"; // Import the Home component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Set Home component as the root */}
      <Route path="/landing" element={<Landing />} /> {/* Route to Landing component */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-entity" element={<AddEntity />} />
      <Route path="/update-entity/:id" element={<UpdateEntity />} />
    </Routes>
  );
}

export default App;
