"use client"

import { ethers } from "ethers";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        ethereum: any;
    }
}


export default function Page() {

    const [id, setId] = useState<string>("");

    const abi = [
        "function setValues(uint256 _size, string memory _id, uint256 weight) public",
        "function getId() public view returns (string memory)",
    ]

    useEffect(() => {
        if(!window.ethereum) {
            alert("Please install MetaMask");
            return;
        }

        const foo = async () => {
            try {                
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
    
                const contract = new ethers.Contract("0xEE609aa2bb8843308e9292676E6E190fcFe095cb", abi, signer);
    
                const tx = await (contract as any).setValues(10, "123", 100);
                await tx.wait();
    
                const id = await (contract as any).getId();
                setId(id);
    
                console.log(id);
            } catch (error) {
                console.log(error);
            }
        }

        foo();
    }, [])
    
    return (
        <>
            <h1>Wallet</h1>
            <h2>{id}</h2>
        </>
    )
}