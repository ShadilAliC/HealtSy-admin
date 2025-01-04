import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AllRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
