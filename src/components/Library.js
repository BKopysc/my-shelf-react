import { Box, Heading, Alert, AlertIcon, VStack, HStack, Flex, Tabs, TabList, Tab, TabPanel, TabPanels, Button, Text, useToast, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from "../services/auth.service";
import DataService from "../services/data.service";
import Books from "./Library/Books";
import GlobalToast from "./Tools/GlobalToast";
import CustomModal from "./Tools/CustomModal";

function Library(props) {

    const [books, setBooks] = useState([]);
    const [films, setFilms] = useState([]);
    const [privacy, setPrivacy] = useState(false);
    const [isOwner, setIsOwner] = useState();
    const [modalTitle, setModalTitle] = useState(false);
    const [modalContent, setModalContent] = useState(false);
    const [idToDelete, setIdToDelete] = useState(undefined);

    const { id } = useParams();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    let navigate = useNavigate();
    var currentUser = AuthService.getCurrentUser();

    const retrieveLibrary = () => {
        var ow = false;
        if (currentUser) {
            if (currentUser.libraryId == id) {
                setIsOwner(true);
                ow = true;
            }
        }
        if (true) {
            DataService.getLibrary(id).then(response => {
                setBooks(response.data.books);
                setPrivacy(response.data.isPrivate);
                console.log(response.data.books);
            })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    const addBook = () => {
        navigate(`/library/${currentUser.libraryId}/new-book`);
    }


    const deleteOneBook = () => {
          DataService.deleteBook(id, idToDelete).then(() => {
            GlobalToast.makeSuccToast("Book deleted!", toast);
            var new_books = books.splice(books.findIndex(function(i){ return i.id === idToDelete;}), 1);
            setBooks(new_books);
            setIdToDelete(undefined);
        },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                    alert(resMessage);
            }
        );
    }

    const confirmDelete = () => {
        onClose();
        deleteOneBook();
    }

    const rejectDelete = () => {
        onClose();
        setIdToDelete(undefined);
    }

    const deleteCurrentBook = (book_id) => {
        onOpen();
        setModalTitle("Delete book")
        setModalContent("Are you sure?")
        setIdToDelete(book_id);
    }

    const addFilm = () => {
        navigate("/films/new");
    }

    useEffect(() => {
        retrieveLibrary();
    }, []);

    return (
        <Box>
            <CustomModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} title={modalTitle} content={modalContent}
            confirmDelete={confirmDelete} rejectDelete={rejectDelete}
            >
            </CustomModal>
            {!privacy ?
                (<Box>
                    
                    <HStack mt={5} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <Heading>Library</Heading>
                    </HStack>
                    <Button mt={2} variant={"outline"} onClick={() => {navigator.clipboard.writeText(window.location.href)}}
                    >Share 🔗</Button>
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
                                        {isOwner ? (
                                            <Box>
                                                <Button colorScheme={"teal"} onClick={addBook}>+ Add new book</Button>
                                            </Box>
                                            ) : (<></>)}
                                        <Box mt={10} ml={20} mr={20}>
                                            <Books userBooks={books} isOwner={isOwner} lib_id={id} deleteCurrentBook={deleteCurrentBook}/>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box mt={10}>
                                        <Text fontSize={"25"} fontStyle={"italic"} fontWeight={"light"}>A room without books is like a body without a soul</Text>
                                        {isOwner ? (
                                        <Box mt={5}>
                                            <Button colorScheme={"teal"} fontSize={"15"} onClick={addBook}>+ Add new 📕 ! </Button>
                                        </Box>
                                        ) : (<></>)}
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