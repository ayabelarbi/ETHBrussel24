import { JsonRpcProvider } from 'ethers';

const RPC_URL = 'https://eth-sepolia.g.alchemy.com/v2/5s29dWKvXzHyrWXdEGzz0XqtM-SS_QWg';

// Initialize ethers.js provider with RPC URL
const provider = new JsonRpcProvider(RPC_URL);

export async function fetchTransactionCount(address: string | `0x${string}` | undefined) {
  let txnCount = 0;
  if (!address) {
    return 0;
  }
  try {
    // Get transaction count using ethers.js
    txnCount = await provider.getTransactionCount(address);

    console.log(`Total transaction count for address ${address}: ${txnCount}`);
  } catch (error) {
    console.error('Error fetching transaction count:', error);
    return 0;
  }
  return txnCount;
}