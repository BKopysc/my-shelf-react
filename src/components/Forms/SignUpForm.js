import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import AuthService from "../../services/auth.service";

function SignUpForm(props) {
    function validateName(value) {
        let error
        if (!value) {
            error = 'Username is required'
        }
        else if(value.length < 3 || value.length > 20)
        {
            error="Username length must be between 3 and 20 chars"
        }
        return error
    }

    function validateEmail(value) {
        let error
        if (!value) {
            error = 'Email is required'
        }
        

        let email=value.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );

        if(!email){
            error = "Email has incorrect format!"
        }


        return error
    }

    function validatePassword(value) {
        let error
        if (!value) {
            error = 'Password is required'
        }
        else if(value.length < 6 || value.length > 40)
        {
            error="Password length must be between 6 and 40 chars"
        }
        return error
    }

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setError] = useState(false);


    function handleSignUp(e, actions) {
        AuthService.register(e.username, e.email, e.password)
            .then(
                () => {
                    props.setGlobalMessage("You can now login!");
                    navigate("/login", {registerMessage: "You have succesfully registered! Now login."});
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                    setError(true);
                    actions.setSubmitting(false);
                }
            );
    };

    return (
        <Box>
            <Formik
                initialValues={{ username: '', password: '', email: '' }}
                onSubmit={(values, actions) => {
                    console.log(values);
                    handleSignUp(values, actions);
                }}
            >
                {(props) => (
                    <Form>
                        <Field name='username' validate={validateName}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.username && form.touched.username}>
                                    <FormLabel htmlFor='username'>Username</FormLabel>
                                    <Input {...field} id='username' placeholder='username' />
                                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <br />
                        <Field name='email' validate={validateEmail}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel htmlFor='email'>Username</FormLabel>
                                    <Input {...field} id='email' type="email" placeholder='email' />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <br />
                        <Field name='password' validate={validatePassword}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel htmlFor='password'>Password</FormLabel>
                                    <Input {...field} id='password' type={"password"} placeholder='password' />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Box width="400px" mt={5}>
                            {isError ? <Alert status='error'>
                                <AlertIcon />
                                <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert> : ""}
                        </Box>
                        <Button
                            mt={4}
                            width={100}
                            colorScheme='teal'
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                            Register
                        </Button>
                    </Form>

                )}
            </Formik>

        </Box>

    )
}

export default SignUpForm;