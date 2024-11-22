import React, { useState , useEffect} from "react";
import Select from "react-select";
import logo from "../img/winlinelogo.png";
import { useNavigate } from "react-router-dom";


function Feedback() {
  const [product, setProduct] = useState([]);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
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
  const productOptions = [
    { value: "Laptop", label: "Laptop" },
    { value: "Mobile", label: "Mobile" },
    { value: "Tablet", label: "Tablet" },
    { value: "Headphones", label: "Headphones" },
    { value: "Smartwatch", label: "Smartwatch" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

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
                options={productOptions}
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
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feedback;








// for single selection
// import React, { useState } from "react";
// import logo from "../img/winlinelogo.png";

// function Feedback() {
//   const [product, setProduct] = useState(""); // Single selection
//   const [description, setDescription] = useState("");
//   const [rating, setRating] = useState(0);
//   const [message, setMessage] = useState("");

//   // Hard-coded product options
//   const productOptions = [
//     { value: "Laptop", label: "Laptop" },
//     { value: "Mobile", label: "Mobile" },
//     { value: "Tablet", label: "Tablet" },
//     { value: "Headphones", label: "Headphones" },
//     { value: "Smartwatch", label: "Smartwatch" },
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Log the data being sent to the backend
//     const feedbackData = { product, description, rating,message};
//     console.log("Sending data to backend:", feedbackData);


//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/feedback/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           product, // Single product selection
//           description,
//           rating,
//         }),
//       });

//       const data = await response.json();
//       console.log("Response from backend:", data);

//       if (response.ok) {
//         setMessage("Feedback submitted successfully!");
//         // Clear form after submission
//         setProduct("");
//         setDescription("");
//         setRating(0);
//       } else {
//         setMessage(data.message || "Failed to submit feedback");
//       }
//     } catch (err) {
//       setMessage("An error occurred while submitting feedback");
//     }
//   };

//   const renderRatings = () => (
//     <div style={{ display: "flex", justifyContent: "space-between" }}>
//       {Array.from({ length: 5 }, (_, index) => {
//         const starValue = index + 1;
//         return (
//           <label
//             key={index}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               flexDirection: "column",
//               cursor: "pointer",
//               margin: "0 5px",
//             }}
//           >
//             <input
//               type="radio"
//               name="rating"
//               value={starValue}
//               checked={rating === starValue}
//               onChange={() => setRating(starValue)}
//               style={{ display: "none" }}
//             />
//             <span
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 borderRadius: "50%",
//                 border: "2px solid #ccc",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: rating === starValue ? "#ffc107" : "white",
//                 color: rating === starValue ? "white" : "black",
//                 fontSize: "16px",
//                 transition: "background-color 0.2s ease, color 0.2s ease",
//               }}
//             >
//               {starValue}
//             </span>
//           </label>
//         );
//       })}
//     </div>
//   );

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{ backgroundColor: "#f8f9fa" }}
//     >
//       <div className="text-center mb-4">
//         <img
//           src={logo}
//           alt="Logo"
//           style={{
//             width: "215px",
//             height: "auto",
//           }}
//         />
//         <div
//           className="card shadow-lg p-4"
//           style={{ width: "400px", borderRadius: "10px" }}
//         >
//           <h2
//             className="text-center mb-4"
//             style={{ backgroundColor: "aliceblue" }}
//           >
//             Feedback Form
//           </h2>
//           {message && (
//             <div
//               className={`alert ${
//                 message.includes("successfully")
//                   ? "alert-success"
//                   : "alert-danger"
//               }`}
//             >
//               {message}
//             </div>
//           )}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Product Purchased</label>
//               <select
//                 className="form-select"
//                 value={product}
//                 onChange={(e) => setProduct(e.target.value)}
//               >
//                 <option value="">Select a product</option>
//                 {productOptions.map((option, index) => (
//                   <option key={index} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Describe your experience"
//               ></textarea>
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Star Rating</label>
//               <div>{renderRatings()}</div>
//             </div>
//             <button
//               type="submit"
//               className="btn btn-primary w-100"
//               style={{ backgroundColor: "forestgreen", borderColor: "white" }}
//             >
//               Submit Feedback
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Feedback;




























//old code
// import React, { useState } from 'react';

// function Feedback() {
//   const [product, setProduct] = useState('');
//   const [description, setDescription] = useState('');
//   const [rating, setRating] = useState(0);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Log the data being sent to the backend
//     const feedbackData = { product, description, rating,message};
//     console.log("Sending data to backend:", feedbackData);

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/feedback/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           product,
//           description,
//           rating,
//         }),
//       });

//       const data = await response.json();
//       console.log("Response from backend:", data);

//       if (response.ok) {
//         setMessage('Feedback submitted successfully!');
//       } else {
//         setMessage(data.message || 'Failed to submit feedback');
//       }
//     } catch (err) {
//       console.log("Error occurred while submitting feedback:", err);
//       setMessage('An error occurred while submitting feedback');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-lg p-4">
//       <div className="text-center mb-4">
//           <img
//             src={process.env.PUBLIC_URL + '/winlinelogo.png'} // If placed in the public folder
//             alt="Logo"
//             style={{ width: '196px', height: 'auto' }} // Adjust size as needed
//           />
//         </div>
//         <h2 className="text-center mb-4">Feedback Form</h2>
//         {message && <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
//           {message}
//         </div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Product Purchased</label>
//             <input
//               type="text"
//               className="form-control"
//               value={product}
//               onChange={(e) => setProduct(e.target.value)}
//               placeholder="Enter product name"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Describe your experience"
//             ></textarea>
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Star Rating</label>
//             <input
//               type="number"
//               className="form-control"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               placeholder="Rate out of 5"
//               min="1"
//               max="5"
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-100">
//             Submit Feedback
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Feedback;
