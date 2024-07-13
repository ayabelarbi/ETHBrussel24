import { Box, Heading } from '@chakra-ui/react';

interface ChainDataParams {
  chainName: string,
  chainTiker: string,
  wrappedAmount: number,
  totalTransactions: number,
  NFTCount: number,
  score: number
  loading: boolean
  error: any
}

export default function ChainDataDisplay({
  chainName,
  chainTiker,
  wrappedAmount,
  totalTransactions,
  NFTCount,
  loading,
  error,
  score
}: ChainDataParams) {

  return (
    <Box>
      <Heading>{chainName} Data</Heading>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error?.message}</p>}

      {!loading && !error &&
        <div>
          <p>Wrapped Amount: {wrappedAmount} {chainTiker}</p>
          <p>Total Transactions: {totalTransactions}</p>
          <p>Number NFTs: {NFTCount}</p>
          <p>Chain Score: {Math.round(score)}</p>
        </div>
      }
    </Box>
  );
}