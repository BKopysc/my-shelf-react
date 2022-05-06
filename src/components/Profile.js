
import { Box, Heading, Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import DataService from "../services/data.service";

function Profile() {

    // const [content, setContent] = useState("");
    // useEffect(() => {
    //   UserService.getUserBoard().then(
    //     (response) => {
    //       setContent(response.data);
    //     },
    //     (error) => {
    //       const _content =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString();
    //       setContent(_content);
    //     }
    //   );
    // }, []);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
    },[])



    return (
        <Box>

            {currentUser ?
                (<Box>
                    <Heading></Heading>
                    <Heading>Profile!</Heading>
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

export default Profile;