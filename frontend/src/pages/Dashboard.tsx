// create the component 
import { Box, Heading } from '@chakra-ui/react';
import ChainData from '../components/ChainsData';

const Dashboard = () => {


  return (
    <Box>
      <Heading>Dashboard</Heading>
      <ChainData />
    </Box>
  );
};

export default Dashboard;