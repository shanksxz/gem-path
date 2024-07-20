
"use client"
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select"
import { Input } from "~/components/ui/input"
import { v4 as uuidV4 } from "uuid";
import { ethers } from "ethers";
import { Link } from "lucide-react";
import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

export default function Register() {

    const session = useSession()
    const [id, setId] = useState<string>("");
    const uuid = uuidV4();

    const abi = [
        "function setValues(uint256 _size, string memory _id, uint256 weight) public",
        "function getId() public view returns (string memory)",
    ]

      
      const foo = async () => {
          if(!window.ethereum) {
              alert("Please install MetaMask");
              return;
          }
            try {                
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
    
                const contract = new ethers.Contract("0xEE609aa2bb8843308e9292676E6E190fcFe095cb", abi, signer);
    
                // generate random id
                const tx = await (contract as any).setValues(10, uuid, 100);
                await tx.wait();
    
                const id = await (contract as any).getId();
                console.log("djvdvj",id);
                setId(id);
    
                console.log(id);
            } catch (error) {
                console.log(error);
            }
        }

  return (
    <div className="w-full max-w-4xl mx-auto">
       <header className="flex items-center justify-between py-4 px-6 bg-background border-b">
        <Link href="/">
          Diamond Platform
        </Link>
        <Button onClick={() => foo()} size="sm">
            {id ? "Connected" : "Connect Wallet"}
        </Button>
      </header>
      <main className="py-8 px-6">
        <h1 className="text-3xl font-bold mb-6">Upload Diamond Properties</h1>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cut">Cut</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select cut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ideal">Ideal</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="very-good">Very Good</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="d">D</SelectItem>
                  <SelectItem value="e">E</SelectItem>
                  <SelectItem value="f">F</SelectItem>
                  <SelectItem value="g">G</SelectItem>
                  <SelectItem value="h">H</SelectItem>
                  <SelectItem value="i">I</SelectItem>
                  <SelectItem value="j">J</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clarity">Clarity</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select clarity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fl">FL</SelectItem>
                  <SelectItem value="if">IF</SelectItem>
                  <SelectItem value="vvs1">VVS1</SelectItem>
                  <SelectItem value="vvs2">VVS2</SelectItem>
                  <SelectItem value="vs1">VS1</SelectItem>
                  <SelectItem value="vs2">VS2</SelectItem>
                  <SelectItem value="si1">SI1</SelectItem>
                  <SelectItem value="si2">SI2</SelectItem>
                  <SelectItem value="i1">I1</SelectItem>
                  <SelectItem value="i2">I2</SelectItem>
                  <SelectItem value="i3">I3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="carat">Carat</Label>
              <Input id="carat" type="number" step="0.01" placeholder="Enter carat" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <Input id="documents" type="file" multiple />
          </div>
          <Button type="submit" className="w-full" 
            onClick={() => 
                {
                    if(session.data?.user?.email) {
                        toast.success("Diamond properties submitted successfully");
                        return;
                    }
                    toast.error("Please login to submit diamond properties");
                }
            }>
            Submit Diamond Properties
          </Button>
        </form>
      </main>
    </div>
  )
}

