import { EnvVariablesHelper } from "@/components/admin/env-variables-helper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SetupPage() {
  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">System Setup</h1>

      <div className="grid grid-cols-1 gap-6">
        <EnvVariablesHelper />

        <Card>
          <CardHeader>
            <CardTitle>Row Level Security (RLS) Issue</CardTitle>
            <CardDescription>Understanding and fixing the infinite recursion error</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              The error "infinite recursion detected in policy for relation users" occurs when there's a circular
              reference in your Supabase RLS policies. This happens because the policy is trying to check
              authentication, which requires querying the users table, which triggers the policy again.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Solution 1: Use Service Role Key</h3>
                <p className="text-sm text-muted-foreground">
                  The service role key bypasses RLS policies, allowing you to perform user management operations without
                  triggering the infinite recursion. Make sure to add the SUPABASE_SERVICE_ROLE_KEY to your environment
                  variables.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Solution 2: Modify RLS Policies</h3>
                <p className="text-sm text-muted-foreground">
                  If you have access to your Supabase project, you can modify the RLS policies on the users table to
                  prevent the recursion. For example, you can create a policy that allows unauthenticated access for
                  specific operations.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant="outline">
              <Link href="https://supabase.com/docs/guides/auth/row-level-security" target="_blank">
                Learn About RLS
              </Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Continue to Signup</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

