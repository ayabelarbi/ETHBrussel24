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

const NFTCard = ({ tokenId, contractAddress }: { tokenId: number, contractAddress: string }) => {
  const [metadata, setMetadata] = useState<metadata>();
  const { data, error } = useReadContract({
    abi: NFTAbi,
    address: getAddress(contractAddress),
    functionName: 'tokenURI',
    args: [tokenId]
  });

  async function getMetadata(data: string) {
    try {
      console.log(data);
      const fileName = data.slice(data.lastIndexOf('/') + 1);
      const cid = "bafybeigxgbskoabrc3twc3s6wvtevik762xo5vknyyv6maqx3rlfew2gm4"
      const url = `https://${cid}.ipfs.dweb.link/${fileName}`;
      console.log(url);
      const response = await fetch(url);
      console.log(response);
      let metadata: any = await response.json();
      console.log(metadata);
      setMetadata(metadata);
    } catch (error: any) {
      console.error('Error fetching metadata:', error);
    }
  }

  useEffect(() => {
    if (data && typeof data === 'string') {
      getMetadata(data);
    }
  }, [data]);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!data) {
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
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{metadata?.name}</Heading>
          <Text>
            {metadata?.description}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default NFTCard;
