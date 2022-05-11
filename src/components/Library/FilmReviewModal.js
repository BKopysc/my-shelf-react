import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, HStack,
    Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DataService from '../../services/data.service';
import EditFilmReviewForm from '../Forms/EditFilmReviewForm';
function FilmReviewModal(props) {

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
                            {(!props.filmReview.title || props.shouldEditModal) && props.isOwner ? (
                                <div>
                                    {!props.filmReview.title ? (
                                        <ModalHeader>Create review</ModalHeader>
                                    ) : (
                                        <ModalHeader>Edit review</ModalHeader>
                                    )}
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <EditFilmReviewForm review={props.filmReview} lib_id={props.lib_id} filmId={props.filmId}
                                            recieveReviewData={props.recieveReviewData} />
                                    </ModalBody>
                                    <ModalFooter>
                                    </ModalFooter>
                                </div>
                            ) : (
                                <div>
                                    <ModalHeader>{props.filmReview.title}</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        {!props.isOwner && !props.filmReview.title ?
                                            (
                                                <div>
                                                    There isn't any review
                                                </div>
                                            )
                                            : (
                                                <VStack alignItems={"flex-start"}>
                                                    <Text textAlign={"left"} fontWeight={"bold"}>Opinion:</Text>
                                                    <Text>{props.filmReview.text}</Text>
                                                    <Text textAlign={"left"} fontWeight={"bold"}>Best actor:</Text>
                                                    <Text>{props.filmReview.bestActor}</Text>
                                                    <HStack>
                                                        <Text fontWeight={"bold"}>Score: </Text>
                                                        <Text>{props.filmReview.score} ⭐</Text>
                                                    </HStack>
                                                    <HStack>
                                                        <Text fontWeight={"bold"}>Camera score: </Text>
                                                        <Text>{props.filmReview.cameraScore} ⭐</Text>
                                                    </HStack>
                                                    <HStack>
                                                        <Text fontWeight={"bold"}>Play score: </Text>
                                                        <Text>{props.filmReview.playScore} ⭐</Text>
                                                    </HStack>
                                                    <HStack>
                                                        {props.filmReview.shouldWatch ? (
                                                            <Text>Recommended ✔️</Text>
                                                        ) : (
                                                            <Text>Not recommended ❌</Text>
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
                                                <Button colorScheme="red" onClick={() => props.deleteFilmReview(props.filmId)}>Delete</Button>
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

export default FilmReviewModal;