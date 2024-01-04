import './App.css';
import { app } from "./Firebase";
import { useEffect, useState } from 'react';
import { Box, Container, VStack, Button, Input, HStack } from '@chakra-ui/react';
import Message from './Components/Message';
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot} from "firebase/firestore";
const loginHandler = ()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup( auth, provider)
}
const logoutHandler =()=> signOut(auth);
  const auth = getAuth(app);
  const  db = getFirestore(app);
function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const submitHandler = async (e)=>{
    e.preventDefault();
    try {
      await addDoc(collection(db , "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp()
      });
      setMessage("");
    } catch (error) {
      console.error("Firestore Error:", error);
      alert(error.message); // Display the error message
    }
  }
  useEffect(() => {
    const unSubscribeForMessage = onSnapshot(collection(db, "Messages") , (snap)=>{
      setMessages(snap.docs.map((item) => {
        const id = item.id;
        return{id, ...item.data()}
      }));
    });
    const unSubscribe = onAuthStateChanged(auth, (data)=>{
      setUser(data);
    });
    return()=>{
      unSubscribe();
      unSubscribeForMessage();
    };
  });
  
  return (
    <Box bg={"red.50"}>
    { user ? ( <Container h={"100vh"} bg={"white"}>
      <VStack h="full" padding={"4"}>
        <Button onClick={logoutHandler} w={"full"} colorScheme={"red"}>Logout</Button>
        <VStack background={"white"} h="full" w={"full"} overflowY={"auto"} >
        {
          messages.map((item) => (
          <Message key={item.id} user={ item.uid === user.uid ? "me" : "other"} text={item.text} uri={item.uri}/>
        ))
        }
        </VStack>
        <form onSubmit={submitHandler} style={{width:"100%"}}>
        <HStack h="full" w={"full"}>
        <Input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter a Message'/>
        <Button  type='submit' colorScheme={"purple"}>Send</Button>
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
