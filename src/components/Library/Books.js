import {
    Box, Heading, Alert, AlertIcon, VStack, HStack, Flex, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Button,
    InputGroup, InputLeftAddon, Input, SimpleGrid, Text
} from "@chakra-ui/react";
import { useState } from "react";
import XMLExport from "../Tools/XMLExport";



export default function Books(props) {

    const [searchInput, setSearchInput] = useState();
    const [bookState, setBookState] = useState(props.userBooks);

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

    function exportData() {




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
        <Box backgroundColor="#e6f2ee" border={"1px"} borderColor={"teal"} rounded={"lg"} width="250px" height='300px' position={"relative"}>
            <Box position={"absolute"} top="2" right="2">
                <Button width={5} height={8} mr={2} variant={"ghost"} colorScheme="teal">
                    ✏️
                </Button>
            </Box>

            <VStack mt={5}>
                <Text fontSize={20} fontWeight={"bold"} width="200px">{book.title}</Text>
                <Text width="200px">{book.author}</Text>
                <Text fontStyle={"italic"}>{book.genre}</Text>
                <Box width="200px" pt="20px">
                    <Text>"{book.description}"</Text>
                </Box>
            </VStack>
            <Text position={"absolute"} bottom={"5"} left="5">
                {book.read ? (
                    <p>Read</p>
                ) : (
                    <p>Not read</p>
                )}
                
                </Text>
            <Box position={"absolute"} bottom={"5"} right="5">
                <Button width={8} height={8} mr={2} colorScheme="teal">
                    ⭐
                </Button>
                <Button width={8} height={8} colorScheme="teal">
                    ❌
                </Button>
            </Box>

        </Box>
    )

    //console.log(props.userBooks[0].read);

    return (
        <Box>
            <InputGroup pb={5}>
                <InputLeftAddon children='🔍' />
                <Input placeholder='keyword (author, title, genre)' onChange={handleInput} mr={10} />
                <XMLExport data={bookState} fileName={"books" + Date.now()} />
            </InputGroup>
            <SimpleGrid spacing='40px' columns={{ sm: 2, md: 4 }}>
                {gridBooks}
            </SimpleGrid>
            {/* <TableContainer>
                <Table colorScheme='teal' size='md'>
                    <TableCaption>Books collection</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Title</Th>
                            <Th>Author</Th>
                            <Th>Genre</Th>
                            <Th>Description</Th>
                            <Th>Is read?</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {mappedBooks}
                    </Tbody>
                </Table>
            </TableContainer> */}
        </Box>
    );
}