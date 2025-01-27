import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <Router>
      <div>
        {/* Removed the navigation bar */}
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;