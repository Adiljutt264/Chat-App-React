import './App.css';
import { Box, Container, VStack, Button, Input, HStack } from '@chakra-ui/react';
import Message from './Components/Message';
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./Firebase";
import { useEffect, useState } from 'react';
const loginHandler = ()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup( auth, provider)
}
  const auth = getAuth(app);
function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (data)=>{
      console.log(data);
    })
    return () => {
    
    }
  }, [])
  
  return (
    <Box bg={"red.50"}>
    {user? ( <Container h={"100vh"} bg={"white"}>
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
      </Container>) : <VStack bg={"white"} h={"100vh"} justifyContent={"center"} alignItems={"center"}> 
      <Button onClick={loginHandler} colorScheme={"purple"}> Sign in with Google</Button></VStack>
      }
    </Box>
  );
}

export default App;
