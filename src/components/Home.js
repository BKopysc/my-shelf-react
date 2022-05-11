import { Heading, Image, Box, Text, Link, Button, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AuthService from "../services/auth.service";


const Home = () => {
    var user = AuthService.getCurrentUser();
    return (
        <div>
            <Heading mt={10} fontWeight={"normal"}>Welcome to MyShelf !</Heading>
            <Text fontWeight={"thin"} fontSize="20">All your collection in one place!</Text>
            <Box h={50}></Box>
            <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
                <Image src={require('../img/logo.png')} w={300}></Image>
            </Box>

            {user ? (
                <Heading mt={20} textDecoration={"underline"} fontWeight={"light"} as={RouterLink} to={`/library/${user.libraryId}`}>check your library</Heading>
            ) : (
                < HStack mt={10} display={"flex"} justifyContent={"center"} alignContent={"center"} >
            <Button as={RouterLink} to={"/login"} colorScheme={"teal"}>Login</Button>
            <Text>or</Text>
            <Button as={RouterLink} to={"/register"} colorScheme={"teal"}>Sign up</Button>
        </HStack>
    )
}

        </div >
    );
}

export default Home;