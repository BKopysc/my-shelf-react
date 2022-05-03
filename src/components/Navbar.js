import { MdMenu, MdClose, MdAdd } from "react-icons/md";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import {
    Heading,
    Text,
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    textDecoration,
} from '@chakra-ui/react';
import AuthService from "../services/auth.service";


const Links = [];

function Navbar(props) {
    let navigate = useNavigate();
    const user = AuthService.getCurrentUser();

    const logOut = () => {
        AuthService.logout();
        navigate("/");
        window.location.reload(true);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding={4}
            bg="teal.500"
            color="white"
            {...props}
        >
            <Flex align="center" mr={5}>
                <Heading as="h1" size="md" letterSpacing={"tighter"}>
                    <Link as={RouterLink} to={"/"}>
                        MyShelf
                    </Link>
                </Heading>
            </Flex>

            <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
                <MdMenu />
            </Box>

            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                ml={{ base: 0, md: 6 }}
                alignItems="center"
                flexGrow={1}
                mt={{ base: 4, md: 0 }}
                spacing={{ base: 3, md: 7 }}
                mb={{ base: 5, md: 0 }}
            >
                <Box>
                    <Link as={RouterLink} to={"/contact"}>
                        Contact
                    </Link>
                </Box>
                <Box>
                    <Link as={RouterLink} to={"/help"}>
                        Help
                    </Link>
                </Box>
            </Stack>


            <hr />

            {user ? (
                <Stack
                    direction={{ base: "column", md: "row" }}
                    display={{ base: isOpen ? "block" : "none", md: "flex" }}
                    alignItems="center"
                    width={{ base: "full", md: "auto" }}
                    spacing={{ base: 3, md: 3 }}
                >
                    <Button as={RouterLink} to={"/profile"}
                        variant="outline"
                        width={"100px"}
                        _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                    >
                        Profile
                    </Button>
                    <br />
                    <Button
                        variant="outline"
                        width={"100px"}
                        _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                        onClick={logOut}
                    >
                        Logout
                    </Button>
                </Stack>
            ) : (
                <Stack
                    direction={{ base: "column", md: "row" }}
                    display={{ base: isOpen ? "block" : "none", md: "flex" }}
                    alignItems="center"
                    width={{ base: "full", md: "auto" }}
                    spacing={{ base: 3, md: 3 }}
                >
                    <Button as={RouterLink} to={"/register"}
                        variant="outline"
                        width={"100px"}
                        _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                    >
                        Sign up
                    </Button>
                    <br />
                    <Button as={RouterLink} to={"/login"}
                        variant="outline"
                        width={"100px"}
                        _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                    >
                        Login
                    </Button>
                </Stack>
            )}
        </Flex>
    );
};
export default Navbar;