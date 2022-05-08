import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import AuthService from "../../services/auth.service";

function LoginForm(props) {
    function validateName(value) {
        let error
        if (!value) {
            error = 'Username is required'
        }
        return error
    }

    function validatePassword(value) {
        let error
        if (!value) {
            error = 'Password is required'
        }
        return error
    }

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setError] = useState(false);


    function handleLogin(e, actions) {
        AuthService.login(e.username, e.password)
            .then(
                () => {
                    props.setGlobalMessage("Hi! Have a wonderful day 😊");
                    navigate(`/library/${AuthService.getCurrentUser().libraryId}`);
                    //window.location.reload();
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
            initialValues={{ username: '', password: '' }}
            onSubmit={(values, actions) => {
                console.log(values);
                handleLogin(values, actions);
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
                        Login
                    </Button>
                </Form>

            )}
        </Formik>

    </Box>

)
}

export default LoginForm;