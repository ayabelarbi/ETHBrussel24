import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useAccount } from "wagmi";
import ConnectionCard from "./ConnectionCard";
import videoBg from "../assets/bg.mp4";
import buzzHome from "../assets/BUZZ.gif";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected } = useAccount();

  const [isSuccess, setIsSuccess] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isSuccess || isConnected) {
        console.log('isSuccess', isSuccess);
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
          <Image src={buzzHome} alt="BUZZ" height="60%" />

          <Button onClick={connect}>Get Started</Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
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
