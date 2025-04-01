"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, CreditCard, DollarSign, Receipt, TrendingUp } from "lucide-react"

export function PaymentsStats() {
  // In a real app, this data would come from your API
  const stats = {
    totalRevenue: 45250,
    pendingPayments: 3200,
    recentTransactions: 18,
    monthlyGrowth: 12.5,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₵{stats.totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium inline-flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              8.2%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₵{stats.pendingPayments.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-amber-500 font-medium inline-flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              4.1%
            </span>{" "}
            from last week
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.recentTransactions}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium inline-flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              12%
            </span>{" "}
            from yesterday
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.monthlyGrowth}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-red-500 font-medium inline-flex items-center">
              <ArrowDownIcon className="h-3 w-3 mr-1" />
              2.3%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

