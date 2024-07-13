import { createConfig } from 'wagmi';
import { http } from "viem";
import { flare, flareTestnet } from 'viem/chains';

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
  chains: [zeroNetworktestnet, flare, flareTestnet],
  transports: {
    [zeroNetworktestnet.id]: http("https://rpc.zerion.io/v1/zero-sepolia"),
    [flare.id]: http(flare.rpcUrls.default.http[0]),
    [flareTestnet.id]: http(flareTestnet.rpcUrls.default.http[0]),
  },
})