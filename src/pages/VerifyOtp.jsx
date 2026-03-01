import axios from "axios";
import { CheckCircle, Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function VerifyOtp() {
  const [isVerified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const inputRefs = useRef([]);
  const { email } = useParams();
  const navigate = useNavigate();

  // 🔹 input change
  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // 🔹 clear OTP
  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  // 🔹 submit OTP
  const handleSubmit = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Please enter all digits");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${API_URL}/user/verify-otp/${email}`,
        { otp: finalOtp },
      );

      setSuccessMessage(res.data.message);
      setVerified(true);

      setTimeout(() => {
        navigate(`/password-change/${email}`);
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verify your email</h1>
        <p className="mb-6">
          Sent 6 digit verification code to <b>{email}</b>
        </p>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {successMessage && (
          <p className="text-green-600 mb-2">{successMessage}</p>
        )}

        {isVerified ? (
          <div>
            <CheckCircle className="text-green-600 mx-auto mb-2" size={48} />
            <p>Verification successful. Redirecting...</p>
            <Loader2 className="animate-spin mx-auto mt-2" />
          </div>
        ) : (
          <>
            {/* OTP Inputs */}
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-12 h-12 text-center border rounded text-lg"
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-3">
              <button
                onClick={handleSubmit}
                disabled={isLoading || otp.some((d) => d === "")}
                className={`px-6 py-2 rounded text-white ${
                  otp.some((d) => d === "")
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin inline mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </button>

              <button
                onClick={clearOtp}
                className="px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Clear
              </button>
            </div>
          </>
        )}

        {/* Back Link */}
        <div className="mt-6">
          <p>
            Wrong email?{" "}
            <Link to="/forgot-password" className="text-blue-600 underline">
              Go Back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
