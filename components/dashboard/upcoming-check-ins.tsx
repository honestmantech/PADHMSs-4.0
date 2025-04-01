"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Sample data - in a real app, this would come from your API
const checkIns = [
  {
    id: "CI001",
    guestName: "John Smith",
    roomNumber: "101",
    checkInTime: "14:00",
    status: "Expected",
  },
  {
    id: "CI002",
    guestName: "Sarah Johnson",
    roomNumber: "205",
    checkInTime: "15:30",
    status: "Expected",
  },
  {
    id: "CI003",
    guestName: "Michael Brown",
    roomNumber: "310",
    checkInTime: "16:00",
    status: "Expected",
  },
]

export function UpcomingCheckIns() {
  return (
    <div className="space-y-3">
      {checkIns.map((checkIn) => (
        <div key={checkIn.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary">
                {checkIn.guestName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{checkIn.guestName}</div>
              <div className="text-xs text-muted-foreground">
                Room {checkIn.roomNumber} • {checkIn.checkInTime}
              </div>
            </div>
          </div>
          <Button size="sm" variant="outline">
            Check In
          </Button>
        </div>
      ))}
    </div>
  )
}

