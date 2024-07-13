import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES } from "@web3auth/base";

//  4 chain (EVM):  morph, ethereum(sepolia), scroll, gnosis chain, zerion chain (zero chain), flare chain 
export const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    /*
      pass the chain config that you want to connect with.
      all chainConfig fields are required.
      */
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x1",
      rpcTarget: "https://rpc.ankr.com/eth",
      displayName: "Ethereum Mainnet",
      blockExplorerUrl: "https://etherscan.io",
      ticker: "ETH",
      tickerName: "Ethereum",
    },
  },
});
