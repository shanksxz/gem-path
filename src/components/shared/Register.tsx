import { Card, CardContent } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Button } from "~/components/ui/button"

export default function Register() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 px-4 md:px-6">
      <div className="grid gap-6 md:gap-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Record Product on Blockchain</h1>
          <p className="text-muted-foreground mt-2 max-w-[700px] mx-auto">
            Input details about your product or diamond to have it securely recorded on the blockchain.
          </p>
        </div>
        <Card>
          <CardContent className="grid gap-6">
            <div className="grid mt-8 gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="Enter product name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your product" className="min-h-[100px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="Enter price" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="certifications">Certifications</Label>
              <Textarea id="certifications" placeholder="List any certifications" className="min-h-[100px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="provenance">Provenance</Label>
              <Textarea id="provenance" placeholder="Provide provenance details" className="min-h-[100px]" />
            </div>
            <Button type="submit" className="mt-4">
              Record on Blockchain
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}