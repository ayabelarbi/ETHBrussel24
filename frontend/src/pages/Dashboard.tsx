// create the component 
import { Box, Heading } from '@chakra-ui/react';
import MintButton from '../components/mintButton';

const Dashboard = () => {
  return (
    <Box>
      <Heading>Dashboard</Heading>
      <MintButton />
    </Box>
  );
};

export default Dashboard;