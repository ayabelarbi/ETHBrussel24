import { Card, CardHeader, CardBody, Box, Text, Stack, Heading, StackDivider } from '@chakra-ui/react';

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
    <Card variant="filled">
      <CardHeader>
        <Heading size='md'>{chainName} data</Heading>
      </CardHeader>

      {
        loading && <Box minH={200} alignContent="center" alignItems="center"><Text align='center'>Loading...</Text></Box>
      }

      {
        error && <Box minH={200}><Text>Error: {error.message}</Text></Box>
      }

      {
        !loading && !error && (
          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Wrapped Amount
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {wrappedAmount} {chainTiker}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Total Transactions
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {totalTransactions} transactions
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Number NFTs
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {NFTCount} NFTs
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Chain Score
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {Math.round(score)}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        )
      }
    </Card>
  );
}