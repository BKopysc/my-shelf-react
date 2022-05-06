import { Box, Heading, Alert, AlertIcon, VStack, HStack,Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import DataService from "../services/data.service";

function Library(props) {

    const [books, setBooks] = useState([]);
    const [privacy, setPrivacy] = useState();

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

    const mappedBooks = books.map((book) =>
            <Flex alignItems={'center'} justifyContent={'center'} mb={5}>
                <HStack>
                    <Box>
                <p>{book.title}</p>
                </Box>
                <Box>
                <p>{book.author}</p>
                </Box>
                <Box>
                <p>{book.description}</p>
                </Box>
                </HStack>

            </Flex>
        );

    useEffect(() => {
        retrieveLibrary();
    }, []);

    return (
        <Box>
            {currentUser ?
                (<Box>
                    <Heading></Heading>
                    <Heading>Library</Heading>
                    <Box mt={10}>
                    {mappedBooks}
                    </Box>
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