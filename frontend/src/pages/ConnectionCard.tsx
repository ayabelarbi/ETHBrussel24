import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Divider,
  Center,
} from "@chakra-ui/react";

import { useConnect, useAccount } from 'wagmi';

import { usePrivy } from "@privy-io/react-auth";

import { zeroNetworktestnet } from "../lib/wagmi";
import { scrollSepolia, flareTestnet, morphHolesky } from 'viem/chains';

import web3AuthInstance from "../hooks/connectWithWeb3Auth";
interface ConnectionCardProps {
  setIsSuccess: (value: boolean) => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ setIsSuccess }) => {
  const { login, authenticated, user } = usePrivy();

  const { isConnected } = useAccount();
  const { connect } = useConnect();

  const connectPrivy = () => {
    login();
    if (authenticated) {
      setIsSuccess(true);
      console.log('user', user);
    }
  };

  const connectWeb3Auth = () => {
    console.log("Connecting to Web3Auth");
    setIsSuccess(false);

    const connectorInstance = web3AuthInstance([zeroNetworktestnet, scrollSepolia, flareTestnet, morphHolesky]);

    connect({
      connector: connectorInstance
    }
    )
    if (isConnected) {
      setIsSuccess(true);
    }
  };

  const connectDynamic = () => {
    console.log("Connecting to Dynamic");
    setIsSuccess(false);
  };

  const connectWorldcoin = () => {
    console.log("Connecting to Worldcoin");
    setIsSuccess(false);
  };
  return (
    <Flex p="5" borderRadius="md" marginTop={5} align="stretch">
      <VStack flex="1" mr="5" align="stretch" spacing="4">
        <Heading size="md">Select Provider</Heading>
        <Button onClick={connectPrivy}>Privy</Button>
        <Button onClick={connectWeb3Auth}>Web3Auth</Button>
        <Button onClick={connectDynamic}>Dynamic</Button>
        <Button onClick={connectWorldcoin}>Worldcoin</Button>
      </VStack>

      <Center>
        <Divider orientation="vertical" />
      </Center>

      <Box flex="2" ml="5">
        <Heading size="md">Connect your wallet</Heading>
        <Text mt="2">
          By connecting your wallet, you agree to our Terms of Service and our
          Privacy Policy.
        </Text>
      </Box>
    </Flex>
  );
};

export default ConnectionCard;
