import { createConfig } from 'wagmi';
import { http } from "viem";
import { scrollSepolia, flareTestnet, morphHolesky, sepolia, gnosisChiado } from 'viem/chains';
import Web3AuthConnectorInstance from '../hooks/connectWithWeb3Auth';

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
  chains: [scrollSepolia, zeroNetworktestnet, flareTestnet, morphHolesky, sepolia, gnosisChiado],
  transports: {
    [scrollSepolia.id]: http(scrollSepolia.rpcUrls.default.http[0]),
    [zeroNetworktestnet.id]: http(zeroNetworktestnet.rpcUrls.default.http[0]),
    [flareTestnet.id]: http(flareTestnet.rpcUrls.default.http[0]),
    [morphHolesky.id]: http(morphHolesky.rpcUrls.default.http[0]),
    [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
    [gnosisChiado.id]: http(gnosisChiado.rpcUrls.default.http[0]),
  },
  connectors: [
    Web3AuthConnectorInstance([zeroNetworktestnet, scrollSepolia, flareTestnet, morphHolesky, sepolia, gnosisChiado]),
  ]
})