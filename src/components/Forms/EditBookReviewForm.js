import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box, Alert, AlertIcon, AlertTitle, AlertDescription, Checkbox, HStack, useToast } from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";

export default function EditBookReviewForm(props) {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setError] = useState(false);
    const [book, setBook] = useState(undefined);
    const { id } = useParams();
    const toast = useToast();

    function validateField(value) {
        let error
        if (!value) {
            error = 'This field is required'
        }
        return error
    }

    const makeToast = () => {
        toast({
            title: 'Book edited!',
            description: 'Check your library!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    // function retrieveBook() {
    //     // var ow = false;
    //     // if (currentUser) {
    //     //     if (currentUser.libraryId == id) {
    //     //         setIsOwner(true);
    //     //         ow = true;
    //     //     }
    //     // }
    //     if (true) {
    //         DataService.getBook(props.lib_id, props.bid).then(response => {
    //             setBook(response.data);
    //             //alert(response.data);
    //             //setPrivacy(response.data.isPrivate);
    //             console.log(response.data);
    //         })
    //             .catch(e => {
    //                 console.log(e);
    //             })
    //     }
    // }

    // useEffect(() => {
    //     retrieveBook();
    // }, []);

    function handleSubmit(val, actions) {
        //var lib_id = AuthService.getCurrentUser().libraryId;
        DataService.putBook(props.lib_id, props.bid, val).
            then(() => {
                //props.setGlobalMessage("Hi! Have a wonderful day 😊");
                makeToast();
                navigate(`/library/${props.lib_id}`);
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
                    alert(resMessage)
                    actions.setSubmitting(false);
                }
            );
    };


    return (
        <Box mt={10}>
            {props.review ? (
                <Formik
                    initialValues={{ title: props.review.title, text: props.review.text, shouldRead: props.review.shouldRead}}
                    onSubmit={(values, actions) => {
                        console.log(values);
                        handleSubmit(values, actions);
                    }}
                >
                    {(props) => (
                        <Form>
                            <Field name='title' validate={validateField}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.title && form.touched.title}>
                                        <FormLabel htmlFor='title'>Title:</FormLabel>
                                        <Input {...field} id='title' placeholder='title' />
                                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <br />
                            <Field name='text' validate={validateField}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.text && form.touched.text}>
                                        <FormLabel htmlFor='text'>text</FormLabel>
                                        <Input {...field} id='text' placeholder='text' />
                                        <FormErrorMessage>{form.errors.text}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <br />
                        
                            {/* <Field name='shouldRead' type="checkbox">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.shouldRead && form.touched.shouldRead}>
                                        <FormLabel htmlFor='shouldRead'>
                                            <HStack>
                                                <p>Read by me</p>
                                                <Checkbox {...field} id='shouldRead' defaultChecked={props.review.shouldRead}/>
                                            </HStack>
                                        </FormLabel>
                                    </FormControl>
                                )}
                            </Field> */}
                            <Box width="500px" mt={5}>
                                {isError ? <Alert status='error'>
                                    <AlertIcon />
                                    <AlertTitle>Error!</AlertTitle>
                                    <AlertDescription>{message}</AlertDescription>
                                </Alert> : ""}
                            </Box>
                            <Button
                            mt={4}
                            mr={5}
                            width={100}
                            colorScheme='red'
                            isLoading={props.isSubmitting}
                            onClick={() => {navigate(`/library/${AuthService.getCurrentUser().libraryId}`);}}
                        >
                            Cancel
                        </Button>
                            <Button
                                mt={4}
                                width={100}
                                colorScheme='teal'
                                isLoading={props.isSubmitting}
                                type='submit'
                            >
                                Edit book
                            </Button>
                        </Form>

                    )}
                </Formik>

            ) : (
                <Button isLoading variant={"ghost"}></Button>
            )}

        </Box>

    )
}