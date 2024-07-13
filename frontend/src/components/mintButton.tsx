import { useState } from "react";
import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../main";

import { useWriteContract } from 'wagmi';
import { getAddress } from 'viem';
import abi from '../utils/NFTabi.json';
import { useMintParams } from "../hooks/mintParams";
import { LEVEL_TO_NAME } from '../lib/scoreLib';

if (!import.meta.env.VITE_SC_ADDRESS) {
  throw new Error('REACT_APP_SC_ADDRESS not set in .env');
}

interface MintButtonParams {
  address: string
  totalScore: number
}

const MintButton = ({ address, totalScore }: MintButtonParams) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContract, isSuccess, isError, error } = useWriteContract();
  const { canMint, messageHash, signature, level } = useMintParams({ address, totalScore });


  const mint = async () => {
    setLoading(true);
    writeContract({
      address: getAddress(import.meta.env.VITE_SC_ADDRESS as string),  // make sure to use 0x{string} format
      abi,
      functionName: 'mint',
      args: [address, messageHash, signature, level - 1], // /!\ the levels are 0-indexed (0, 1, 2) on the smart contract
      chainId: 4457845 // zeroNetworktestnet
    })
  };

  if (level <= 0) {
    return (
      <p> Make more transaction to mint a NFT</p>
    )
  }

  return (
    <>
      <Button onClick={mint} disabled={!isLoggedIn || !canMint || isSuccess}>
        Mint {LEVEL_TO_NAME[level]} NFT
      </Button>
      {loading && <p>Minting...</p>}
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
    </>
  );
};

export default MintButton;