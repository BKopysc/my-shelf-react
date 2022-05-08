import {
    Box, Image, Flex, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Spacer, Alert, AlertIcon, Text
} from "@chakra-ui/react"

import BookImg from "../img/book.jpg";
import NewBookForm from "./Forms/NewBookForm";

export default function AddBook() {
    return (
        <Box>
            <Flex flexDirection={'column'} alignItems={"center"} justifyContent={"center"}>
                <Box position={"relative"} width={"100%"}
                    height={"100px"} textAlign="center">
                    <Image
                        position={"absolute"}
                        left="0"
                        top="0"
                        width="100%"
                        height={'100%'}
                        opacity={"30%"}
                        objectFit={"cover"}
                        objectPosition={"0 70%"}
                        src={require('../img/book.jpg')}
                        alt='book-jpg'
                    />
                    <Text position="absolute" height={"100px"} width="300px" top="50%" left="50%" ml={"-150px"} mt={"-23px"} fontSize={"30"} fontWeight={"bold"} >Add new book </Text>
                </Box>
                <NewBookForm/>
                <Box height={"50px"}></Box>
            </Flex>
        </Box>
    )
}