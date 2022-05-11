import {
    FormControl, FormLabel, Input, FormErrorMessage, Button, Box, Alert, AlertIcon, AlertTitle, AlertDescription,
    Checkbox, HStack, useToast, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInput, NumberInputStepper,
    Textarea
} from "@chakra-ui/react"
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
    const [review, setReview] = useState(props.review);
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
            title: 'Book review added!',
            description: 'Check your library!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    function handleSubmit(val, actions) {

        DataService.putBookReview(props.lib_id, props.bookId, val).
            then(() => {
                //props.setGlobalMessage("Hi! Have a wonderful day 😊");
                makeToast();
                actions.setSubmitting(false);
                props.recieveReviewData(props.lib_id, props.bookId);
                //navigate(`/library/${props.lib_id}`);
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
        <Box mt={1}>
            {props.review ? (
                <Formik
                    initialValues={{
                        title: props.review.title, text: props.review.text, score: props.review.score,
                        shouldRead: props.review.shouldRead, timeToRead: props.review.timeToRead
                    }}
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
                                        <FormLabel htmlFor='text'>Text:</FormLabel>
                                        <Textarea {...field} id='text' placeholder='text' />
                                        <FormErrorMessage>{form.errors.text}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <br />
                            <Field name='score' validate={validateField}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.score && form.touched.score}>
                                        <FormLabel htmlFor='score'>Score (0-10):</FormLabel>
                                        <NumberInput step={1} min={0} max={10} precision={0} {...field}>
                                            <NumberInputField {...field} id="score" placeholder="score" />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <FormErrorMessage>{form.errors.score}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <br />
                            <Field name='timeToRead' validate={validateField}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.timeToRead && form.touched.timeToRead}>
                                        <FormLabel htmlFor='timeToRead'>Time to read (in hours):</FormLabel>
                                        <NumberInput step={1} min={0} precision={0} {...field}>
                                            <NumberInputField {...field} id="timeToRead" placeholder="time" />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <FormErrorMessage>{form.errors.timeToRead}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <br />
                            <Field name='shouldRead' type="checkbox">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.shouldRead && form.touched.shouldRead}>
                                        <FormLabel htmlFor='shouldRead'>
                                            <HStack>
                                                <p>Recommended</p>
                                                <Checkbox {...field} id='shouldRead' defaultChecked={review.shouldRead} />
                                            </HStack>
                                        </FormLabel>
                                    </FormControl>
                                )}
                            </Field>
                            <Box width="500px" mt={5}>
                                {isError ? <Alert status='error'>
                                    <AlertIcon />
                                    <AlertTitle>Error!</AlertTitle>
                                    <AlertDescription>{message}</AlertDescription>
                                </Alert> : ""}
                            </Box>

                            {!review.title ? (
                                <Button
                                    mt={4}
                                    width={100}
                                    colorScheme='green'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                >Add review
                                </Button>
                            ) : (
                                <Button
                                    mt={4}
                                    width={100}
                                    colorScheme='green'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                >Edit review
                                </Button>
                            )}
                        </Form>

                    )}
                </Formik>

            ) : (
                <Button isLoading variant={"ghost"}></Button>
            )}

        </Box>

    )
}