"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { AddGuestDialog } from "./add-guest-dialog"

export function GuestsHeader() {
  const [showAddGuest, setShowAddGuest] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Guest Management</h2>
        <p className="text-muted-foreground mt-1">Manage your hotel guests and their information.</p>
      </div>
      <Button
        onClick={() => setShowAddGuest(true)}
        className="sm:self-start transition-all duration-200 hover:shadow-md"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Guest
      </Button>

      <AddGuestDialog open={showAddGuest} onOpenChange={setShowAddGuest} />
    </div>
  )
}

