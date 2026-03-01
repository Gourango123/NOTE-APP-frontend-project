import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/user/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.status === 200) {
          setStatus("Email Verified Successfully!");
          setTimeout(() => navigate("/login"), 1000);
        }
      } catch (error) {
        setStatus(
          error.response?.data?.message ||
            "Verification Failed or Link Expired.",
        );
      }
    };
    if (token) {
      verifyEmail();
    } else {
      setStatus("Invalid Verification Link.");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm w-full">
        {status === "Verifying your email..." && (
          <div className="animate-spin border-4 border-green-500 border-t-transparent rounded-full w-8 h-8 mx-auto mb-4"></div>
        )}

        <h2 className="text-xl font-semibold text-gray-800">{status}</h2>

        {status.includes("Successfully") && (
          <p className="text-green-500 mt-2">Redirecting to login...</p>
        )}
      </div>
    </div>
  );
}

export default Verify;
