import { useEffect, useState } from 'react';
import { computeDefaultScoreChain, convertWeiToEther } from '../lib/scoreLib';
import { useFlareData } from '../hooks/fetchBlockchainData';

import { Box, Heading } from '@chakra-ui/react';
import MintButton from './MintButton';
import FlareData from './FlareData';


const ChainData = () => {
  const address = '0xA745Cc25C9E5BB2672D26B58785f6884eF50F2c6'; // TODO: get user address from context
  const [totalScore, setTotalScore] = useState(0);
  const [scorePerChain, setScorePerChain] = useState({
    'flare': 0
  })

  const {
    wrappedAmount: flareWrapped,
    totalTransactions: flareTransactions,
    loading: flareLoading,
    error: flareError
  } = useFlareData({ address });

  // compute flare score
  useEffect(() => {
    scorePerChain.flare = computeDefaultScoreChain(flareWrapped, flareTransactions);
    setScorePerChain(scorePerChain);
    computeTotalScore();
  }, [flareWrapped, flareTransactions]);

  const computeTotalScore = () => {
    const total = Object.values(scorePerChain).reduce((acc, score) => acc + score, 0);
    setTotalScore(total);
  };

  if (flareLoading) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <Box>
      <Heading>Chain data</Heading>
      <div>
        <h2>Total score</h2>
        <p>{totalScore}</p>
      </div>
      <MintButton address={address} totalScore={totalScore} />
      <FlareData
        wrappedAmount={convertWeiToEther(flareWrapped)}
        totalTransactions={flareTransactions}
        loading={flareLoading}
        error={flareError}
        score={scorePerChain.flare}
      />
    </Box>
  );
}

export default ChainData;