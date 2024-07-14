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
  fetchTransactions as getScrollTx,
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
import ChainDataDisplay from './ChainDataDisplay';
import { CHAIN_TO_SC_ADDRESS, CHAIN_TO_ID } from '../globals';

import { usePrivy } from '@privy-io/react-auth';

const ChainData = () => {
  const { address } = useAccount();
  const { user } = usePrivy();
  const [totalScore, setTotalScore] = useState(0);
  const [scorePerChain, setScorePerChain] = useState({
    'flare': 0,
    'morph': 0,
    'scroll': 0
  })

  const { nfts: scrollNFTs } = useGetNFTs({ address, contractAddress: CHAIN_TO_SC_ADDRESS.scroll, chainId: CHAIN_TO_ID.scroll });
  const { nfts: morphNFTs } = useGetNFTs({ address, contractAddress: CHAIN_TO_SC_ADDRESS.morph, chainId: CHAIN_TO_ID.morph });
  const { nfts: flareNFTs } = useGetNFTs({ address, contractAddress: CHAIN_TO_SC_ADDRESS.flare, chainId: CHAIN_TO_ID.flare });

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
    totalNFTs: morphNFTCount,
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
    totalNFTs: scrollNFTCount,
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
    scorePerChain.morph = computeDefaultScoreChain('morph', morphWrapped, morphTransactions, morphNFTCount);
    setScorePerChain(scorePerChain);
    computeTotalScore();
  }, [morphWrapped, morphTransactions]);

  // compute scroll score
  useEffect(() => {
    scorePerChain.scroll = computeDefaultScoreChain('scroll', scrollWrapped, scrollTransactions, scrollNFTCount);
    setScorePerChain(scorePerChain);
    computeTotalScore();
  }, [scrollWrapped, scrollTransactions]);

  const computeTotalScore = () => {
    const total = Object.values(scorePerChain).reduce((acc, score) => acc + score, 0);
    setTotalScore(total);
  };

  return (
    <Box>
      <div>
      {
  address
    ? <p>Connected account: {address}</p>
    : user
      ? <p>Connected account: {user.wallet?.address}</p>
      : <p>Go to the Login page!</p>
}
      </div>
      <Heading py='8'>Chain data</Heading>
      <Box py='4'>
        <StatGroup>
          <Stat>
            <StatLabel>Total Score</StatLabel>
            <StatNumber>{Math.round(totalScore)}</StatNumber>
          </Stat>
        </StatGroup>
      </Box>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        <GridItem w='100%'>
          <ChainDataDisplay
            address={address}
            chainName='Flare'
            chainTiker='C2FLR'
            wrappedAmount={convertWeiToEther(flareWrapped)}
            totalTransactions={flareTransactions}
            NFTCount={flareNFTs.length}
            loading={flareLoading}
            error={flareError}
            score={scorePerChain.flare}
          />
        </GridItem>
        <GridItem w='100%' >
          <ChainDataDisplay
            address={address}
            chainName='Morph'
            chainTiker='ETH'
            wrappedAmount={convertWeiToEther(morphWrapped)}
            totalTransactions={morphTransactions}
            NFTCount={morphNFTCount}
            loading={morphLoading}
            error={morphError}
            score={scorePerChain.morph}
          />
        </GridItem>
        <GridItem w='100%'>
          <ChainDataDisplay
            address={address}
            chainName='Scroll'
            chainTiker='SCRL'
            wrappedAmount={convertWeiToEther(scrollWrapped)}
            totalTransactions={scrollTransactions}
            NFTCount={scrollNFTs.length}
            loading={scrollLoading}
            error={scrollError}
            score={scorePerChain.scroll}
          />
        </GridItem>
      </Grid>

      <Box mt='8'>
        <Heading size='md' my='4'>Your Trust Score NFTs</Heading>
        {
          [...scrollNFTs, ...morphNFTs, ...flareNFTs].length === 0 ?
            <Box>Perform transactions to get trusted NFTs</Box> :
            <Grid templateColumns='repeat(6, 1fr)' gap={6}>
              {
                scrollNFTs.map((nft, idx) => (
                  <GridItem w='100%' key={idx} >
                    <NFTCard tokenId={nft.tokenId} contractAddress={nft.contractAddress} chainName='scroll' chainId={CHAIN_TO_ID.scroll} />
                  </GridItem>
                ))
              }{
                morphNFTs.map((nft, idx) => (
                  <GridItem w='100%' key={idx} >
                    <NFTCard tokenId={nft.tokenId} contractAddress={nft.contractAddress} chainName='morph' chainId={CHAIN_TO_ID.morph} />
                  </GridItem>
                ))
              }{
                flareNFTs.map((nft, idx) => (
                  <GridItem w='100%' key={idx} >
                    <NFTCard tokenId={nft.tokenId} contractAddress={nft.contractAddress} chainName='flare' chainId={CHAIN_TO_ID.flare} />
                  </GridItem>
                ))
              }
            </Grid>}
      </Box>
    </Box>
  );
}

export default ChainData;