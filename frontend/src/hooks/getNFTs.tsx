import { useEffect, useState } from 'react';

export const useGetNFTs = () => {
  const [nfts, setNFTs] = useState<any[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: 'Basic emtfZGV2X2I5YTgzYTI2M2IzYjQyZjU4NWU3MGI1NmFkMjJmMGNhOg=='
        }
      };
      const response = await fetch(
        'https://api.zerion.io/v1/nfts/?currency=usd',
        options);
      const data = await response.json();
      setNFTs(data);
    };

    fetchNFTs();
  }, []);

  return nfts;
}