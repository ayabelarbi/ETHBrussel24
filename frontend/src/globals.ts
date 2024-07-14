export const CHAIN_TO_SC_ADDRESS: { [key: string]: string } = {
  flare: '0x7BF2B04E9413F592292F557FDba9177e578D4B10',
  morph: '0xa02BD5ffB4C50d3EC736E8B99c1114E23C60A1cd',
  scroll: '0x21232567E7Abf788fAA91573c69D9718c15E361c',
  sepolia: '0x66c2f76173416ca9b3f38def11e78aabbdcd18ce'
}

import { scrollSepolia, flareTestnet, morphHolesky, sepolia } from 'viem/chains';

export const CHAIN_TO_ID: { [key: string]: number } = {
  flare: flareTestnet.id,
  morph: morphHolesky.id,
  scroll: scrollSepolia.id,
  sepolia: sepolia.id
}