import React, { useState } from "react";
import axios from "axios"; // For making API calls
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState(""); // User's email
  const [otpSent, setOtpSent] = useState(false); // To check if OTP has been sent
  const [otp, setOtp] = useState(""); // User's OTP input
  const [error, setError] = useState(""); // To display error messages
  const navigate = useNavigate(); // For navigation

  // Function to handle the email submission
  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/send-otp/", { email });

      if (response.data.message) {
        setOtpSent(true); // OTP has been sent
        setError(""); // Clear any previous error message
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  // Function to handle OTP verification
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/verify-otp/", {
        email,
        otp,
      });
      console.log("Backend response: for verify otp", response.data);

      if (response.data.success) {
        // Successful login
        alert("OTP verified successfully! Redirecting to Feedback page.");
        navigate("/feedback"); // Redirect to Feedback page
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Show backend error
      } else {
        setError("An unexpected error occurred. Please try again."); // General error
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Login</h2>
        <form>
          {/* Email Input */}
          {!otpSent && (
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          )}

          {/* OTP Input */}
          {otpSent && (
            <div className="mb-3">
              <label className="form-label">OTP</label>
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-danger">{error}</p>}

          {/* Submit Button */}
          {!otpSent ? (
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
