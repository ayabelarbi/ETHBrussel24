import { useState, useEffect } from "react";

import { useWriteContract } from 'wagmi';
import { getAddress } from 'viem';
import abi from '../utils/NFTabi.json';
import { useMintParams } from "../hooks/mintParams";
import { LEVEL_TO_NAME, MIN_SCORE_FOR_LEVEL } from '../lib/scoreLib';

import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex
} from "@chakra-ui/react";

// if (!import.meta.env.VITE_SC_ADDRESS) {
//   throw new Error('REACT_APP_SC_ADDRESS not set in .env');
// }

const VITE_SC_ADDRESS = "0x6561cca425483f2d36636427E94F3aA7Bd9b38A8"

interface MintButtonParams {
  address: `0x${string}` | undefined
  totalScore: number
}

const MintButton = ({ address, totalScore }: MintButtonParams) => {
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
    setLoading(true);
    writeContract({
      address: getAddress(VITE_SC_ADDRESS),  // make sure to use 0x{string} format
      abi,
      functionName: 'mint',
      args: [address, messageHash, signature, level - 1], // /!\ the levels are 0-indexed (0, 1, 2) on the smart contract
      chainId: 4457845 // zeroNetworktestnet
    })
  };

  if (level <= 0) {
    const perc = Math.floor((totalScore * 100) / MIN_SCORE_FOR_LEVEL[level + 1]);
    return (
      <Flex align='center' gap='6'>
        <p> Make more transactions to mint a NFT</p>
        <CircularProgress value={perc} max={100} color='green.400'>
          <CircularProgressLabel>{perc} %</CircularProgressLabel>
        </CircularProgress>
      </Flex>
    )
  }

  return (
    <>
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
    </>
  );
};

export default MintButton;