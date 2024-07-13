const { Wallet, Provider, Contract } = require("zksync-ethers");
const { Deployer } = require("@matterlabs/hardhat-zksync");
const { zkSyncDeploy } = require("../hardhat.config");


require("@matterlabs/hardhat-zksync");
require("@matterlabs/hardhat-zksync-solc");

const { METAMASK_PRIVATE_KEY } = process.env;

async function deployNFT(deployer) {
  const artifact = await deployer.loadArtifact("TrustScoreNFT");
  return await deployer.deploy(artifact);
}

async function main() {
  const provider = new Provider(zkSyncDeploy.url);
  const wallet = new Wallet(METAMASK_PRIVATE_KEY, provider);
  console.log("Deployer address:", wallet.address);
  const deployer = new Deployer(hre, wallet);

  const nft = await deployNFT(deployer);
  console.log("TrustScoreNFT deployed to:", await nft.getAddress());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
