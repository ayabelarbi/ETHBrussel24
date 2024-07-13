# Hardhat Project

This project is built using Hardhat, a development environment to compile, deploy, test, and debug Ethereum software.

## Features

- NFT smart contract to reward users with NFTs for reaching a certain DeFi trust score


## Prerequisites

Before you begin, ensure you have installed Node.js (version 12 or higher) and npm/yarn on your machine.

## Installation

To set up the project, follow these steps:

1. Clone the repository:
  ```shell
  git clone <repository-url>
  cd <project-name>
  npm install
  ```

2. Create a `.env` file in the root directory of the project and add the following environment variables:
  ```shell
  METAMASK_PRIVATE_KEY=<your-metamask-private-key>
  ```

3. Run the following command to compile the smart contracts:
  ```shell
  npx hardhat compile
  ```

4. Run the following command to deploy contract on the Zer0 network:
  ```shell
  npx hardhat run scripts/deploy.js --network zeroTestnet
  ```