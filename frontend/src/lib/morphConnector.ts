import { ethers } from 'ethers';

import ContractAbi from '../utils/MorphContractAbi.json';
const contractAddress = '0x5300000000000000000000000000000000000006';
const provider = new ethers.providers.JsonRpcProvider('https://rpc-quicknode-holesky.morphl2.io');
const chunkSize = 7000;

export async function getTotalAmountBridged(address: string | `0x${string}` | undefined) {
  if (!address) {
    return 0;
  }
  const startBlock = 3715000; // You can specify the start block if needed 3746760
  const endBlock = await provider.getBlockNumber();

  let amount = 0;

  for (let i = startBlock; i <= endBlock; i += chunkSize) {
    const fromBlock = i;
    const toBlock = Math.min(i + chunkSize - 1, endBlock);

    const eventFilter = {
      address: contractAddress,
      fromBlock: fromBlock,
      toBlock: toBlock
    };

    const logs = await provider.getLogs(eventFilter);
    const iface = new ethers.utils.Interface(ContractAbi);
    logs.map(log => {
      try {
        const event = iface.parseLog(log);
        const args = event.args;
        if (args[1] == address) {
          amount = amount + parseInt(args[2]);
        }
      } catch (error) {

      }
    })
  }
  console.log("Amount bridged is", amount);
  return amount;
}

// Function to get the count of total transactions for a given address
export async function getTotalTransactionsCount(address: string | `0x${string}` | undefined) {
  if (!address) {
    return 0;
  }
  const apiUrl = `https://explorer-api-holesky.morphl2.io/api/v2/addresses/${address}/counters`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const txn_count = data.transactions_count;
    return txn_count;
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    throw new Error(`Failed to fetch transactions for address ${address}: ${error.message}`);
  }
}

export async function getNFTCounts(address: string | `0x${string}` | undefined) {
  const apiURL = `https://explorer-api-holesky.morphl2.io/api/v2/addresses/${address}/nft?type=ERC-721%2CERC-404%2CERC-1155'`
  let nft_count = 0;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    let nftList = data.items;
    if (nftList) {
      nft_count = Object.keys(nftList).length;
      console.log(`Total nfts for address ${address}:  ${nft_count}`);
      return nft_count;
    } else {
      console.log('No NFTs found or unexpected response format.');
      return 0;
    }
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    throw new Error(`Failed to fetch NFTs for address ${address}: ${error.message}`);
  }

  return nft_count;
}