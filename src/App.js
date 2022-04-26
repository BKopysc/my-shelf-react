import logo from './logo.svg';
import './App.css';
import {Box}  from '@chakra-ui/react';
import Navbar from './components/Navbar';
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Box className="content" pt={5}>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
