import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,  ModalFooter} from '@chakra-ui/react';

function CustomModal(props) {
  
    return (
      <>  
        <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {props.content}
            </ModalBody>
            <ModalFooter>
              <Button onClick={props.confirmDelete} mr={5} colorScheme="red">Yes</Button>
              <Button onClick={props.rejectDelete}>No</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default CustomModal;