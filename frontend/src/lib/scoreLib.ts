const WEIGHTS = {
  amountWrapped: 0.7,
  numberTransactions: 0.3
}

const MIN_SCORE_FOR_LEVEL: { [key: number]: number } = {
  1: 20,
  2: 50,
  3: 100,
};

export const LEVEL_TO_NAME: { [key: number]: string } = {
  1: 'Explorer',
  2: 'Adventurer',
  3: 'Degen',
};

export function computeDefaultScoreChain(amountWrapped: number, numberTransactions: number) {
  return convertWeiToEther(amountWrapped) * WEIGHTS.amountWrapped + numberTransactions * WEIGHTS.numberTransactions;
}

export function convertWeiToEther(wei: number) {
  return wei / 10 ** 18;
}

export async function getLevel(score: number) {
  let level = 0;
  for (let i = 1; i <= 3; i++) {
    if (score >= MIN_SCORE_FOR_LEVEL[i]) {
      level = i;
    } else {
      break;
    }
  }
  return level;
}