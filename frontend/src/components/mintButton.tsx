import { useState } from "react";
import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../main";

import { useWriteContract } from 'wagmi';
import { getAddress } from 'viem';
import abi from '../utils/NFTabi.json';
import { useMintParams } from "../hooks/mintParams";

if (!import.meta.env.VITE_SC_ADDRESS) {
  throw new Error('REACT_APP_SC_ADDRESS not set in .env');
}

const MintButton = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const address = '0x7D01abEdFD20BFdFDef2EBF2Ba1a42Ea2179160b'; // TODO: get user address from context
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContract, isSuccess, isError, error } = useWriteContract();
  const { canMint, messageHash, signature, level } = useMintParams();


  const mint = async () => {
    setLoading(true);
    writeContract({
      address: getAddress(import.meta.env.VITE_SC_ADDRESS as string),  // make sure to use 0x{string} format
      abi,
      functionName: 'mint',
      args: [address, messageHash, signature, level],
      chainId: 4457845 // zeroNetworktestnet
    })
  };

  return (
    <>
      <Button onClick={mint} disabled={!isLoggedIn || !canMint || isSuccess}>
        Mint NFT
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