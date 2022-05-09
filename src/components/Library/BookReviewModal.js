import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DataService from '../../services/data.service';
import EditBookReviewForm from '../Forms/EditBookReviewForm';
function BookReviewModal(props) {


    const [review, setReview] = useState();
    //const [loading, setLoading] = useState(true);

    // function recieveData() {
    //     if (true) {
    //         DataService.getBookReview(props.lib_id, props.bookId).then(response => {
    //             setReview(response.data);
    //             setLoading(false);
    //             console.log(response.data);
    //         })
    //             .catch(e => {
    //                 alert(e);
    //             })
    //     }
    // }


    return (
        <>
            <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    {props.loading ? (
                        <Button isLoading={true}></Button>
                    ) : (
                        <div>
                            {!props.bookReview.title ? (
                                <div>
                                    <ModalHeader>Create review</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <EditBookReviewForm review={props.bookReview}/>
                                    </ModalBody>
                                </div>
                            ) : (
                                <div>
                                    <ModalHeader>{props.bookReview.title}</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        {props.bookReview.text}
                                    </ModalBody>
                                </div>
                            )}

                            <ModalFooter>
                                <Button mr={5} colorScheme="red">Close</Button>
                                <Button>Edit</Button>
                            </ModalFooter>
                        </div>
                    )}

                </ModalContent>
            </Modal >
        </>
    )
}

export default BookReviewModal;