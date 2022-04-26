import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
