import { useState, useEffect } from "react";
import { switchChain } from '@wagmi/core';
import { config } from '../lib/wagmi';

import { useWriteContract } from 'wagmi';
import { getAddress } from 'viem';
import abi from '../utils/NFTabi.json';
import { useMintParams } from "../hooks/mintParams";
import { LEVEL_TO_NAME, MIN_SCORE_FOR_LEVEL } from '../lib/scoreLib';

import {
  Button,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex
} from "@chakra-ui/react";

interface MintButtonParams {
  address: `0x${string}` | undefined
  totalScore: number
  chainId: number
  contractAddress: string
}

const MintButton = ({ address, totalScore, chainId, contractAddress }: MintButtonParams) => {
  const [loading, setLoading] = useState(false);
  const [nftName, setNftName] = useState('');
  const { data: hash, writeContract, isSuccess, isError, error } = useWriteContract();
  const { canMint, messageHash, signature, level } = useMintParams({ address, totalScore })

  useEffect(() => {
    if (level <= 0) {
      return;
    }
    setNftName(LEVEL_TO_NAME[level]);
  }, [level]);

  const mint = async () => {
    await switchChain(config, { chainId })

    setLoading(true);
    writeContract({
      address: getAddress(contractAddress),  // make sure to use 0x{string} format
      abi,
      functionName: 'mint',
      args: [address, messageHash, signature, level - 1], // /!\ the levels are 0-indexed (0, 1, 2) on the smart contract
      chainId: chainId
    })
  };

  if (level <= 0) {
    const perc = Math.floor((totalScore * 100) / MIN_SCORE_FOR_LEVEL[level + 1]);
    return (
      <Flex align='center' gap='6'>
        <p> Perform more transactions to be trusted on the network</p>
        <CircularProgress value={perc} max={100} color='green.400'>
          <CircularProgressLabel>{perc} %</CircularProgressLabel>
        </CircularProgress>
      </Flex>
    )
  }

  return (
    <Box display='flex-col'>
      <Button onClick={mint} disabled={!canMint || isSuccess}>
        Mint {nftName} NFT
      </Button>
      {loading && !isSuccess && <p>Minting...</p>}
      {
        hash &&
        <p>Transaction hash: {hash}</p>
      }
      {
        isError &&
        <>
          <p>Failed to mint NFT</p>
          <p>{error.message} {error.name}</p>
        </>
      }
      {
        isSuccess &&
        <p>NFT minted successfully</p>
      }
    </Box>
  );
};

export default MintButton;