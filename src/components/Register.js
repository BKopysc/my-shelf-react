import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import {
  Box, Image, Flex, FormControl, Heading,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Spacer,
} from "@chakra-ui/react"
import SignUpForm from "./Forms/SignUpForm";

function Register(props) {

  return (
    <Box>
      <Box height={"50px"}></Box>
      <Flex flexDirection={'column'} alignItems={"center"} justifyContent={"center"}>
        <Heading>Register account</Heading>
        <Box height={"50px"}></Box>
        <SignUpForm setGlobalMessage={props.setGlobalMessage}></SignUpForm>
      </Flex>
    </Box>
  );
};
export default Register;