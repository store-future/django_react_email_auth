import React, { useState } from 'react';

function Feedback() {
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product,
          description,
          rating,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Feedback submitted successfully!');
      } else {
        setMessage(data.message || 'Failed to submit feedback');
      }
    } catch (err) {
      setMessage('An error occurred while submitting feedback');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
      <div className="text-center mb-4">
          <img
            src={process.env.PUBLIC_URL + '/winlinelogo.png'} // If placed in the public folder
            alt="Logo"
            style={{ width: '196px', height: 'auto' }} // Adjust size as needed
          />
        </div>
        <h2 className="text-center mb-4">Feedback Form</h2>
        {message && <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Purchased</label>
            <input
              type="text"
              className="form-control"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Enter product name"
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
            <input
              type="number"
              className="form-control"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rate out of 5"
              min="1"
              max="5"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
