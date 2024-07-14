import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import NFTAbi from '../utils/NFTabi.json';
import { getAddress } from 'viem';

import {
  Image,
  Text,
  Card,
  Stack,
  Heading,
  CardBody,
} from '@chakra-ui/react';

interface metadata {
  name: string,
  description: string,
  image: string
}

interface NFTCardParams {
  tokenId: number,
  contractAddress: string,
  chainName: string
  chainId: number
}

const NFTCard = ({ tokenId, contractAddress, chainName, chainId }: NFTCardParams) => {
  const [metadata, setMetadata] = useState<metadata>();
  const reader = useReadContract({
    abi: NFTAbi,
    address: getAddress(contractAddress),
    functionName: 'tokenURI',
    args: [tokenId],
    chainId: chainId
  });

  async function getMetadata(data: string) {
    try {
      const fileName = data.slice(data.lastIndexOf('/') + 1);
      const cid = "bafybeigxgbskoabrc3twc3s6wvtevik762xo5vknyyv6maqx3rlfew2gm4"
      const url = `https://${cid}.ipfs.dweb.link/${fileName}`;
      const response = await fetch(url);
      let metadata: any = await response.json();
      setMetadata(metadata);
    } catch (error: any) {
      console.error('Error fetching metadata:', error);
    }
  }

  useEffect(() => {
    if (reader.data && typeof reader.data === 'string') {
      getMetadata(reader.data);
    }
  }, [reader.data]);

  useEffect(() => {
    if ((!tokenId && tokenId !== 0) || !contractAddress) {
      return;
    }
    reader.refetch();
  }, [tokenId, contractAddress]);


  if (reader?.error) {
    return <Text>Error: {reader?.error.message}</Text>;
  }

  if (!reader.data) {
    return <Text>Loading...</Text>;
  }

  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src={metadata?.image}
          alt='NFT image'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3' minH='100px'>
          <Heading size='md'>{metadata?.name}</Heading>
          <Text>
            {metadata?.description} on {chainName}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default NFTCard;
