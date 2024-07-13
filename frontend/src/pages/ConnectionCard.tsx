import { Box, Button, Flex, Heading, Text, VStack, Divider } from '@chakra-ui/react';

interface ConnectionCardProps {
    setIsSuccess: (value: boolean) => void;
  }


const ConnectionCard: React.FC<ConnectionCardProps> = ({ setIsSuccess }) => {
 
    const connectPrivy = () => {
        console.log("Connecting to Privy");
        // TODO
        setIsSuccess(false); 
      };
      
      const connectWeb3Auth = () => {
        console.log("Connecting to Web3Auth");
        // TODO
        setIsSuccess(false); 
      };
      
      const connectDynamic = () => {
        console.log("Connecting to Dynamic");
        //  TODO
        setIsSuccess(false);
      };
      
      const connectWorldcoin = () => {
        console.log("Connecting to Worldcoin");
        // TODO
        setIsSuccess(false); 
      };
  return (
    <Flex p="5" borderRadius="md" align="stretch">
      <VStack flex="1" mr="5" align="stretch" spacing="4">
        <Heading size="md">Select Provider</Heading>
        <Button  onClick={connectPrivy}>Privy</Button>
        <Button  onClick={connectWeb3Auth}>Web3Auth</Button>
        <Button  onClick={connectDynamic}>Dynamic</Button>
        <Button  onClick={connectWorldcoin}>Worldcoin</Button>
      </VStack>

      <Divider orientation="vertical" borderColor="gray.500" height="100%"/>

      <Box flex="2" ml="5">
        <Heading size="md">Connect your wallet</Heading>
        <Text mt="2">By connecting your wallet, you agree to our Terms of Service and our Privacy Policy.</Text>
      </Box>
    </Flex>
  );
};

export default ConnectionCard;