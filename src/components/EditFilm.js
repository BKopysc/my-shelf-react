import {
    Box, Image, Flex, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Spacer, Alert, AlertIcon, Text
} from "@chakra-ui/react";
import { useNavigate, useParams } from 'react-router-dom';

import FilmImg from "../img/film.jpg";
import EditFilmForm from "./Forms/EditFilmForm";

export default function EditFilm() {
    const { id, fid } = useParams();

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
                    <Text position="absolute" height={"100px"} width="300px" top="50%" left="50%" ml={"-150px"} mt={"-23px"} fontSize={"30"} fontWeight={"bold"} >
                    Edit Film
                    </Text>
                </Box>
                <EditFilmForm fid={fid} lib_id={id}/>
                <Box height={"50px"}></Box>
            </Flex>
        </Box>
    )
}