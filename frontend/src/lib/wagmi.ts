import { createConfig } from 'wagmi';
import { http } from "viem";

export const zeroNetworktestnet = {
  id: 4457845,
  name: 'ZERϴ Network Testnet',
  rpc: 'https://rpc.zerion.io/v1/zero-sepolia',
  explorer: 'https://explorer.zero.network',
  chainId: 4457845,
  currency: 'ETH',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.zerion.io/v1/zero-sepolia"] },
    public: { http: ["https://rpc.zerion.io/v1/zero-sepolia"] },
  },
}

export const config = createConfig({
  chains: [zeroNetworktestnet],
  transports: {
    [zeroNetworktestnet.id]: http("https://rpc.zerion.io/v1/zero-sepolia"),
  },
})