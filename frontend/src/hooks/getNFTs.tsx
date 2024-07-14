import { useEffect, useState } from 'react';
import { getAddress } from 'viem';

import { useReadContract } from 'wagmi';
import NFTAbi from '../utils/NFTabi.json';

interface NFTHookParams {
  address: `0x${string}` | undefined;
  contractAddress: string
  chainId: number
}

export const useGetNFTs = ({ address, contractAddress, chainId }: NFTHookParams) => {
  const [nfts, setNFTs] = useState<any[]>([]);
  const { data } = useReadContract({
    abi: NFTAbi,
    address: getAddress(contractAddress),
    functionName: 'getNftsPerAddress',
    args: [address],
    chainId: chainId
  });

  useEffect(() => {
    if (data) {
      let items: any = data;
      // cast the data to an array
      if (!Array.isArray(items)) {
        items = [items];
      }
      // convert each nft to a readable format
      const nfts = items.map((bigId: any) => {
        return {
          tokenId: parseFloat(bigId.toString()),
          contractAddress: contractAddress
        }
      });
      setNFTs(nfts);
    }
  }, [data]);


  return { nfts };
}