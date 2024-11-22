import React from 'react';
import Navbar from '../components/Navbar';
import logo from "../img/winlinelogo.png";

function Home() {
  return (
    <div className="container text-center mb-2">
      <Navbar />
      <div className="content mt-4" style={{ paddingTop: '70px' }}>
        <div className="text-center">
        <img
        src={logo} // Use the imported logo here
        alt="Logo"
        style={{
          width: "215px",
          height: "auto",
        }}
      />
        </div>
        <h1>Welcome to the Home Page</h1>
        <p>This is a simple homepage with routing.</p>
      </div>
    </div>
  );
}


export default Home;
