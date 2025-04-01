"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Calendar } from "lucide-react"

// Sample data - in a real app, this would come from your database
const salesData = [
  { id: 1, date: "2023-10-01", item: "Whiskey", quantity: 3, amount: 450, customer: "Room 101" },
  { id: 2, date: "2023-10-01", item: "Beer", quantity: 5, amount: 250, customer: "Bar Customer" },
  { id: 3, date: "2023-10-02", item: "Wine", quantity: 2, amount: 380, customer: "Room 205" },
  { id: 4, date: "2023-10-02", item: "Gin & Tonic", quantity: 4, amount: 320, customer: "Bar Customer" },
  { id: 5, date: "2023-10-03", item: "Vodka", quantity: 2, amount: 300, customer: "Room 118" },
  { id: 6, date: "2023-10-03", item: "Cocktail", quantity: 6, amount: 720, customer: "Bar Customer" },
  { id: 7, date: "2023-10-04", item: "Rum", quantity: 3, amount: 390, customer: "Room 302" },
  { id: 8, date: "2023-10-04", item: "Beer", quantity: 8, amount: 400, customer: "Bar Customer" },
]

export function BarSales() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSales = salesData.filter(
    (sale) =>
      sale.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate total sales
  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.amount, 0)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bar Sales</CardTitle>
        <CardDescription>Track and manage your bar sales transactions</CardDescription>
        <div className="flex items-center gap-2 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search sales..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </Button>
          <Button variant="outline">Export</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <div className="text-sm text-muted-foreground">Total Sales</div>
          <div className="text-2xl font-bold">₵{totalSales.toFixed(2)}</div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount (₵)</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.date}</TableCell>
                <TableCell className="font-medium">{sale.item}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>₵{sale.amount.toFixed(2)}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Add default export that points to the same component
export default BarSales

