import { ethers } from "hardhat";

async function main() {
    const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your deployed contract address

    const DiamondTracking = await ethers.getContractFactory("DiamondTracking");
    const diamondTracking = DiamondTracking.attach(contractAddress);

    // Set values
    const setValuesTx = await diamondTracking.setValues(10, "diamond_1", 5);
    await setValuesTx.wait();
    console.log("Diamond values set");

    // Set sender values


    // Show sender
    const senderInfo = await diamondTracking.showSender();
    console.log("Sender info:", senderInfo);
}

main().catch((error) => {
    console.error("Error interacting with contract:", error);
    process.exitCode = 1;
});
