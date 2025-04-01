"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Sample data - in a real app, this would come from your database
const inventoryItems = [
  { id: 1, name: "Whiskey", category: "Spirits", quantity: 15, unit: "Bottles", reorderLevel: 5 },
  { id: 2, name: "Vodka", category: "Spirits", quantity: 20, unit: "Bottles", reorderLevel: 5 },
  { id: 3, name: "Gin", category: "Spirits", quantity: 12, unit: "Bottles", reorderLevel: 4 },
  { id: 4, name: "Rum", category: "Spirits", quantity: 10, unit: "Bottles", reorderLevel: 3 },
  { id: 5, name: "Beer", category: "Beer", quantity: 48, unit: "Bottles", reorderLevel: 12 },
  { id: 6, name: "Wine", category: "Wine", quantity: 24, unit: "Bottles", reorderLevel: 6 },
  { id: 7, name: "Tequila", category: "Spirits", quantity: 8, unit: "Bottles", reorderLevel: 3 },
  { id: 8, name: "Brandy", category: "Spirits", quantity: 6, unit: "Bottles", reorderLevel: 2 },
]

export function BarInventory() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bar Inventory</CardTitle>
        <CardDescription>Manage your bar stock and inventory levels</CardDescription>
        <div className="flex items-center gap-2 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inventory..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Reorder Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.reorderLevel}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.quantity <= item.reorderLevel ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.quantity <= item.reorderLevel ? "Low Stock" : "In Stock"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
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
export default BarInventory

