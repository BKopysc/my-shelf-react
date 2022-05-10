import { Heading } from "@chakra-ui/react";
import AuthService from "../services/auth.service";


const Home = () => {
    var user = AuthService.getCurrentUser();
    return (
        <div>
         <Heading mt={10}>Welcome to Library - Review App !</Heading>
            {user ? (
                <Heading mt={10} fontWeight={"normal"}>check your library</Heading>
            ) : (
                <Heading mt={10} fontWeight={"normal"}>please login or signup</Heading>
            )}

            
        </div>
    );
}

export default Home;