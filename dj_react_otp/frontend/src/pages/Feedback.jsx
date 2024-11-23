import React, { useState , useEffect} from "react";
import Select from "react-select";
import logo from "../img/winlinelogo.png";
import { useNavigate } from "react-router-dom";



function Feedback() {
  const [product, setProduct] = useState([]);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate(); // For navigation



    // Fetch the email from localStorage when the component mounts
    useEffect(() => {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        setMessage("Email not found. Please log in again.");
      }
    }, []);
  
  // Hard-coded product options
const categorizedOptions = [
    {
      label: "Services",
      options: [
        { value: "Domain Registration", label: "Domain Registration" },
        { value: "Bulk Registration", label: "Bulk Registration" },
        { value: "Domain Transfer", label: "Domain Transfer" },
        { value: "Bulk Transfer", label: "Bulk Transfer" },
        { value: "Website Builder", label: "Website Builder" },
        { value: "WordPress", label: "WordPress" },
        { value: "cPanel", label: "cPanel" },
        { value: "Web Hosting Plus", label: "Web Hosting Plus" },
        { value: "VPS", label: "VPS" },
        { value: "Website Security", label: "Website Security" },
        { value: "SSL", label: "SSL" },
        { value: "Managed SSL Service", label: "Managed SSL Service" },
        { value: "Website Backup", label: "Website Backup" },
        { value: "Email Marketing", label: "Email Marketing" },
        { value: "SEO", label: "SEO" },
        { value: "Professional Email", label: "Professional Email" },
      ],
    },
    {
      label: "Products",
      options: [
        { value: "Winline Messenger", label: "Winline Messenger" },
        { value: "BT-C86D Electronics Cash Register cum Billing Machine", label: "BT-C86D Electronics Cash Register cum Billing Machine" },
        { value: "BT-T86H Electronic Cash Register cum Billing Machine", label: "BT-T86H Electronic Cash Register cum Billing Machine" },
        { value: "DSC Token HYP2003", label: "DSC Token HYP2003" },
        { value: "DSC Class 3 Signature Only 2 years", label: "DSC Class 3 Signature Only 2 years" },
        { value: "DSC Class 3 Signature with Encryption 2 years", label: "DSC Class 3 Signature with Encryption 2 years" },
        { value: "BT-C86D Electronics Cash Register cum Billing Machine", label: "BT-C86D Electronics Cash Register cum Billing Machine" },
        { value: "BT-T86H Electronic Cash Register cum Billing Machine", label: "BT-T86H Electronic Cash Register cum Billing Machine" },
        { value: "BT-E86D Electronic Cash Register cum Billing Machine", label: "BT-E86D Electronic Cash Register cum Billing Machine" },
        { value: "BT-E86A Electronic Cash Register cum Billing Machine", label: "BT-E86A Electronic Cash Register cum Billing Machine" },
        { value: "Secugen Hamster Pro 20 Biometric Finger Print Scanner", label: "Secugen Hamster Pro 20 Biometric Finger Print Scanner" },
        { value: "Microsoft 365 Business Basic", label: "Microsoft 365 Business Basic" },
        { value: "Microsoft Windows 10/11 Professional", label: "Microsoft Windows 10/11 Professional" },
        { value: "Microsoft 365 Business Premium", label: "Microsoft 365 Business Premium" },
        { value: "Microsoft 365 Business Standard", label: "Microsoft 365 Business Standard" },
        { value: "Microsoft 365 Apps for business", label: "Microsoft 365 Apps for business" },
        { value: "SanDisk Ultra 64 GB CZ48 USB 3.0 Flash Drive, Blue, 130 MB/sec", label: "SanDisk Ultra 64 GB CZ48 USB 3.0 Flash Drive, Blue, 130 MB/sec" },
        { value: "BT Bar Code Scanner", label: "BT Bar Code Scanner" },
        { value: "HP LaserJet Pro MFP M126nw Printer", label: "HP LaserJet Pro MFP M126nw Printer" },
        { value: "BT-156-i5 POS", label: "BT-156-i5 POS" },
        { value: "BT-T86H-A POS", label: "BT-T86H-A POS" },
        { value: "BT-T86H-W POS", label: "BT-T86H-W POS" },
      ],
    },
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();

    // disable button untill processs done
    setLoading(true); // Start loading


    // printing sending data to backend
    const feedback_data = {product , description , rating ,email };
    // console.log("sending feedback data to backend :" , feedback_data);
    console.log("sending feedback data to backend :" , feedback_data);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: product.map((item) => item.value), // Extract values from selected options
          description,
          rating,
          email,
        }),
      });

      const data = await response.json();
      console.log("receiving response of feedback from backend :" , data)


      if (response.ok) {
        setMessage("Feedback submitted successfully!");
        navigate("/");

      } else {
        setMessage(data.message || "Failed to submit feedback");
      }
    } catch (err) {
      setMessage("An error occurred while submitting feedback");
        }
        finally {
          setLoading(false); // Stop loading
        }
  };

  const renderRatings = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
  
          return (
            <label
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                cursor: "pointer",
                margin: "0 5px",
              }}
            >
              <input
                type="radio"
                name="rating"
                value={starValue}
                checked={rating === starValue}
                onChange={() => setRating(starValue)}
                style={{
                  display: "none", // Hide the default radio button
                }}
              />
              <span
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: rating === starValue ? "#ffc107" : "white",
                  color: rating === starValue ? "white" : "black",
                  fontSize: "16px",
                  transition: "background-color 0.2s ease, color 0.2s ease",
                }}
              >
                {starValue}
              </span>
            </label>
          );
        })}
      </div>
    );
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "215px",
            height: "auto",
          }}
        />
        <div
          className="card shadow-lg p-4"
          style={{ width: "400px", borderRadius: "10px" }}
        >
          <h2
            className="text-center mb-4"
            style={{ backgroundColor: "aliceblue" }}
          >
            Feedback Form
          </h2>
          {message && (
            <div
              className={`alert ${
                message.includes("successfully")
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Hidden email field */}
            <input type="hidden" 
                  value={email} 
                  name="email" 
            />
            
            <div className="mb-3">
              <label className="form-label">Product Purchased</label>
              <Select
                options={categorizedOptions}
                isMulti
                value={product}
                onChange={setProduct}
                placeholder="Select product(s)"
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your experience"
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Star Rating</label>
              <div>{renderRatings()}</div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ backgroundColor: "forestgreen", borderColor: "white" }}
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Submit Feedback"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feedback;














