import {
    Box, Image, Flex, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Spacer, Alert, AlertIcon, Text
} from "@chakra-ui/react"

import FilmImg from "../img/film.jpg";
import NewFilmForm from "./Forms/NewFilmForm";

export default function AddFilm() {
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
                        src={require('../img/film.jpg')}
                        alt='film-jpg'
                    />
                    <Text position="absolute" height={"100px"} width="300px" top="50%" left="50%" ml={"-150px"} mt={"-23px"} fontSize={"30"} fontWeight={"bold"} >Add new film </Text>
                </Box>
                <NewFilmForm/>
                <Box height={"50px"}></Box>
            </Flex>
        </Box>
    )
}