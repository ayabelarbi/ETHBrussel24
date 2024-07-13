import { useFlareData } from '../hooks/fetchBlockchainData';
import { Box, Heading } from '@chakra-ui/react';
import { computeDefaultScoreChain, convertWeiToEther } from '../utils/score';

export default function FlareData() {
  const { wrappedAmount, totalTransactions, loading, error } = useFlareData();

  return (
    <Box>
      <Heading>Flare Data</Heading>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error?.message}</p>}

      {!loading && !error &&
        <div>
          <p>Wrapped Amount: {convertWeiToEther(wrappedAmount)} C2FLR</p>
          <p>Total Transactions: {totalTransactions}</p>
          <p>Chain Score: {computeDefaultScoreChain(wrappedAmount, totalTransactions)}</p>
        </div>
      }
    </Box>
  );
}