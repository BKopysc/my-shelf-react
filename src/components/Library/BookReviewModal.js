import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, HStack,
    Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DataService from '../../services/data.service';
import EditBookReviewForm from '../Forms/EditBookReviewForm';
function BookReviewModal(props) {


    const [review, setReview] = useState();
    const [shouldEdit, setShouldEdit] = useState(false);

    return (
        <>
            <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    {props.loading ? (
                        <Button isLoading={true}></Button>
                    ) : (
                        <div>
                            {(!props.bookReview.title || props.shouldEditModal) && props.isOwner ? (
                                <div>
                                    {!props.bookReview.title ? (
                                        <ModalHeader>Create review</ModalHeader>
                                    ) : (
                                        <ModalHeader>Edit review</ModalHeader>
                                    )}
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <EditBookReviewForm review={props.bookReview} lib_id={props.lib_id} bookId={props.bookId}
                                            recieveReviewData={props.recieveReviewData} />
                                    </ModalBody>
                                    <ModalFooter>
                                    </ModalFooter>
                                </div>
                            ) : (
                                <div>
                                    <ModalHeader>{props.bookReview.title}</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        {!props.isOwner && !props.bookReview.title ?
                                            (
                                                <div>
                                                    There isn't any review
                                                </div>
                                            )
                                            : (
                                                <VStack alignItems={"flex-start"}>
                                                    <Text textAlign={"left"} fontWeight={"bold"}>Opinion:</Text>
                                                    <Text>{props.bookReview.text}</Text>
                                                    <HStack>
                                                        <Text fontWeight={"bold"}>Score: </Text>
                                                        <Text>{props.bookReview.score} ???</Text>
                                                    </HStack>
                                                    <HStack>
                                                        <Text fontWeight={"bold"}>Time to read: </Text>
                                                        <Text>About {props.bookReview.timeToRead} (hours)</Text>
                                                    </HStack>
                                                    <HStack>
                                                        {props.bookReview.shouldRead ? (
                                                            <Text>Recommended ??????</Text>
                                                        ) : (
                                                            <Text>Not recommended ???</Text>
                                                        )}
                                                    </HStack>
                                                </VStack>
                                            )}


                                    </ModalBody>

                                    <ModalFooter>
                                        <Button mr={5} onClick={() => { props.setShouldEditModal(false); props.closeModal() }} >Close</Button>
                                        {props.isOwner ? (
                                            <div>
                                                <Button colorScheme="teal" mr={5} onClick={() => props.setShouldEditModal(true)}>Edit</Button>
                                                <Button colorScheme="red" onClick={() => props.deleteBookReview(props.bookId)}>Delete</Button>
                                            </div>
                                        ) : (<div />)}

                                    </ModalFooter>
                                </div>
                            )}
                        </div>
                    )}

                </ModalContent>
            </Modal >
        </>
    )
}

export default BookReviewModal;