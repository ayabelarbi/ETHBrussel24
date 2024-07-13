import { ethers } from 'ethers';

import ContractAbi from '../utils/FlareContractAbi.json';
const contractAddress = '0xC67DCE33D7A8efA5FfEB961899C73fe01bCe9273';
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/flare_coston2/7c66d8fb2d926f141f7fd511165a470c2ff3495f699afa835a4fd7f2f3bfb976');
const chunkSize = 2000;

export async function getTotalAmountBridged(address: string | `0x${string}` | undefined) {
  if (!address) {
    return 0;
  }
  const startBlock = 9797798; // You can specify the start block if needed
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
        if (args[0] == address) {
          amount = amount + parseInt(args[1]);
        }
      } catch (error) {

      }
    })
  }
  return amount;
}

export async function getTotalTransactionsCount(address: string | `0x${string}` | undefined) {
  if (!address) {
    return 0;
  }
  try {
    const apiUrl = `https://coston2-explorer.flare.network/api?module=account&action=txlist&address=${address}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const transactions = data.result;
    if (transactions && Array.isArray(transactions)) {
      return transactions.length;
    } else {
      console.log('No transactions found or unexpected response format.');
      return 0;
    }
  } catch (error: any) {
    //throw new Error(`Failed to fetch Flare transactions for address ${address}: ${error.message}`);
    return 0;
  }
}