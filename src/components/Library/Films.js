import {
    Box, Heading, Alert, AlertIcon, VStack, HStack, Flex, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Button,
    InputGroup, InputLeftAddon, Input, SimpleGrid, Text, useDisclosure, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import XMLExport from "../Tools/XMLExport";
import { makeSuccessToast } from "../Tools/GlobalToast";
import FilmReviewModal from "./FilmReviewModal";
import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";



export default function Films(props) {

    const [searchInput, setSearchInput] = useState();
    const [filmState, setFilmState] = useState(props.userFilms);
    const [filmId, setFilmId] = useState();
    const [filmReview, setFilmReview] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [shouldEditModal, setShouldEditModal] = useState(false);
    const [isOwner, setOwner] = useState(AuthService.getCurrentUser());

    const toast = useToast();

    const makeToast = (text) => {
        toast({
            title: text,
            description: 'Check your library!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    function recieveReviewData(lib_id, film_id) {
        if (true) {
            DataService.getFilmReview(lib_id, film_id).then(response => {
                if (response.data.title == null) {
                    response.data.title = "";
                    response.data.text = "";
                    response.data.bestActor= "";
                
                }
                setFilmReview(response.data);
                setShouldEditModal(false);
                setLoading(false);
                console.log(response.data);
            })
                .catch(e => {
                    alert(e);
                })
        }
    }

    function deleteFilmReview(filmId){
        if (true) {
            DataService.deleteFilmReview(props.lib_id, filmId).then(response => {
                onClose();
                makeToast("Film review deleted!");
            })
                .catch(e => {
                    alert(e);
                })
        }
}

    function getReview(id) {
        setFilmId(id);
        recieveReviewData(props.lib_id, id);
        setShouldEditModal(false);
        onOpen();
    }


    function closeModal() {
        onClose();
    }

    function handleInput(event) {
        var input_val = event.target.value;
        setSearchInput(event.target.value);
        var currentFilms = props.userFilms;
        var newFilms = [];

        currentFilms.forEach(element => {
            if (element.director.toLowerCase().includes(input_val.toLowerCase())) {
                //console.log(element.author);
                newFilms.push(element);
            }
            else if (element.title.toLowerCase().includes(input_val.toLowerCase())) {
                newFilms.push(element);
            }
            else if (element.genre.toLowerCase().includes(input_val.toLowerCase())) {
                newFilms.push(element);
            }
            
        });
        //console.log(input_val);
        console.log(JSON.stringify(newFilms));
        setFilmState(newFilms);
    }

    const test = [1, 2, 3, 4, 5, 6]
    const gridFilms = filmState.map((film) =>
        <Box backgroundColor="#e6f2ee" border={"1px"} borderColor={"teal"} rounded={"lg"} width="250px" height='300px' position={"relative"}>
            <Text position={"absolute"} top="2" left="2">🎞️</Text>
            {isOwner && isOwner.libraryId == props.lib_id ? (
                <Box position={"absolute"} top="2" right="2">

                    <Button width={5} height={8} mr={2} variant={"outline"} colorScheme="teal"
                        as={RouterLink} to={`/library/${props.lib_id}/edit-film/${film.id}`}>
                        ✏️
                    </Button>
                </Box>
            ) : (
                <Box>
                </Box>
            )}

            <VStack mt={5}>
                <Text fontSize={20} fontWeight={"bold"} width="200px">{film.title}</Text>
                <Text>{new Date(film.premiereDate).getFullYear()}</Text>
                <Text width="200px">{film.director}</Text>
                <Text fontStyle={"italic"}>{film.genre}</Text>
                <Box width="200px" pt="20px">
                    <Text>"{film.description}"</Text>
                </Box>
            </VStack>

            {film.watched ? (
                <Text position={"absolute"} bottom={"5"} left="5">Watched</Text>
            ) : (
                <Text position={"absolute"} bottom={"5"} left="5">Not watched</Text>
            )}


            <Box position={"absolute"} bottom={"5"} right="5">
                <Button width={8} height={8} mr={2} colorScheme="teal" variant={"outline"}
                    onClick={() => getReview(film.id)} >
                    ⭐
                </Button>
                {isOwner && isOwner.libraryId == props.lib_id ? (
                    <Button width={8} height={8} colorScheme="teal" variant={"outline"}
                        onClick={() => props.deleteCurrentFilm(film.id)}>
                        ❌
                    </Button>
                ) : (
                    <Box />
                )}
            </Box>

        </Box>
    )

    return (
        <Box>
            <FilmReviewModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} filmId={filmId} lib_id={props.lib_id}
                filmReview={filmReview} loading={loading} recieveReviewData={recieveReviewData} closeModal={closeModal}
                setShouldEditModal={setShouldEditModal} shouldEditModal={shouldEditModal} isOwner={isOwner} deleteFilmReview={deleteFilmReview}/>
            <InputGroup pb={5}>
                <InputLeftAddon children='🔍' />
                <Input placeholder='keyword (director, title, genre)' onChange={handleInput} mr={10} />
                <XMLExport data={filmState} fileName={"films" + Date.now()} />
            </InputGroup>
            <SimpleGrid spacing='40px' columns={{ sm: 2, md: 3 }}>
                {gridFilms}
            </SimpleGrid>
        </Box>
    );
}