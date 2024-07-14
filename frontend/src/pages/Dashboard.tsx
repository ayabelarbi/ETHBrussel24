import { Box, Flex } from '@chakra-ui/react';
import ChainData from '../components/ChainsData';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Box flex="1" px='16' py='4'>
        <ChainData />
      </Box>
      <Footer />
    </Flex>
  );
};

export default Dashboard;