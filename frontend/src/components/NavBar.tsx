// Navbar.tsx
import { Box, Flex, Text, Button, useColorMode } from '@chakra-ui/react';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" borderColor='purple' borderBottom='1px solid' color="yellow.500">
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
            BUZZ
        </Text>
      </Flex>

      <Box display="flex" alignItems="center">
        <Text>WALLET ADRESS</Text>
      </Box>
    </Flex>
  );
};

export default Navbar;