export const errorToast = (toast: any, message: string) => {
    toast({
      title: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
  
  export const successToast = (toast: any, message: string) => {
    toast({
      title: message,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }
  
  export const infoToast = (toast: any, message: string) => {
    toast({
      title: message,
      status: "info",
      variant: "subtle",
      duration: 5000,
      isClosable: true,
    });
  }