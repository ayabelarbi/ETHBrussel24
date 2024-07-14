import { Box, Flex, Heading } from '@chakra-ui/react';
import ChainData from '../components/ChainData';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Box flex="1">
        <Heading>Dashboard</Heading>
        <ChainData />
      </Box>
      <Footer />
    </Flex>
  );
};

export default Dashboard;