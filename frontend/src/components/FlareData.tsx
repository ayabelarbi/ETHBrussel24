import { Box, Heading } from '@chakra-ui/react';

interface FlareDataParams {
  wrappedAmount: number,
  totalTransactions: number,
  score: number
  loading: boolean
  error: any
}

export default function FlareData({
  wrappedAmount,
  totalTransactions,
  loading,
  error,
  score
}: FlareDataParams) {

  return (
    <Box>
      <Heading>Flare Data</Heading>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error?.message}</p>}

      {!loading && !error &&
        <div>
          <p>Wrapped Amount: {wrappedAmount} C2FLR</p>
          <p>Total Transactions: {totalTransactions}</p>
          <p>Chain Score: {score}</p>
        </div>
      }
    </Box>
  );
}