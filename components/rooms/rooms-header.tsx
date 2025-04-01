"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { AddRoomDialog } from "./add-room-dialog"

export function RoomsHeader() {
  const [showAddRoom, setShowAddRoom] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Rooms Management</h2>
        <p className="text-muted-foreground">Manage your hotel rooms, view status, and update details.</p>
      </div>
      <Button onClick={() => setShowAddRoom(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Room
      </Button>

      <AddRoomDialog open={showAddRoom} onOpenChange={setShowAddRoom} />
    </div>
  )
}

