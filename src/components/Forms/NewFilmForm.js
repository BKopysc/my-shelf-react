import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box, Alert, AlertIcon, AlertTitle, AlertDescription, Checkbox, HStack, useToast,
    NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInput, NumberInputStepper} from "@chakra-ui/react"
import { Formik, Form, Field } from 'formik';
import React, { useState, useRef } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";


export default function NewFilmForm() {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setError] = useState(false);
    const { id } = useParams();
    const toast = useToast()


    function validateField(value) {
        let error
        if (!value) {
            error = 'This field is required'
        }
        return error
    }

    function validateGenre(value){
        let error
        if (!value) {
            error = 'This field is required'
        } else if (value.length > 15) {
            error = "Max. 15 chars!"
          }
        return error
    }

    function validateYear(value){
        let error
        var date = new Date().getFullYear()
        if (!value) {
            error = 'This field is required'
        } else if (value > date) {
            error = "Max year: " + date;
          }
        return error
        
    }

    function validateDescription(value) {
        let error
        if (!value) {
            error = 'This field is required'
        } else if (value.length > 30) {
            error = "Max. 30 chars!"
          }
        return error
    }

    const makeToast = () =>{
        toast({
            title: 'Film added!',
            description: 'Check your library!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    function handleSubmit(val, actions) {
        var lib_id = AuthService.getCurrentUser().libraryId;
        val.premiereDate = new Date(val.premiereDate, 1,1);
        alert(val.premiereDate)
        DataService.postFilm(lib_id,val).
        then(() => {
            //props.setGlobalMessage("Hi! Have a wonderful day 😊");
            makeToast();
            navigate(`/library/${lib_id}`);
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
        <Box mt={10}>
            <Formik
                initialValues={{ title: '', director: '', description: '', genre: '', premiereDate: '', watched: false }}
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
                        <Field name='director' validate={validateField}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.director && form.touched.director}>
                                    <FormLabel htmlFor='director'>Director:</FormLabel>
                                    <Input {...field} id='director' placeholder='director' />
                                    <FormErrorMessage>{form.errors.director}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <br />
                        <Field name='genre' validate={validateGenre}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.genre && form.touched.genre}>
                                    <FormLabel htmlFor='genre'>Genre:</FormLabel>
                                    <Input {...field} id='genre' placeholder='genre' />
                                    <FormErrorMessage>{form.errors.genre}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <br />
                        <Field name='premiereDate' validate={validateYear}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.premiereDate && form.touched.premiereDate}>
                                        <FormLabel htmlFor='premiereDate'>Premiere date (year):</FormLabel>
                                        <NumberInput step={1} min={1900} precision={0} {...field}>
                                            <NumberInputField {...field} id="premiereDate" placeholder="premiere date" />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <FormErrorMessage>{form.errors.premiereDate}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        <br />
                        <Field name='description' validate={validateDescription}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.description && form.touched.description}>
                                    <FormLabel htmlFor='description'>Description:</FormLabel>
                                    <Input {...field} id='description' placeholder='description' />
                                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <br />
                        <Field name='watched' type="checkbox">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.watched && form.touched.watched}>
                                    <FormLabel htmlFor='watched'>
                                        <HStack>
                                            <p>Watched by me</p>
                                            <Checkbox {...field} id='watched' />
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

                        <Button
                            mt={4}
                            mr={5}
                            width={100}
                            colorScheme='red'
                            isLoading={props.isSubmitting}
                            onClick={() => {navigate(`/library/${id}`);}}
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
                            Add film
                        </Button>
                    </Form>

                )}
            </Formik>

        </Box>

    )
}