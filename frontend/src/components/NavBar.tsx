import { Flex, Text, Button } from '@chakra-ui/react';

import { usePrivy } from '@privy-io/react-auth';
import { useAccount, useDisconnect } from 'wagmi';

import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const { authenticated, logout } = usePrivy();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {

    // if privy is authenticated, logout
    if (authenticated){
     logout();
    } else if (isConnected){
      disconnect();
    }

    navigate('/'); // navigate to the home page
}

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" borderColor='purple' borderBottom='1px solid' color="yellow.500">
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
            BUZZ
        </Text>
      </Flex>

      <Button display="flex" alignItems="center" onClick={handleLogout}>
        <Text>Logout</Text>
      </Button>

    </Flex>
  );
};

export default Navbar;