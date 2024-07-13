import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";


import ConnectionCard from "./ConnectionCard";
import videoBg from "../assets/bg.mp4";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSuccess, setIsSuccess] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard'); 
    }
  }, [isSuccess, navigate]);


  const connect = async () => {
    console.log("connect");
    onOpen();
  };

  return (
    <>
      <Box
        position="relative"
        height="100vh"
        width="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
        <Box position="relative" zIndex="2" textAlign="center">
          <Heading>Home</Heading>
          <Text>Welcome to Trust Score, The Reputation Layer for Web3</Text>
          <Button onClick={connect}>Get Started</Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          sx={{
            backdropFilter: "blur(10px)",
          }}
        />
        <ModalContent
          bg="black"
          color="white"
          sx={{
            backdropFilter: "blur(2px)",
          }}
        >
          <ModalCloseButton />
          <ModalBody>
          <ConnectionCard setIsSuccess={setIsSuccess} />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
