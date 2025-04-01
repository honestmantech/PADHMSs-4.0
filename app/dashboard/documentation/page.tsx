"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter documentation based on search query
  const filterContent = (content: string) => {
    if (!searchQuery) return true
    return content.toLowerCase().includes(searchQuery.toLowerCase())
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground">Learn how to use PadHMS effectively with our comprehensive guides.</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="getting-started">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="guests">Guests</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to PadHMS 4.0</CardTitle>
              <CardDescription>Your comprehensive hotel management solution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                PadHMS is designed to streamline your hotel operations with an intuitive interface and powerful
                features. This documentation will help you get started and make the most of the system.
              </p>

              <h3 className="text-lg font-semibold mt-4">Quick Start Guide</h3>

              <Accordion type="single" collapsible className="w-full">
                {filterContent("dashboard overview navigation sidebar") && (
                  <AccordionItem value="dashboard">
                    <AccordionTrigger>Dashboard Overview</AccordionTrigger>
                    <AccordionContent>
                      <p>The dashboard provides a quick overview of your hotel's performance with key metrics:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Total revenue and occupancy rates</li>
                        <li>Upcoming check-ins and check-outs</li>
                        <li>Room status and availability</li>
                        <li>Recent bookings and activities</li>
                      </ul>
                      <p className="mt-2">Use the charts to track trends and make informed decisions.</p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {filterContent("navigation sidebar menu") && (
                  <AccordionItem value="navigation">
                    <AccordionTrigger>Navigation</AccordionTrigger>
                    <AccordionContent>
                      <p>The sidebar menu provides access to all main sections:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Dashboard:</strong> Overview of hotel performance
                        </li>
                        <li>
                          <strong>Rooms:</strong> Manage room inventory and details
                        </li>
                        <li>
                          <strong>Bookings:</strong> Handle reservations and availability
                        </li>
                        <li>
                          <strong>Guests:</strong> Manage guest information and history
                        </li>
                        <li>
                          <strong>Payments:</strong> Track and process payments
                        </li>
                        <li>
                          <strong>Reports:</strong> Generate and view detailed reports
                        </li>
                        <li>
                          <strong>Settings:</strong> Configure system preferences
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {filterContent("first steps setup hotel") && (
                  <AccordionItem value="first-steps">
                    <AccordionTrigger>First Steps</AccordionTrigger>
                    <AccordionContent>
                      <p>To get started with PadHMS:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Set up your hotel profile in Settings</li>
                        <li>Add your room inventory in the Rooms section</li>
                        <li>Configure user accounts and permissions</li>
                        <li>Customize appearance and notification preferences</li>
                      </ol>
                      <p className="mt-2">Once these steps are complete, you can start managing bookings and guests.</p>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Room Management</CardTitle>
              <CardDescription>Learn how to manage your hotel's room inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filterContent("add new room") && (
                  <AccordionItem value="add-room">
                    <AccordionTrigger>Adding a New Room</AccordionTrigger>
                    <AccordionContent>
                      <p>To add a new room to your inventory:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Navigate to the Rooms section</li>
                        <li>Click the "Add Room" button</li>
                        <li>Fill in the room details (number, type, capacity, etc.)</li>
                        <li>Set the room rate and status</li>
                        <li>Add amenities and description</li>
                        <li>Click "Save" to create the room</li>
                      </ol>
                      <p className="mt-2">The new room will immediately be available for bookings.</p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {filterContent("edit update room details") && (
                  <AccordionItem value="edit-room">
                    <AccordionTrigger>Editing Room Details</AccordionTrigger>
                    <AccordionContent>
                      <p>To update room information:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Find the room in the room list</li>
                        <li>Click the "Edit" button (pencil icon)</li>
                        <li>Update the necessary information</li>
                        <li>Click "Save" to apply changes</li>
                      </ol>
                      <p className="mt-2">Note: Editing a room will not affect existing bookings.</p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {filterContent("room status availability") && (
                  <AccordionItem value="room-status">
                    <AccordionTrigger>Room Status Management</AccordionTrigger>
                    <AccordionContent>
                      <p>Room statuses help you track availability:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>Available:</strong> Ready for booking
                        </li>
                        <li>
                          <strong>Occupied:</strong> Currently in use by guests
                        </li>
                        <li>
                          <strong>Maintenance:</strong> Temporarily unavailable for repairs
                        </li>
                        <li>
                          <strong>Cleaning:</strong> Being prepared for next guest
                        </li>
                        <li>
                          <strong>Out of Order:</strong> Not available for an extended period
                        </li>
                      </ul>
                      <p className="mt-2">
                        You can change a room's status by editing the room or using the quick status change option in
                        the room list.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
              <CardDescription>Learn how to manage reservations effectively</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filterContent("create new booking reservation") && (
                  <AccordionItem value="create-booking">
                    <AccordionTrigger>Creating a New Booking</AccordionTrigger>
                    <AccordionContent>
                      <p>To create a new booking:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Navigate to the Bookings section</li>
                        <li>Click the "Add Booking" button</li>
                        <li>Select a guest (or create a new one)</li>
                        <li>Choose an available room</li>
                        <li>Set check-in and check-out dates</li>
                        <li>Add guest count and special requests</li>
                        <li>Set booking status and save</li>
                      </ol>
                      <p className="mt-2">
                        The system will automatically check for room availability during the selected dates.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {filterContent("calendar view bookings") && (
                  <AccordionItem value="calendar-view">
                    <AccordionTrigger>Using the Calendar View</AccordionTrigger>
                    <AccordionContent>
                      <p>The calendar view provides a visual representation of all bookings:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Switch to calendar view using the toggle in the bookings page</li>
                        <li>View bookings by day, week, or month</li>
                        <li>Color-coded bookings indicate different statuses</li>
                        <li>Click on any booking to view details or make changes</li>
                        <li>Drag and drop to adjust booking dates (if enabled)</li>
                      </ul>
                      <p className="mt-2">
                        The calendar view is ideal for identifying availability and managing overlaps.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {filterContent("check-in check-out process") && (
                  <AccordionItem value="checkin-checkout">
                    <AccordionTrigger>Check-in and Check-out Process</AccordionTrigger>
                    <AccordionContent>
                      <p>To process guest arrivals and departures:</p>
                      <h4 className="font-semibold mt-2">Check-in:</h4>
                      <ol className="list-decimal pl-6 mt-1 space-y-1">
                        <li>Find the booking in the upcoming check-ins list</li>
                        <li>Click "Check-in" to start the process</li>
                        <li>Verify guest details and collect ID if needed</li>
                        <li>Assign room keys and provide information</li>
                        <li>Complete the check-in to update room status</li>
                      </ol>

                      <h4 className="font-semibold mt-3">Check-out:</h4>
                      <ol className="list-decimal pl-6 mt-1 space-y-1">
                        <li>Find the booking in the due check-outs list</li>
                        <li>Click "Check-out" to start the process</li>
                        <li>Review any outstanding charges</li>
                        <li>Process final payment if needed</li>
                        <li>Complete check-out to free up the room</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guests" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Guest Management</CardTitle>
              <CardDescription>Learn how to manage guest information and history</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filterContent("add new guest profile") && (
                  <AccordionItem value="add-guest">
                    <AccordionTrigger>Adding a New Guest</AccordionTrigger>
                    <AccordionContent>
                      <p>To add a new guest to your database:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Navigate to the Guests section</li>
                        <li>Click the "Add Guest" button</li>
                        <li>Enter guest personal information</li>
                        <li>Add contact details and preferences</li>
                        <li>Include any notes or special requirements</li>
                        <li>Save the guest profile</li>
                      </ol>
                      <p className="mt-2">You can also add a guest directly during the booking process.</p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {filterContent("guest history bookings") && (
                  <AccordionItem value="guest-history">
                    <AccordionTrigger>Viewing Guest History</AccordionTrigger>
                    <AccordionContent>
                      <p>To access a guest's stay history:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Find the guest in the guest list</li>
                        <li>Click on their name or the "View" button</li>
                        <li>Navigate to the "History" tab</li>
                      </ol>
                      <p className="mt-2">The history section shows:</p>
                      <ul className="list-disc pl-6 mt-1 space-y-1">
                        <li>Past and upcoming bookings</li>
                        <li>Payment history</li>
                        <li>Special requests patterns</li>
                        <li>Room preferences</li>
                      </ul>
                      <p className="mt-2">This information helps provide personalized service to returning guests.</p>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure your PadHMS system to match your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filterContent("hotel profile settings") && (
                  <AccordionItem value="hotel-profile">
                    <AccordionTrigger>Hotel Profile Settings</AccordionTrigger>
                    <AccordionContent>
                      <p>Configure your hotel information:</p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Navigate to Settings &gt; Hotel</li>
                        <li>Enter your hotel name, address, and contact details</li>
                        <li>Set your hotel's star rating and property type</li>
                        <li>Upload your hotel logo</li>
                        <li>Add tax rates and policies</li>
                        <li>Save your changes</li>
                      </ol>
                      <p className="mt-2">
                        This information appears on receipts, confirmations, and other guest communications.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {filterContent("appearance theme settings") && (
                  <AccordionItem value="appearance">
                    <AccordionTrigger>Appearance Settings</AccordionTrigger>
                    <AccordionContent>
                      <p>Customize the look and feel of your PadHMS:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Choose between light and dark mode</li>
                        <li>Select accent colors that match your brand</li>
                        <li>Adjust layout preferences</li>
                        <li>Configure dashboard widgets and order</li>
                      </ul>
                      <p className="mt-2">
                        Your appearance settings are saved per user, so each staff member can customize their own
                        experience.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {filterContent("security password settings") && (
                  <AccordionItem value="security">
                    <AccordionTrigger>Security Settings</AccordionTrigger>
                    <AccordionContent>
                      <p>Manage security options:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Change your password regularly</li>
                        <li>Enable two-factor authentication</li>
                        <li>Manage API keys and integrations</li>
                        <li>View login history and active sessions</li>
                      </ul>
                      <p className="mt-2">
                        We recommend updating your password every 90 days and enabling two-factor authentication for
                        maximum security.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>Contact our support team or explore additional resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto flex flex-col items-center p-4 space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 mb-2"
              >
                <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
                <path d="M12 13v8"></path>
                <path d="M5 13v6a2 2 0 0 0 2 2h8"></path>
              </svg>
              <span className="font-medium">Contact Support</span>
              <span className="text-sm text-muted-foreground text-center">Reach out to our dedicated support team</span>
            </Button>

            <Button variant="outline" className="h-auto flex flex-col items-center p-4 space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 mb-2"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span className="font-medium">User Manual</span>
              <span className="text-sm text-muted-foreground text-center">Download the complete user guide</span>
            </Button>

            <Button variant="outline" className="h-auto flex flex-col items-center p-4 space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 mb-2"
              >
                <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M17 12h-6"></path>
                <path d="M14 9l3 3-3 3"></path>
              </svg>
              <span className="font-medium">Video Tutorials</span>
              <span className="text-sm text-muted-foreground text-center">Watch step-by-step video guides</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

