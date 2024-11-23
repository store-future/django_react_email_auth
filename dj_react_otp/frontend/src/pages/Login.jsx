// response.data is a dictionary what django is sending from backend like in handleotp
// {message: 'OTP sent to your email.', otp: '9daba8'} it is the jsonresponse from backend 

import React, { useState } from "react";
import axios from "axios"; // For making API calls
import { useNavigate } from "react-router-dom";
import logo from "../img/winlinelogo.png";

function LoginPage() {
  const [email, setEmail] = useState(""); // User's email
  const [otpSent, setOtpSent] = useState(false); // To check if OTP has been sent
  const [otp, setOtp] = useState(""); // User's OTP input
  const [error, setError] = useState(""); // To display error messages
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate(); // For navigation

  // Function to handle the email submission
  const handleSendOtp = async () => {

    // printing sending data to backend
    // const sendotpdata = {email , otpSent , otp , error} ;
    console.log("sending login data to backend :" , email);

    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setLoading(true); // Start the loader
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/send-otp/", { email });

      // printing received data from backend
      console.log("response data of feedback recieved from backend", response.json); 

      if (response.data) {
        setOtpSent(true); // OTP has been sent
        localStorage.setItem("email", email);
        setError(""); // Clear any previous error message
      }
    } catch (err) {
      setError(err.response.data.error);
    }
    finally {
      setLoading(false); // Stop the loader
    }
  };


  // Function to handle OTP verification
  const handleVerifyOtp = async () => {

    // printing sending data to backend to console
    const handledata = {email,otp}
    console.log("sending login data to backend :" , email);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/verify-otp/", {
        email,
        otp,
      });

    // printing sending data to backend to console
      console.log("Backend response for verify otp :", response.data);

      if (response.data.success) {
        // Successful login
        alert(response.data.message);
        navigate("/feedback"); 
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
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }} // Light background color
    >
       <div className="text-center mb-4">
       <img
        src={logo} // Use the imported logo here
        alt="Logo"
        style={{
          width: "215px",
          height: "auto",
          marginTop: "-338px",
          marginRight: "-373px",
        }}
      />
        </div>
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "10px" }}>
       
        {/* <h2 className="text-center mb-4">Login</h2> */}
        <form>
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
          {error && <p className="text-danger">{error}</p>}
          {!otpSent ? (
    <button
    type="button"
    className="btn btn-primary w-100"
    onClick={handleSendOtp}
    disabled={loading} // Disable the button when loading
    style={{
      backgroundColor: loading ? "#d3d3d3" : "forestgreen",
      borderColor: "white",
    }}
  >
    {loading ? (
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    ) : (
      "Send OTP"
    )}
  </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleVerifyOtp}
              style={{ backgroundColor: "forestgreen", borderColor: "white" }}
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
