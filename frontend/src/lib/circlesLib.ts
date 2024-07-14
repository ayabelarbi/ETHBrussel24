import { Sdk, ChainConfig, SdkContractRunner } from "@circles-sdk/sdk";
import { ethers } from "ethers";

const chainConfig: ChainConfig = {
  circlesRpcUrl: "https://chiado-rpc.aboutcircles.com",
  v1HubAddress: "0xdbf22d4e8962db3b2f1d9ff55be728a887e47710",
  v2HubAddress: "0x2066CDA98F98397185483aaB26A89445addD6740",
  migrationAddress: "0x2A545B54bb456A0189EbC53ed7090BfFc4a6Af94"
};

async function getRunner(): Promise<SdkContractRunner> {
  const w: any = window;
  const browserProvider = new ethers.BrowserProvider(w.ethereum)
  const signer = await browserProvider.getSigner();
  const address = await signer.getAddress();

  return {
    runner: signer,
    address: address
  };
}

export async function getSdk() {
  const runner = await getRunner();
  return new Sdk(chainConfig, runner);
}