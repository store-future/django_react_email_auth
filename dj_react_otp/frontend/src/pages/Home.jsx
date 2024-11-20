import React from 'react';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className="container text-center mb-2">
      <Navbar />
      <div className="content mt-4" style={{ paddingTop: '70px' }}>
        <div className="text-center">
          <img
            src={process.env.PUBLIC_URL + '/winlinelogo.png'} // If placed in the public folder
            alt="Logo"
            style={{ width: '196px', height: 'auto' }} // Adjust size as needed
          />
        </div>
        <h1>Welcome to the Home Page</h1>
        <p>This is a simple homepage with routing.</p>
      </div>
    </div>
  );
}

export default Home;
