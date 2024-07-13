import { useEffect, useState } from 'react';

import { getAddressNFTs } from '../lib/zeroNetworkConnector';


export const useGetNFTs = ({ address }: { address: `0x${string}` | undefined }) => {
  const [nfts, setNFTs] = useState<any[]>([]);
  useEffect(() => {
    const fetchNFTs = async () => {
      const nfts = await getAddressNFTs(address);
      if (typeof nfts !== 'undefined') {
        setNFTs(nfts);
      }
    };

    fetchNFTs();
  }, [address]);

  return { nfts };
}