import { ethers } from "hardhat";

async function main() {
  console.log("Deploying TokenFactory...");

  // Get the contract factory
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  
  // Deploy the contract
  const tokenFactory = await TokenFactory.deploy();
  
  // Wait for deployment to finish
  await tokenFactory.waitForDeployment();
  
  const address = await tokenFactory.getAddress();
  
  console.log("TokenFactory deployed to:", address);
  console.log("Network:", (await ethers.provider.getNetwork()).name);
  console.log("Deployer:", (await ethers.getSigners())[0].address);
  
  // Verify the deployment
  console.log("Waiting for block confirmations...");
  await tokenFactory.deploymentTransaction()?.wait(6);
  console.log("Confirmed 6 blocks");
  
  // Log deployment info
  console.log("\n=== Deployment Summary ===");
  console.log("Contract: TokenFactory");
  console.log("Address:", address);
  console.log("Network:", (await ethers.provider.getNetwork()).name);
  console.log("Deployer:", (await ethers.getSigners())[0].address);
  console.log("Gas Used:", tokenFactory.deploymentTransaction()?.gasLimit?.toString());
  
  // Save deployment info
  const deploymentInfo = {
    contract: "TokenFactory",
    address: address,
    network: (await ethers.provider.getNetwork()).name,
    deployer: (await ethers.getSigners())[0].address,
    timestamp: new Date().toISOString(),
  };
  
  console.log("\nDeployment info saved to deployment-info.json");
  
  return address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

