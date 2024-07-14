// Footer.tsx
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" role="contentinfo" mx="auto" py="5" px={{ base: '4', md: '8' }} borderTop='1px solid' color="white" textAlign="center" width="100%">
      <Text>&copy; {new Date().getFullYear()} Buzz. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;