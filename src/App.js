import logo from './logo.svg';
import './App.css';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Help from './components/Help';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import AuthService from './services/auth.service';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [globalMessage, setGlobalMessage] = useState(undefined);

  function notify (message){
    toast.info(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }


  if (globalMessage) {
    notify(globalMessage);
    setGlobalMessage(undefined);
  }

  //setGlobalMessage("test")

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Box className="content" pt={5}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register setGlobalMessage={setGlobalMessage}/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
