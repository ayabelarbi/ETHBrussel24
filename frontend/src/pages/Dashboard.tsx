// create the component 
import { Box, Heading } from '@chakra-ui/react';
import MintButton from '../components/mintButton';
import FlareData from '../components/FlareData';

const Dashboard = () => {
  return (
    <Box>
      <Heading>Dashboard</Heading>
      <MintButton />

      <FlareData />
    </Box>
  );
};

export default Dashboard;