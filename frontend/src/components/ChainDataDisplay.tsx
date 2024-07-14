import { CHAIN_TO_ID, CHAIN_TO_SC_ADDRESS } from '../globals';
import {
  Card,
  CardHeader,
  CardBody,
  Box,
  Text,
  Stack,
  Heading,
  StackDivider,
  CardFooter
} from '@chakra-ui/react';
import MintButton from './MintButton';

interface ChainDataParams {
  address: `0x${string}` | undefined,
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
  address,
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
          <>
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
            <CardFooter>
              <MintButton
                address={address}
                totalScore={score}
                chainId={CHAIN_TO_ID[chainName.toLocaleLowerCase()]}
                contractAddress={CHAIN_TO_SC_ADDRESS[chainName.toLocaleLowerCase()]}
              />
            </CardFooter>
          </>
        )
      }
    </Card>
  );
}