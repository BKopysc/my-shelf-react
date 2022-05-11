
import { Box, Heading, Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import DataService from "../services/data.service";

function Profile() {

        const currentUser = AuthService.getCurrentUser();

    return (
        <Box>

            {currentUser ?
                (<Box>
                    <Heading></Heading>
                    <Heading>Hi {currentUser.username}</Heading>
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