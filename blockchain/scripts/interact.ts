import { ethers } from "hardhat";
import { v4 as uuid } from "uuid"


async function main() {
    const contractAddress = "0x57897bB09DB74ecc9C390C0ffC8539397a76d288"; // Replace with your deployed contract address

    const DiamondTracking = await ethers.getContractFactory("DiamondTracking");
    const diamondTracking = DiamondTracking.attach(contractAddress);

    // Set values
    const setValuesTx = await diamondTracking.setValues(10, `${uuid()}`, 5);
    await setValuesTx.wait();
    console.log("Diamond values set");

    const setSenderValuesTx = await diamondTracking.setSenderValues("New York");
    await setSenderValuesTx.wait();
    console.log("Sender values set");

    // Get data
    const location = await diamondTracking.getData();
    const id = await diamondTracking.getId();
    console.log("Data:", location.toString());
    console.log("getId", id.toString())
}

main().catch((error) => {
    console.error("Error interacting with contract:", error);
    process.exitCode = 1;
});
