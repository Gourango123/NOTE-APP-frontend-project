import React from "react";

const VerifyEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Check Your Email! 📧
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We have sent a verification link to your email address. Please check
          your inbox (or spam folder) and click the link to verify your account.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
