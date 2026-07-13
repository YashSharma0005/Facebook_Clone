import { Routes, Route, Navigate } from "react-router-dom";
import LoginFull from "./pages/LoginFull.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<LoginFull />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={token ? <Home /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;