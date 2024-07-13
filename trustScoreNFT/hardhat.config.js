/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("hardhat-contract-sizer");
require("@nomicfoundation/hardhat-ignition-ethers");
require("@matterlabs/hardhat-zksync");
require("@matterlabs/hardhat-zksync-solc");
require("@matterlabs/hardhat-zksync-verify");

const { METAMASK_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

if (!METAMASK_PRIVATE_KEY) {
  throw new Error("Please set your METAMASK_PRIVATE_KEY in a .env file");
}

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  zkSyncDeploy: {
    url: "https://rpc.zerion.io/v1/zero-sepolia",
    ethNetwork: "sepolia",
    verifyURL: "https://explorer.zero.network/contract_verification",
    zksync: true,
    accounts: [`0x${METAMASK_PRIVATE_KEY}`],
  },
  zksolc: {
    version: "latest",
    settings: {},
  },
  networks: {
    hardhat: {
      chainId: 1337,
      zksync: true,
    },
    zeroTestnet: {
      url: 'https://rpc.zerion.io/v1/zero-sepolia',
      zksync: true,
      ethNetwork: 'sepolia',
      verifyURL: 'https://explorer.zero.network/contract_verification',
      accounts: [`0x${METAMASK_PRIVATE_KEY}`],
    },
  },
};
