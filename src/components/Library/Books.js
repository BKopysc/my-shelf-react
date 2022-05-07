import { Box, Heading, Alert, AlertIcon, VStack, HStack, Flex, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Button ,
InputGroup, InputLeftAddon, Input} from "@chakra-ui/react";
import { useState } from "react";

export default function Books(props) {

    const [searchInput, setSearchInput] = useState();
    const [bookState, setBookState] = useState(props.userBooks);

    function handleInput(event) {
        var input_val = event.target.value;
        setSearchInput(event.target.value);
        var currentBooks = props.userBooks;
        var newBooks = [];

        currentBooks.forEach(element => {
            if(element.author.toLowerCase().includes(input_val.toLowerCase())){
                //console.log(element.author);
                newBooks.push(element);
            }
            else if(element.title.toLowerCase().includes(input_val.toLowerCase())){
                newBooks.push(element);
            }
            else if(element.genre.toLowerCase().includes(input_val.toLowerCase())){
                newBooks.push(element);
            }
        });
        //console.log(input_val);
        console.log(newBooks);
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

    //console.log(props.userBooks[0].read);

    return (
        <Box>
            <InputGroup pb={5}>
                <InputLeftAddon children='🔍' />
                <Input placeholder='keyword (author, title, genre)' onChange={handleInput} />
                <Button colorScheme={'blue'} ml={10}>Export results</Button>
            </InputGroup>

            <TableContainer>
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
            </TableContainer>
        </Box>
    );
}