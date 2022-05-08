import { Box, Heading, Alert, AlertIcon, VStack, HStack, Flex, Tabs, TabList, Tab, TabPanel, TabPanels, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import DataService from "../services/data.service";
import Books from "./Library/Books";

function Library(props) {

    const [books, setBooks] = useState([]);
    const [films, setFilms] = useState([]);
    const [privacy, setPrivacy] = useState();

    let navigate = useNavigate();
    var currentUser = AuthService.getCurrentUser();

    const retrieveLibrary = () => {
        if (currentUser) {
            DataService.getUserLibrary().then(response => {
                setBooks(response.data.books);
                setPrivacy(response.data.isPrivate);
                console.log(response.data.books);
            })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    const addBook = () =>{
        navigate("/books/new");
    }

    const addFilm = () => {
        navigate("/films/new");
    }

    useEffect(() => {
        retrieveLibrary();
    }, []);

    return (
        <Box>
            {currentUser ?
                (<Box>
                    <Heading mt={5}>Library</Heading>
                    {/* <Box mt={10}>
                        {mappedBooks}
                    </Box> */}
                    <Tabs ml={10} mr={10}>
                        <TabList>
                            <Tab>Books</Tab>
                            <Tab>Films</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                {books.length > 0 ? (
                                    <Box>
                                        <Box>
                                            <Button colorScheme={"teal"} onClick={addBook}>+ Add new book</Button>
                                        </Box>
                                        <Box mt={10} ml={20} mr={20}>
                                            <Books userBooks={books} />
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box mt={10}>
                                        <Text fontSize={"25"} fontStyle={"italic"} fontWeight={"light"}>A room without books is like a body without a soul</Text>
                                        <Box mt={5}>
                                        <Button colorScheme={"teal"} fontSize={"15"} onClick={addBook}>+ Add new 📕 ! </Button>
                                        </Box>
                                    </Box>
                                )}
                            </TabPanel>
                            <TabPanel>
                            {films.length > 0 ? (
                                    <Box>
                                        <Box>
                                            <Button colorScheme={"teal"}>Add new film</Button>
                                        </Box>
                                        <Box mt={10} ml={20} mr={20}>
                                            <Books userBooks={books} />
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box mt={10}>
                                        <Text fontSize={"25"} fontStyle={"italic"} fontWeight={"light"}>We are the movies and the movies are us</Text>
                                        <Box mt={5}>
                                        <Button colorScheme={"teal"} fontSize={"15"}>+ Add new 🎬 ! </Button>
                                        </Box>
                                    </Box>
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>)
                :
                (
                    <Box>
                        <Alert status="error">
                            <AlertIcon />
                            You don't have access to this page!
                        </Alert>
                    </Box>
                )}
        </Box>
    );

}

export default Library;