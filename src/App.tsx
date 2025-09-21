import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AgentDashboard from './components/AgentDashboard';
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import FarmerDashboard from "./components/FarmerDashboard";
import LabDashboard from "./components/LabDashboard";
import ManufacturerDashboard from "./components/ManufacturerDashboard";
import AdminDashboard from "./components/AdminDashboard";

const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/lab-dashboard" element={<LabDashboard />} />
          <Route path="/manufacturer-dashboard" element={<ManufacturerDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
