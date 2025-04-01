"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "./profile-settings"
import { HotelSettings } from "./hotel-settings"
import { SecuritySettings } from "./security-settings"
import { NotificationSettings } from "./notification-settings"
import { BillingSettings } from "./billing-settings"
import { AppearanceSettings } from "./appearance-settings"

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="hotel">Hotel</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileSettings />
      </TabsContent>
      <TabsContent value="hotel">
        <HotelSettings />
      </TabsContent>
      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>
      <TabsContent value="billing">
        <BillingSettings />
      </TabsContent>
      <TabsContent value="appearance">
        <AppearanceSettings />
      </TabsContent>
    </Tabs>
  )
}

