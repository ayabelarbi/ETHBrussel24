import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { computeDefaultScoreChain, convertWeiToEther } from '../lib/scoreLib';
import {
  getTotalAmountBridged as getMorphBridged,
  getTotalTransactionsCount as getMorphTx,
  getNFTCounts as getMorphNFTs
} from '../lib/morphConnector';

import {
  getTotalAmountBridged as getFlareBridged,
  getTotalTransactionsCount as getFlareTx
} from '../lib/flareConnector';

import {
  fetchBridgeTransactions as getScrollBridged,
  fetchTransactions as getScrollTx
} from '../lib/scrollConnector';

import { useBlockchainData } from '../hooks/fetchBlockchainData';
import { useGetNFTs } from '../hooks/getNFTs';
import NFTCard from './NFTCard';

import {
  Box,
  Heading,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup
} from '@chakra-ui/react';
import MintButton from './MintButton';
import ChainDataDisplay from './ChainDataDisplay';


const ChainData = () => {
  const { address } = useAccount();
  const [totalScore, setTotalScore] = useState(0);
  const [scorePerChain, setScorePerChain] = useState({
    'flare': 0,
    'morph': 0,
    'scroll': 0
  })

  const { nfts } = useGetNFTs({ address });

  // FLARE data
  const {
    wrappedAmount: flareWrapped,
    totalTransactions: flareTransactions,
    loading: flareLoading,
    error: flareError
  } = useBlockchainData({
    address,
    getTotalAmountBridged: getFlareBridged,
    getTotalTransactionsCount: getFlareTx
  });

  // MORPH data
  const {
    wrappedAmount: morphWrapped,
    totalTransactions: morphTransactions,
    totalNFTs: morphNFTs,
    loading: morphLoading,
    error: morphError
  } = useBlockchainData({
    address,
    getTotalAmountBridged: getMorphBridged,
    getTotalTransactionsCount: getMorphTx,
    getNFTCounts: getMorphNFTs
  });

  // SCROLL DATA
  const {
    wrappedAmount: scrollWrapped,
    totalTransactions: scrollTransactions,
    totalNFTs: scrollNFTs,
    loading: scrollLoading,
    error: scrollError
  } = useBlockchainData({
    address,
    getTotalAmountBridged: getScrollBridged,
    getTotalTransactionsCount: getScrollTx,
  });

  // compute flare score
  useEffect(() => {
    scorePerChain.flare = computeDefaultScoreChain('flare', flareWrapped, flareTransactions, 0);
    setScorePerChain(scorePerChain);
    computeTotalScore();
  }, [flareWrapped, flareTransactions]);

  // compute morph score
  useEffect(() => {
    scorePerChain.morph = computeDefaultScoreChain('morph', morphWrapped, morphTransactions, morphNFTs);
    setScorePerChain(scorePerChain);
    computeTotalScore();
  }, [morphWrapped, morphTransactions]);

  // compute scroll score
  useEffect(() => {
    scorePerChain.scroll = computeDefaultScoreChain('scroll', scrollWrapped, scrollTransactions, scrollNFTs);
    setScorePerChain(scorePerChain);
    computeTotalScore();
  }, [scrollWrapped, scrollTransactions]);

  const computeTotalScore = () => {
    const total = Object.values(scorePerChain).reduce((acc, score) => acc + score, 0);
    setTotalScore(total);
  };

  return (
    <Box px='16'>
      <div>
        {
          address
            ? <p>Connected account: {address}</p>
            : <p>GO to the Login page!</p>
        }
      </div>
      <Heading>Chain data</Heading>
      <div>
        <StatGroup>
          <Stat>
            <StatLabel>Total Score</StatLabel>
            <StatNumber>{Math.round(totalScore)}</StatNumber>
          </Stat>

          <Stat>
            <MintButton address={address} totalScore={totalScore} />
          </Stat>

        </StatGroup>
      </div>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        <GridItem w='100%'>
          <ChainDataDisplay
            chainName='Flare'
            chainTiker='C2FLR'
            wrappedAmount={convertWeiToEther(flareWrapped)}
            totalTransactions={flareTransactions}
            NFTCount={0}
            loading={flareLoading}
            error={flareError}
            score={scorePerChain.flare}
          />
        </GridItem>
        <GridItem w='100%' >
          <ChainDataDisplay
            chainName='Morph'
            chainTiker='ETH'
            wrappedAmount={convertWeiToEther(morphWrapped)}
            totalTransactions={morphTransactions}
            NFTCount={morphNFTs}
            loading={morphLoading}
            error={morphError}
            score={scorePerChain.morph}
          />
        </GridItem>
        <GridItem w='100%'>
          <ChainDataDisplay
            chainName='Scroll'
            chainTiker='SCRL'
            wrappedAmount={convertWeiToEther(scrollWrapped)}
            totalTransactions={scrollTransactions}
            NFTCount={scrollNFTs}
            loading={scrollLoading}
            error={scrollError}
            score={scorePerChain.scroll}
          />
        </GridItem>
      </Grid>

      <Box mt='8'>
        <Heading size='md' my='4'>Your Trust Score NFTs</Heading>
        {
          nfts.length === 0 ?
            <Box>Make transactions to get trusted NFTs</Box> :
            <Grid templateColumns='repeat(6, 1fr)' gap={6}>
              {
                nfts.map((nft, idx) => (
                  <GridItem w='100%' key={idx} >
                    <NFTCard tokenId={nft.tokenId} />
                  </GridItem>
                ))
              }
            </Grid>}
      </Box>
    </Box>
  );
}

export default ChainData;