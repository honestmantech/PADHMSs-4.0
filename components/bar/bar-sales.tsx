"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase-client"

export function BarSales() {
  const [sales, setSales] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchSales() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("bar_sales")
          .select("*, customer:customers(name)")
          .order("transaction_date", { ascending: false })

        if (error) {
          console.error("Error fetching bar sales:", error)
          return
        }

        setSales(data || [])
      } catch (error) {
        console.error("Failed to fetch bar sales:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [])

  const filteredSales = sales.filter(
    (sale) =>
      sale.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.payment_method.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total_amount, 0)
  const totalItems = filteredSales.reduce((sum, sale) => sum + sale.item_count, 0)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{totalSales.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredSales.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Items Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Calendar className="h-4 w-4 mr-2" />
            Filter Date
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.length > 0 ? (
                filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.transaction_id}</TableCell>
                    <TableCell>{new Date(sale.transaction_date).toLocaleDateString()}</TableCell>
                    <TableCell>{sale.customer?.name || "Walk-in"}</TableCell>
                    <TableCell>{sale.item_count}</TableCell>
                    <TableCell>{sale.payment_method}</TableCell>
                    <TableCell>
                      <Badge variant={sale.status === "completed" ? "success" : "warning"} className="capitalize">
                        {sale.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">₵{sale.total_amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    {searchQuery ? "No transactions match your search" : "No transactions recorded"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default BarSales

