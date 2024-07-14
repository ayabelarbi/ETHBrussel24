import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { Button, HStack, VStack, Text } from "@chakra-ui/react";

import PieCards from "./PieCards";

import { computeDefaultScoreChain, convertWeiToEther } from "../lib/scoreLib";
import {
  getTotalAmountBridged as getMorphBridged,
  getTotalTransactionsCount as getMorphTx,
  getTokenCount as getMorphTokensCount,
} from "../lib/morphConnector";

import {
  getTotalAmountBridged as getFlareBridged,
  getTotalTransactionsCount as getFlareTx,
  getTotalTokenCount as getFlareTokensCount,
} from "../lib/flareConnector";

import {
  fetchBridgeTransactions as getScrollBridged,
  fetchTransactions as getScrollTx,
  fetchTokenCounts as getScrollTokensCount,
} from "../lib/scrollConnector";

import { fetchTransactionCount as getSepoliaTx } from "../lib/sepoliaConnector";

import { useBlockchainData } from "../hooks/fetchBlockchainData";
import { useGetNFTs } from "../hooks/getNFTs";
import NFTCard from "./NFTCard";

import {
  Box,
  Heading,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from "@chakra-ui/react";
import ChainDataDisplay from "./ChainDataDisplay";
import { CHAIN_TO_SC_ADDRESS, CHAIN_TO_ID } from "../globals";

import { usePrivy, useLinkAccount } from "@privy-io/react-auth";

const ChainData = () => {
  const { address } = useAccount();
  const { user } = usePrivy();
  const {
    linkEmail,
    linkInstagram,
    linkApple,
    linkGithub,
    linkTwitter,
    linkPhone,
    linkDiscord,
    linkSpotify,
  } = useLinkAccount();
  const [totalScore, setTotalScore] = useState(0);
  const [scorePerChain, setScorePerChain] = useState({
    flare: 0,
    morph: 0,
    scroll: 0,
    sepolia: 0,
  });

  const linkedAccountMethods = user?.linkedAccounts.map((account, index) => (
    <span
      key={index}
      style={{ marginRight: "8px", padding: "4px", borderRadius: "4px" }}
    >
      {account.type}
    </span>
  ));
  useEffect(() => {
    //if the size of the linkedAccounts array increase the total score have to increase to 10
    setTotalScore(totalScore + 10);
  }, [user?.linkedAccounts]);

  const linkEmailPoint = async () => {
    await linkEmail();
  };

  const linkInstagramPoint = async () => {
    await linkInstagram();
  };

  const linkApplePoint = async () => {
    await linkApple();
  };

  const linkGithubPoint = async () => {
    await linkGithub();
  };

  const linkTwitterPoint = async () => {
    await linkTwitter();
  };

  const linkPhonePoint = async () => {
    await linkPhone();
  };

  const linkDiscordPoint = async () => {
    await linkDiscord();
  };

  const linkSpotifyPoint = async () => {
    await linkSpotify();
  };

  const { nfts: scrollNFTs } = useGetNFTs({
    address,
    contractAddress: CHAIN_TO_SC_ADDRESS.scroll,
    chainId: CHAIN_TO_ID.scroll,
  });
  const { nfts: morphNFTs } = useGetNFTs({
    address,
    contractAddress: CHAIN_TO_SC_ADDRESS.morph,
    chainId: CHAIN_TO_ID.morph,
  });
  const { nfts: flareNFTs } = useGetNFTs({
    address,
    contractAddress: CHAIN_TO_SC_ADDRESS.flare,
    chainId: CHAIN_TO_ID.flare,
  });
  const { nfts: sepoliaNFTs } = useGetNFTs({
    address,
    contractAddress: CHAIN_TO_SC_ADDRESS.sepolia,
    chainId: CHAIN_TO_ID.sepolia,
  });

  // FLARE data
  const {
    wrappedAmount: flareWrapped,
    totalTransactions: flareTransactions,
    totalTokens: flareTokensCount,
    loading: flareLoading,
    error: flareError,
  } = useBlockchainData({
    address,
    getTotalAmountBridged: getFlareBridged,
    getTotalTransactionsCount: getFlareTx,
    getTokensCount: getFlareTokensCount,
  });

  // MORPH data
  const {
    wrappedAmount: morphWrapped,
    totalTransactions: morphTransactions,
    totalTokens: morphTokensCount,
    loading: morphLoading,
    error: morphError,
  } = useBlockchainData({
    address,
    getTotalAmountBridged: getMorphBridged,
    getTotalTransactionsCount: getMorphTx,
    getTokensCount: getMorphTokensCount,
  });

  // SCROLL DATA
  const {
    wrappedAmount: scrollWrapped,
    totalTransactions: scrollTransactions,
    totalTokens: scrollTokensCount,
    loading: scrollLoading,
    error: scrollError,
  } = useBlockchainData({
    address,
    getTotalAmountBridged: getScrollBridged,
    getTotalTransactionsCount: getScrollTx,
    getTokensCount: getScrollTokensCount,
  });

  // SEPOLIA DATA
  const {
    totalTransactions: sepoliaTransactions,
    loading: sepoliaLoading,
    error: sepoliaError,
  } = useBlockchainData({
    address,
    getTotalTransactionsCount: getSepoliaTx,
  });

  // compute flare score
  useEffect(() => {
    scorePerChain.flare = computeDefaultScoreChain(
      "flare",
      flareWrapped,
      flareTransactions,
      flareTokensCount
    );
    setScorePerChain(scorePerChain);
    computeTotalScore();
  }, [flareWrapped, flareTransactions]);

  // compute morph score
  useEffect(() => {
    scorePerChain.morph = computeDefaultScoreChain(
      "morph",
      morphWrapped,
      morphTransactions,
      morphTokensCount
    );
    setScorePerChain(scorePerChain);
    computeTotalScore();
  }, [morphWrapped, morphTransactions]);

  // compute scroll score
  useEffect(() => {
    scorePerChain.scroll = computeDefaultScoreChain(
      "scroll",
      scrollWrapped,
      scrollTransactions,
      scrollTokensCount
    );
    setScorePerChain(scorePerChain);
    computeTotalScore();
  }, [scrollWrapped, scrollTransactions]);

  // compute sepolia score
  useEffect(() => {
    scorePerChain.sepolia = computeDefaultScoreChain(
      "sepolia",
      0,
      sepoliaTransactions,
      1
    );
    setScorePerChain(scorePerChain);
    computeTotalScore();
  }, [sepoliaTransactions]);

  const computeTotalScore = () => {
    const total = Object.values(scorePerChain).reduce(
      (acc, score) => acc + score,
      0
    );
    setTotalScore(total);
  };

  return (
    <Box>
      <div>
        {user ? (
          <>
            <Box>
              <VStack spacing={4}>
                <Text size="large">
                  Connected account: {user.wallet?.address}
                </Text>
                <p>Method used to connect: {linkedAccountMethods}</p>
                <HStack>
                  {linkEmailPoint && (
                    <Button onClick={linkEmailPoint}>Link Email</Button>
                  )}
                  {linkInstagramPoint && (
                    <Button onClick={linkInstagramPoint}>Link Instagram</Button>
                  )}
                  {linkApplePoint && (
                    <Button onClick={linkApplePoint}>Link Apple</Button>
                  )}
                  {linkGithubPoint && (
                    <Button onClick={linkGithubPoint}>Link Github</Button>
                  )}
                  {linkTwitterPoint && (
                    <Button onClick={linkTwitterPoint}>Link Twitter</Button>
                  )}
                  {linkPhonePoint && (
                    <Button onClick={linkPhonePoint}>Link Phone</Button>
                  )}
                  {linkDiscordPoint && (
                    <Button onClick={linkDiscordPoint}>Link Discord</Button>
                  )}
                  {linkSpotifyPoint && (
                    <Button onClick={linkSpotifyPoint}>Link Spotify</Button>
                  )}
                </HStack>
              </VStack>
            </Box>
          </>
        ) : address ? (
          <Text>Connected account: {address}</Text>
        ) : (
          <Text>No account connected</Text>
  
        )}
      </div>
      <Heading py="8">Chain data</Heading>
      <Box py="4">
        <StatGroup>
          <Stat>
            <StatLabel>Total Score</StatLabel>
            <StatNumber>{totalScore.toFixed(2)}</StatNumber>
          </Stat>
        </StatGroup>
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem w="100%">
          <ChainDataDisplay
            address={address}
            chainName="Sepolia"
            chainTiker="ETH"
            totalTransactions={sepoliaTransactions}
            wrappedAmount={0}
            tokensCount={1}
            loading={sepoliaLoading}
            error={sepoliaError}
            score={scorePerChain.sepolia}
          />
        </GridItem>
        <GridItem w="100%">
          <ChainDataDisplay
            address={address}
            chainName="Scroll"
            chainTiker="ETH"
            wrappedAmount={convertWeiToEther(scrollWrapped)}
            totalTransactions={scrollTransactions}
            tokensCount={scrollTokensCount}
            loading={scrollLoading}
            error={scrollError}
            score={scorePerChain.scroll}
          />
        </GridItem>
        <GridItem w="100%">
          <ChainDataDisplay
            address={address}
            chainName="Flare"
            chainTiker="C2FLR"
            wrappedAmount={convertWeiToEther(flareWrapped)}
            totalTransactions={flareTransactions}
            tokensCount={flareTokensCount}
            loading={flareLoading}
            error={flareError}
            score={scorePerChain.flare}
          />
        </GridItem>
        <GridItem w="100%">
          <ChainDataDisplay
            address={address}
            chainName="Morph"
            chainTiker="ETH"
            wrappedAmount={convertWeiToEther(morphWrapped)}
            totalTransactions={morphTransactions}
            tokensCount={morphTokensCount}
            loading={morphLoading}
            error={morphError}
            score={scorePerChain.morph}
          />
        </GridItem>

        <PieCards/>
      </Grid>

      <Box mt="8">
        <Heading size="md" my="4">
          Your Trust Score NFTs
        </Heading>
        {[...scrollNFTs, ...morphNFTs, ...flareNFTs, ...sepoliaNFTs].length ===
        0 ? (
          <Box>Perform transactions to get trusted NFTs</Box>
        ) : (
          <Grid templateColumns="repeat(6, 1fr)" gap={6}>
            {scrollNFTs.map((nft, idx) => (
              <GridItem w="100%" key={idx}>
                <NFTCard
                  tokenId={nft.tokenId}
                  contractAddress={nft.contractAddress}
                  chainName="scroll"
                  chainId={CHAIN_TO_ID.scroll}
                />
              </GridItem>
            ))}
            {morphNFTs.map((nft, idx) => (
              <GridItem w="100%" key={idx}>
                <NFTCard
                  tokenId={nft.tokenId}
                  contractAddress={nft.contractAddress}
                  chainName="morph"
                  chainId={CHAIN_TO_ID.morph}
                />
              </GridItem>
            ))}
            {flareNFTs.map((nft, idx) => (
              <GridItem w="100%" key={idx}>
                <NFTCard
                  tokenId={nft.tokenId}
                  contractAddress={nft.contractAddress}
                  chainName="flare"
                  chainId={CHAIN_TO_ID.flare}
                />
              </GridItem>
            ))}
            {sepoliaNFTs.map((nft, idx) => (
              <GridItem w="100%" key={idx}>
                <NFTCard
                  tokenId={nft.tokenId}
                  contractAddress={nft.contractAddress}
                  chainName="sepolia"
                  chainId={CHAIN_TO_ID.sepolia}
                />
              </GridItem>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default ChainData;
