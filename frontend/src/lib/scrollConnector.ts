const API_URL = 'https://api-sepolia.scrollscan.com/api';
const API_KEY = 'KBF7XQWUU6BN1AKB197IGKCMGXNNHWA2BQ';  // Replace with your actual API key

export async function fetchBridgeTransactions(address: string | `0x${string}` | undefined) {
  if (!address) {
    return 0;
  }
  try {
    const response = await fetch(`${API_URL}?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`);
    const data = await response.json();
    const transactions = data.result;
    // Filter transactions from the specified address
    const filteredTransactions = transactions.filter((tx: any) => tx.from.toLowerCase() === address.toLowerCase());

    // Calculate the total amount
    let totalAmount = filteredTransactions.reduce((acc: any, tx: any) => {
      return acc + parseFloat(tx.value);
    }, 0);
    console.log(`Total amount bridged: ${totalAmount}`);
    return totalAmount;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return 0;
  }
}

export async function fetchTransactions(address: string | `0x${string}` | undefined) {
  if (!address) {
    return 0;
  }
  try {
    const response = await fetch(`${API_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`);
    const data = await response.json();
    const transactions = data.result;
    // Count the total number of transactions
    const totalTransactions = transactions.length;
    console.log(`Total number of transactions: ${totalTransactions}`);
    return totalTransactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return 0;
  }
}