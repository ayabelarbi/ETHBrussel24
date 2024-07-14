import { Flex, Text, Button } from '@chakra-ui/react';
import { usePrivy } from '@privy-io/react-auth';
import { useAccount, useDisconnect } from 'wagmi';

import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const { authenticated, logout } = usePrivy();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = async () => {

    // if privy is authenticated, logout
    if (authenticated) {
      await logout();
    } else if (isConnected) {
      await disconnect();
    }

    navigate('/'); // navigate to the home page
  }

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" borderColor='purple' borderBottom='1px solid' color="yellow.500">
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
          BUZZ
        </Text>
        <img src="https://img.icons8.com/emoji/48/000000/honeybee.png"/>
      </Flex>

      <Button display="flex" alignItems="center" onClick={handleLogout}>
        <Text>Logout</Text>
      </Button>

    </Flex>
  );
};

export default Navbar;