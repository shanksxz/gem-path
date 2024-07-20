"use client"

import { useState, ChangeEvent } from "react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"

// Define TypeScript interfaces
interface ProductHistory {
  date: string;
  event: string;
}

interface ProductDetails {
  name: string;
  description: string;
  price: number;
  authenticity: boolean;
  history: ProductHistory[];
}

export default function Component() {
  const [productId, setProductId] = useState<string>("")
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null)

  const handleSearch = async () => {
    try {
      const details = await fetchProductDetails(productId)
      setProductDetails(details)
    } catch (error) {
      console.error("Error fetching product details:", error)
    }
  }

  const fetchProductDetails = async (id: string): Promise<ProductDetails> => {
    // Simulate an API call to fetch product details
    return {
      name: "Brilliant Diamond",
      description: "A flawless, high-quality diamond",
      price: 10000,
      authenticity: true,
      history: [
        { date: "2023-04-01", event: "Mined" },
        { date: "2023-04-15", event: "Certified" },
        { date: "2023-05-01", event: "Sold to Retailer" },
        { date: "2023-06-01", event: "Sold to Customer" },
      ],
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value)
  }

  return (
    <section className="flex justify-center items-center h-[80vh]">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Diamond Tracking</h1>
        <div className="flex items-center mb-6">
          <Input
            type="text"
            placeholder="Enter product ID"
            value={productId}
            onChange={handleInputChange}
            className="flex-1 mr-4"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        {productDetails && (
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{productDetails.name}</CardTitle>
                <CardDescription>{productDetails.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div>
                    <span className="font-medium">Price:</span> ${productDetails.price.toFixed(2)}
                  </div>
                  <div>
                    <span className="font-medium">Authenticity:</span>{" "}
                    {productDetails.authenticity ? (
                      <Badge variant="default">Authentic</Badge>
                    ) : (
                      <Badge variant="default">Not Authentic</Badge>
                    )}
                  </div>
                  <div>
                    <span className="font-medium">Blockchain History:</span>
                    <ul className="list-disc pl-6">
                      {productDetails.history.map((event, index) => (
                        <li key={index}>
                          {event.date}: {event.event}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
