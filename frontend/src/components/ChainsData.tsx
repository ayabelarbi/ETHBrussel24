import { useEffect, useState } from 'react';
import { useConnect, useAccount } from 'wagmi';

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

import { useBlockchainData } from '../hooks/fetchBlockchainData';

import { Box, Heading } from '@chakra-ui/react';
import MintButton from './MintButton';
import ChainDataDisplay from './ChainDataDisplay';


const ChainData = () => {
  const { address } = useAccount();
  const [totalScore, setTotalScore] = useState(0);
  const [scorePerChain, setScorePerChain] = useState({
    'flare': 0,
    'morph': 0,
  })

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
            : <p>GO to the Login page!</p>
        }
      </div>
      <Heading>Chain data</Heading>
      <div>
        <h2>Total score</h2>
        <p>{Math.round(totalScore)}</p>
      </div>
      {
        address &&
        <MintButton address={address} totalScore={totalScore} />
      }
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
    </Box>
  );
}

export default ChainData;