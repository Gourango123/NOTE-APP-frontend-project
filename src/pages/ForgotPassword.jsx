import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    if (!email) return setError("Email is required");

    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://note-app-backend-project.onrender.com/user/forgot-password",
        { email }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setIsSubmitted(true);
        setEmail("");
        navigate(`/verify-otp/${email}`);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        <h1 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h1>

        <p className="text-center text-gray-600 mb-6">
          {isSubmitted
            ? "Check your email for reset instructions"
            : "Enter your email to receive a password reset link"}
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {isSubmitted ? (
          <div className="text-center">
            <h3 className="font-semibold text-lg">Check your Inbox 📩</h3>
            <p className="text-gray-600">
              We sent a password reset link to <b>{email}</b>
            </p>

            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 text-blue-600 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgetPassword} className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="text-center mt-6 text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
