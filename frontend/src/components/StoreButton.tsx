import { useState } from "react";
import { switchChain } from '@wagmi/core';
import { config } from '../lib/wagmi';

import { useWriteContract } from 'wagmi';
import { getAddress } from 'viem';
import abi from '../utils/StoreAbi.json';
import {
  Button,
  Box,
} from "@chakra-ui/react";

interface StoreButtonParams {
  address: `0x${string}` | undefined
  totalScore: number
  chainId: number
  contractAddress: string
}

const StoreButton = ({ totalScore, chainId, contractAddress }: StoreButtonParams) => {
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContract, isSuccess, isError, error } = useWriteContract();

  const register = async () => {
    await switchChain(config, { chainId })

    setLoading(true);
    writeContract({
      address: getAddress(contractAddress),  // make sure to use 0x{string} format
      abi,
      functionName: 'store',
      args: [BigInt(Math.round(totalScore))],
      chainId: chainId
    })
  };

  return (
    <Box display='flex-col'>
      <Button onClick={register} disabled={isSuccess}>
        Register your score
      </Button>
      {loading && !isSuccess && !isError && <p>Registering...</p>}
      {
        hash &&
        <p>Transaction hash: {hash} </p>
      }
      {
        isError &&
        <>
          <p>Failed to register your score</p>
          <p>{error.message} {error.name}</p>
        </>
      }
      {
        isSuccess &&
        <p>You are registered! Happy DeFi!</p>
      }
    </Box>
  );
};

export default StoreButton;