"use client"

import { format } from "date-fns"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

interface BarItem {
  id: string
  name: string
  category: string
  price: number
  cost: number
  stock_quantity: number
  description?: string
  unit: string
  created_at: string
  updated_at: string
}

interface ViewBarItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  barItem: BarItem | null
}

export function ViewBarItemDialog({ open, onOpenChange, barItem }: ViewBarItemDialogProps) {
  if (!barItem) return null

  const profit = barItem.price - barItem.cost
  const profitMargin = (profit / barItem.price) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Bar Item Details</DialogTitle>
          <DialogDescription>Detailed information about this bar item.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{barItem.name}</h3>
            <Badge>{barItem.category}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-3">
                <CardTitle className="text-sm">Selling Price</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-lg font-semibold">{formatCurrency(barItem.price)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-3">
                <CardTitle className="text-sm">Cost Price</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-lg font-semibold">{formatCurrency(barItem.cost)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Profit Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Profit per unit</p>
                  <p className="text-lg font-semibold">{formatCurrency(profit)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profit margin</p>
                  <p className="text-lg font-semibold">{profitMargin.toFixed(2)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Inventory</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current stock</p>
                  <p className="text-lg font-semibold">
                    {barItem.stock_quantity} {barItem.unit}
                    {barItem.stock_quantity !== 1 ? "s" : ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stock value</p>
                  <p className="text-lg font-semibold">{formatCurrency(barItem.stock_quantity * barItem.cost)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {barItem.description && (
            <Card>
              <CardHeader className="p-3">
                <CardTitle className="text-sm">Description</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p>{barItem.description}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="text-sm">{format(new Date(barItem.created_at), "PPP")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last updated</p>
                  <p className="text-sm">{format(new Date(barItem.updated_at), "PPP")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

