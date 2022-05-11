
import { Box, Heading, Input, InputLeftAddon, InputGroup, Button, VStack, HStack, Text } from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";
import { useState } from "react";
import DataService from "../services/data.service";


export default function FindLibrary() {

    const [searchInput, setSearchInput] = useState();
    const [clean, setClean] = useState(true);
    const [libraryId, setLibraryId] = useState();

    function handleInput(event) {
        var input_val = event.target.value;
        setSearchInput(event.target.value);
        setClean(true);
        console.log(input_val);
    }

    function searchLib(event) {
        DataService.getLibraryIdByUsername(searchInput)
            .then(response => {
                setLibraryId(response.data);
                setClean(false);
            })
            .catch(e => {
                console.log(e);
            })

    }

    return (
        <Box mt={20}>
            <Heading fontWeight={"light"}>
                Find library by username:
            </Heading>
            <VStack display={"flex"} alignContent={"center"} justifyContent={"center"} mt={10} spacing={10}>
                <HStack w="700px">
                    <InputGroup>
                        <InputLeftAddon children='username' />
                        <Input placeholder='example' onChange={handleInput} />
                    </InputGroup>
                    <Button ml={2} colorScheme={"blue"} onClick={searchLib}>
                        🔎
                    </Button>
                </HStack>



                {clean ? (<></>) :
                    (
                        <Box backgroundColor={"gray.100"} rounded={"xl"} w="700px" h="60px" >
                            {libraryId ? (
                                <HStack mt={2} ml={5} display={"flex"} alignContent={"center"} justifyContent={"center"}>
                                    <Text fontWeight={"bold"}>{searchInput}'s library:</Text>
                                    <Button colorScheme={"teal"} ml={20} as={RouterLink} to={`/library/${libraryId}`}>
                                    check it!
                                    </Button>
                                </HStack>
                            ) : (
                                <Box mt={4}>Not found</Box>
                            )}
                        </Box>
                    )
                }





            </VStack >
        </Box >
    );
}