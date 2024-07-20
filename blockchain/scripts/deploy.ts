import { ethers } from "hardhat";


async function main() {
    try {
        // Get the contract factory for "DiamondTracking"
        const DiamondTracking = await ethers.getContractFactory("DiamondTracking");

        // Deploy the contract
        console.log("Deploying Contract...");
        const trackDiamonds = await DiamondTracking.deploy();

        // Wait for the contract to be deployed
        await trackDiamonds.waitForDeployment();
        console.log("Contract deployed to:", await trackDiamonds.getAddress());
    } catch (error) {
        console.error("Error deploying contract:", error);
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error("Unhandled error:", error);
    process.exitCode = 1;
});
