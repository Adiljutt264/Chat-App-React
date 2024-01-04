import './App.css';
import { Box, Container, VStack, Button, Input, HStack } from '@chakra-ui/react';
import Message from './Components/Message';
function App() {
  return (
    <Box bg={"red.50"}>
      <Container h={"100vh"} bg={"white"}>
      <VStack h="full" padding={"4"}>
        <Button w={"full"} colorScheme={"red"}>Logout</Button>
        <VStack background={"white"} h="full" w={"full"} overflowY={"auto"} >
        <Message text={"Sample Text"}/>
        <Message user="me" text={"Sample text two"}/>
        <Message text={"Sample Text three"}/>
        <Message text={"Sample Text three"}/>
        <Message text={"Sample Text three"}/>
        <Message user="me" text={"Sample text two"}/>
        <Message user="me" text={"Sample text two"}/>
        <Message user="me" text={"Sample text two"}/>
        </VStack>
        <form style={{width:"100%"}}>
        <HStack h="full" w={"full"}>
        <Input placeholder='Enter a Message'/>
        <Button colorScheme={"purple"}>Send</Button>
        </HStack>
        </form>
      </VStack>
      </Container>
    </Box>
  );
}

export default App;
