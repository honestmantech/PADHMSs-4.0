"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { AddPaymentDialog } from "./add-payment-dialog"

export function PaymentsHeader() {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">Manage payment transactions and financial records</p>
      </div>
      <Button onClick={() => setShowAddDialog(true)} className="sm:w-auto w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Record Payment
      </Button>

      <AddPaymentDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}

