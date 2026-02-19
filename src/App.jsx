// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import WorkerSection from "./components/WorkerSection";
import WorkerDetailsPage from "./components/WorkerDetailsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ImageSlider from "./components/ImageSlider";
import Footer from "./components/Footer";
import Select from "./components/Select";
import WorkerLogin from "./components/WorkerLogin";
import WorkersDashboard from "./components/WorkersDashboard";
import Contact from "./components/Contact";
import { AuthProvider } from "./AuthContext";
import WorkerForm from "./components/WorkerForm";
import Chatbox from "./components/Chatbox";
import ReviewForm from "./components/ReviewForm";
import WorkerReviews from "./components/WorkerReviews";

function App() {
  const location = useLocation();
  const showSlider = location.pathname === "/" || location.pathname === "/workers";

  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        {showSlider && <ImageSlider />}
        <Routes>
          <Route path="/" element={<><WorkerSection /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/workers" element={<Navigate to="/" />} />
          <Route path="/select" element={<Select />} />
          <Route path="/worker-login" element={<WorkerLogin />} />
          <Route path="/worker-form" element={<WorkerForm />} />
          <Route
            path="/workers-dashboard"
            element={
              <ProtectedRoute>
                <WorkersDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workers/:categoryId"
            element={
              <ProtectedRoute>
                <WorkerDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* Reviews */}
          <Route path="/reviews" element={<WorkerReviews />} />
          <Route
            path="/add-review"
            element={
              <ProtectedRoute>
                <ReviewForm />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <Chatbox />
      </div>
    </AuthProvider>
  );
}

export default App;
