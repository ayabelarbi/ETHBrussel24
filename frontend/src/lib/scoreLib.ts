const WEIGHTS = {
  amountWrapped: 0.6,
  numberTransactions: 0.2,
  nftCount: 0.2
}

// Adjust the number of points given for each chain, according to the token's value
const CHAIN_COEFFICIENTS: { [key: string]: number } = {
  flare: 0.5,
  morph: 1000,
  scroll: 1000
}

export const MIN_SCORE_FOR_LEVEL: { [key: number]: number } = {
  1: 38,
  2: 60,
  3: 100,
};

export const LEVEL_TO_NAME: { [key: number]: string } = {
  1: 'Explorer',
  2: 'Adventurer',
  3: 'Degen',
};


export function computeDefaultScoreChain(chain: string, amountWrapped: number, numberTransactions: number, numberNFTs: number) {
  return (
    convertWeiToEther(amountWrapped) * WEIGHTS.amountWrapped * CHAIN_COEFFICIENTS[chain] +
    numberTransactions * WEIGHTS.numberTransactions +
    numberNFTs * WEIGHTS.nftCount
  );
}

export function convertWeiToEther(wei: number) {
  return wei / 10 ** 18;
}

export async function getLevel(score: number) {
  let level = 0;
  for (let i = 3; i > 0; i--) {
    if (score >= MIN_SCORE_FOR_LEVEL[i]) {
      level = i;
      break;
    }
  }
  return level;
}