import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Navber from "./components/navber";
import ProtectedRoute from "./components/protectedRoute";
import About from "./pages/About";
import Features from "./pages/Features";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Pricing from "./pages/Pricing";
import RegisterPage from "./pages/RegisterPage";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyOtp from "./pages/VerifyOtp";
import PasswordChange from "./pages/PasswordChange";

function App() {
  return (
    <div>
      {/* Navbar */}
      <Navber />
      {/* Toaster */}
      <Toaster position="top-center" />

      {/* All routes must be inside a single <Routes> */}
      <Routes>
        {/* Protected route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/verify-otp/:email" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-change/:email" element={<PasswordChange />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
