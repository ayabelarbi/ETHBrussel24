// TODO: move this script to a backend service

import { useEffect, useState } from 'react';

interface useDataParams {
  address: `0x${string}` | undefined,
  getTotalAmountBridged?: (address: string | `0x${string}` | undefined) => Promise<number>,
  getTotalTransactionsCount?: (address: string | `0x${string}` | undefined) => Promise<number>
  getTokensCount?: (address: string | `0x${string}` | undefined) => Promise<number>
}

export const useBlockchainData = ({
  address,
  getTotalAmountBridged,
  getTotalTransactionsCount,
  getTokensCount
}: useDataParams) => {
  const [wrappedAmount, setWrappedAmount] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!address) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        if (getTokensCount) {
          const totalTokens = await getTokensCount(address);
          setTotalTokens(totalTokens);
        }
        if (getTotalAmountBridged) {
          const wrappedAmount = await getTotalAmountBridged(address);
          setWrappedAmount(wrappedAmount);
        }
        if (getTotalTransactionsCount) {
          const totalTransactions = await getTotalTransactionsCount(address);
          setTotalTransactions(totalTransactions);
        }
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [address]);

  return { wrappedAmount, totalTransactions, totalTokens, loading, error };
}