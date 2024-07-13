// TODO: move this script to a backend service

import { useEffect, useState } from 'react';
import { fetchAndFilterEvents, getTotalTransactionsaddress } from '../lib/flareConnector';

export const useFlareData = () => {
  const address = '0xA745Cc25C9E5BB2672D26B58785f6884eF50F2c6'; // TODO: get user address from context
  const [wrappedAmount, setWrappedAmount] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const wrappedAmount = await fetchAndFilterEvents(address);
        const totalTransactions = await getTotalTransactionsaddress(address);
        setWrappedAmount(wrappedAmount);
        setTotalTransactions(totalTransactions);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [address]);

  return { wrappedAmount, totalTransactions, loading, error };
}