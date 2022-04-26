import logo from './logo.svg';
import './App.css';
import {Box}  from '@chakra-ui/react';
import Navbar from './components/Navbar';
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Help from './components/Help';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Box className="content" pt={5}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/help" element={<Help/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
