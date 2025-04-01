import { Suspense } from "react"
import { SettingsHeader } from "@/components/settings/settings-header"
import { SettingsTabs } from "@/components/settings/settings-tabs"
import { SettingsSkeleton } from "@/components/settings/settings-skeleton"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsHeader />

      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsTabs />
      </Suspense>
    </div>
  )
}

