/* import { ethers } from "ethers";
import NFTAbi from "../utils/NFTabi.json";

// Replace with your own provider URL and contract address
const provider = new ethers.JsonRpcProvider("https://rpc.zerion.io/v1/zero-sepolia");
const contractAddress = import.meta.env.VITE_SC_ADDRESS as string;

 export async function getAddressNFTs(address: string | `0x${string}` | undefined) {
  const contract = new ethers.Contract(contractAddress, NFTAbi, provider);

  // Query the events
  const filter = contract.filters.Transfer(null, null);
  const events = await contract.queryFilter(filter);

  // Process the events
  const mintedNFTs = events
    .filter(event => event?.args?.from === ethers.ZeroAddress)
    .filter(event => event?.args?.to === address)
    .map(event => ({
      to: event?.args?.to,
      tokenId: event?.args?.tokenId.toNumber(),
    }));

  return mintedNFTs;
} */