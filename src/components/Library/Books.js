import {
    Box, Heading, Alert, AlertIcon, VStack, HStack, Flex, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Button,
    InputGroup, InputLeftAddon, Input, SimpleGrid, Text, useDisclosure, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import XMLExport from "../Tools/XMLExport";
import { makeSuccessToast } from "../Tools/GlobalToast";
import BookReviewModal from "./BookReviewModal";
import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";



export default function Books(props) {

    const [searchInput, setSearchInput] = useState();
    const [bookState, setBookState] = useState(props.userBooks);
    const [bookId, setBookId] = useState();
    const [bookReview, setBookReview] = useState(undefined);
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

    function recieveReviewData(lib_id, book_id) {
        if (true) {
            DataService.getBookReview(lib_id, book_id).then(response => {
                if (response.data.title == null) {
                    response.data.title = "";
                    response.data.text = ""
                }
                setBookReview(response.data);
                setShouldEditModal(false);
                setLoading(false);
                console.log(response.data);
            })
                .catch(e => {
                    alert(e);
                })
        }
    }

    function deleteBookReview(bookId){
        if (true) {
            DataService.deleteBookReview(props.lib_id, bookId).then(response => {
                onClose();
                makeToast("Book review deleted!");
            })
                .catch(e => {
                    alert(e);
                })
        }
}

    function getReview(id) {
        setBookId(id);
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
        var currentBooks = props.userBooks;
        var newBooks = [];

        currentBooks.forEach(element => {
            if (element.author.toLowerCase().includes(input_val.toLowerCase())) {
                //console.log(element.author);
                newBooks.push(element);
            }
            else if (element.title.toLowerCase().includes(input_val.toLowerCase())) {
                newBooks.push(element);
            }
            else if (element.genre.toLowerCase().includes(input_val.toLowerCase())) {
                newBooks.push(element);
            }
        });
        //console.log(input_val);
        console.log(JSON.stringify(newBooks));
        setBookState(newBooks);
    }

    const mappedBooks = bookState.map((book) =>
        <Tr>
            <Td fontSize={'xl'}>{book.title}</Td>
            <Td>{book.author}</Td>
            <Td>{book.genre}</Td>
            <Td>{book.description}</Td>
            {book.read ? (
                <Td>Yep!</Td>
            ) : (
                <Td>Not yet</Td>
            )}
            <Td>
                <Box>
                    <Button mr={5}>Edit</Button>
                    <Button>Delete</Button>
                </Box>
            </Td>
        </Tr>
    );

    const test = [1, 2, 3, 4, 5, 6]
    const gridBooks = bookState.map((book) =>
        <Box backgroundColor="#e6f2ee" border={"1px"} borderColor={"teal"} rounded={"lg"} width="260px" height='300px' position={"relative"}>
            <Text position={"absolute"} top="2" left="2">📕</Text>
            {isOwner && isOwner.libraryId == props.lib_id ? (
                <Box position={"absolute"} top="2" right="2">
                    <Button width={5} height={8} mr={2} variant={"outline"} colorScheme="teal"
                        as={RouterLink} to={`/library/${props.lib_id}/edit-book/${book.id}`}>
                        ✏️
                    </Button>
                </Box>
            ) : (
                <Box>
                </Box>
            )}

            <VStack mt={5}>
                <Text fontSize={20} fontWeight={"bold"} width="150px">{book.title}</Text>
                <Text width="200px">{book.author}</Text>
                <Text fontStyle={"italic"}>{book.genre}</Text>
                <Box width="200px" pt="20px">
                    <Text>"{book.description}"</Text>
                </Box>
            </VStack>

            {book.read ? (
                <Text position={"absolute"} bottom={"5"} left="5">Read</Text>
            ) : (
                <Text position={"absolute"} bottom={"5"} left="5">Not Read</Text>
            )}


            <Box position={"absolute"} bottom={"5"} right="5">
                <Button width={8} height={8} mr={2} colorScheme="teal" variant={"outline"}
                    onClick={() => getReview(book.id)} >
                    ⭐
                </Button>
                {isOwner && isOwner.libraryId == props.lib_id ? (
                    <Button width={8} height={8} colorScheme="teal" variant={"outline"}
                        onClick={() => props.deleteCurrentBook(book.id)}>
                        ❌
                    </Button>
                ) : (
                    <Box />
                )}
            </Box>

        </Box>
    )

    //console.log(props.userBooks[0].read);

    return (
        <Box>
            <BookReviewModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} bookId={bookId} lib_id={props.lib_id}
                bookReview={bookReview} loading={loading} recieveReviewData={recieveReviewData} closeModal={closeModal}
                setShouldEditModal={setShouldEditModal} shouldEditModal={shouldEditModal} isOwner={isOwner} deleteBookReview={deleteBookReview}/>
            <InputGroup pb={5}>
                <InputLeftAddon children='🔍' />
                <Input placeholder='keyword (author, title, genre)' onChange={handleInput} mr={10} />
                <XMLExport data={bookState} fileName={"books" + Date.now()} />
            </InputGroup>
            <SimpleGrid spacing='40px' columns={{ sm: 2, md: 4 }}>
                {gridBooks}
            </SimpleGrid>
        </Box>
    );
}