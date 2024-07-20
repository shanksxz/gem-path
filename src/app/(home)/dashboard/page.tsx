"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"
import { CartesianGrid, XAxis, Line, LineChart, Bar, BarChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "~/components/ui/chart"

export default function Component() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Products</CardTitle>
              <CardDescription>Registered on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">12,345</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Verified Transactions</CardTitle>
              <CardDescription>Across the supply chain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">98,765</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Authenticity Rate</CardTitle>
              <CardDescription>Percentage of verified products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">97%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
              <CardDescription>Items awaiting authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">234</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Authenticity</CardTitle>
              <CardDescription>Visualize the overall authenticity rate</CardDescription>
            </CardHeader>
            <CardContent>
              <LinechartChart className="aspect-[9/4]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Transactions</CardTitle>
              <CardDescription>Track the volume of verified transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <BarchartChart className="aspect-[9/4]" />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Lookup</CardTitle>
              <CardDescription>Search for a specific product and view its history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Input type="text" placeholder="Enter product ID or serial number" className="flex-1" />
                <Button>Search</Button>
              </div>
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>0x12345abcde</TableCell>
                      <TableCell>2023-04-15</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Verified</Badge>
                      </TableCell>
                      <TableCell>New York, USA</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>0x67890fghij</TableCell>
                      <TableCell>2023-03-22</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Verified</Badge>
                      </TableCell>
                      <TableCell>London, UK</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>0xklmnopqrst</TableCell>
                      <TableCell>2023-02-08</TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending</Badge>
                      </TableCell>
                      <TableCell>Tokyo, Japan</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function BarchartChart(props : any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[300px]"
      >
        <BarChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}


function DiamondIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
    </svg>
  )
}


function LinechartChart(props : any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}


function XIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}