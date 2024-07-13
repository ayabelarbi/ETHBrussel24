const WEIGHTS = {
  amountWrapped: 0.7,
  numberTransactions: 0.3
}

export function computeDefaultScoreChain(amountWrapped: number, numberTransactions: number) {
  return convertWeiToEther(amountWrapped) * WEIGHTS.amountWrapped + numberTransactions * WEIGHTS.numberTransactions;
}

export function convertWeiToEther(wei: number) {
  return wei / 10 ** 18;
}