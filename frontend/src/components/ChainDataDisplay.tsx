import { CHAIN_TO_ID, CHAIN_TO_NFT_ADDRESS, CHAIN_TO_STORE_ADDRESS } from '../globals';
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
import StoreButton from './StoreButton';

interface ChainDataParams {
  address: `0x${string}` | undefined,
  chainName: string,
  chainTiker: string,
  wrappedAmount: number,
  totalTransactions: number,
  tokensCount: number,
  score: number,
  totalScore: number,
  loading: boolean,
  error: any,
}

export default function ChainDataDisplay({
  address,
  chainName,
  chainTiker,
  wrappedAmount,
  totalTransactions,
  tokensCount,
  loading,
  error,
  score,
  totalScore
}: ChainDataParams) {

  return (
    <Card variant="filled">
      <CardHeader>
        <Heading size='md'>{chainName}</Heading>
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
                    {chainName.toLocaleLowerCase() === 'flare' ? 'Wrapped Amount' : 'Bridge Amount'}
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
                    Number of tokens
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {tokensCount} tokens
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Chain Score
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {score.toFixed(2)}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
            <CardFooter display='flex'>
              <MintButton
                address={address}
                chainScore={score}
                chainId={CHAIN_TO_ID[chainName.toLocaleLowerCase()]}
                contractAddress={CHAIN_TO_NFT_ADDRESS[chainName.toLocaleLowerCase()]}
              />
              <StoreButton
                address={address}
                totalScore={totalScore}
                chainId={CHAIN_TO_ID[chainName.toLocaleLowerCase()]}
                contractAddress={CHAIN_TO_STORE_ADDRESS[chainName.toLocaleLowerCase()]}
              />
            </CardFooter>
          </>
        )
      }
    </Card>
  );
}