import { useToast } from "@chakra-ui/react"


const makeSuccToast = (toastInfo, toast) => {
    toast({
        title:  toastInfo ,
        description: 'Check your library!',
        status: 'success',
        duration: 3000,
        isClosable: true,
    })
}

const GlobalToast = {
    makeSuccToast
  };
  export default GlobalToast;