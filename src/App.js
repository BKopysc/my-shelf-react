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
import Library from './components/Library';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import AddFilm from './components/AddFilm';
import EditFilm from './components/EditFilm';
import FindLibrary from './components/FindLibrary';

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
          <Route path="/login" element={<Login setGlobalMessage={setGlobalMessage} />} />
          <Route path="/register" element={<Register setGlobalMessage={setGlobalMessage}/>} />
          <Route path="/library/:id" element={<Library /> } />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/library/:id/new-book" element={<AddBook/>} />
          <Route path="/library/:id/edit-book/:bid" element={<EditBook/>} />
          <Route path="/library/:id/new-film" element={<AddFilm/>} />
          <Route path="/library/:id/edit-film/:fid" element={<EditFilm/>} />
          <Route path="/find-library/" element={<FindLibrary /> } />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
