import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import {
  Box, Image, Flex, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Spacer, Alert, AlertIcon
} from "@chakra-ui/react"
import LoginForm from "./Forms/LoginForm";

function Login(props){
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   setMessage("");
  //   setLoading(true);
  //   form.current.validateAll();
  //   if (checkBtn.current.context._errors.length === 0) {
  //     let response = AuthService.login(username, password); 

  //     if response.error
  //     .then(
  //       () => {
  //         navigate("/profile");
  //         window.location.reload();
  //       },
  //       (error) => {
  //         const resMessage =
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.message) ||
  //           error.message ||
  //           error.toString();
  //         setLoading(false);
  //         setMessage(resMessage);
  //       }
  //     );
  //   } else {
  //     setLoading(false);
  //   }
  // };

  return (
    <Box>
      { props.globalMessage ? (<Alert status='info'>
        <AlertIcon />
        {props.globalMessage}
      </Alert>) : (<div></div>) }
      <Box height={"50px"}></Box>
      <Flex flexDirection={'column'} alignItems={"center"} justifyContent={"center"}>
        <Image
          borderRadius='full'
          boxSize='150px'
          src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
          alt='profile'
        />
        <Box height={"50px"}></Box>
        <LoginForm setGlobalMessage={props.setGlobalMessage}></LoginForm>
      </Flex>
    </Box>
  );
};
export default Login;