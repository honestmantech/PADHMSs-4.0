"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Copy, Key } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function EnvVariablesHelper() {
  const [copied, setCopied] = useState<string | null>(null)

  const envVariables = [
    {
      name: "DATABASE_URL",
      description: "Your Supabase project URL",
      example: "https://your-project-id.supabase.co",
      required: true,
    },
    {
      name: "JWT_SECRET",
      description: "Your Supabase anon key",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      required: true,
    },
    {
      name: "SUPABASE_SERVICE_ROLE_KEY",
      description: "Your Supabase service role key (needed to bypass RLS)",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      required: true,
    },
  ]

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
        <CardDescription>Make sure you have set up these environment variables in your Vercel project</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="default" className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-600">Important</AlertTitle>
          <AlertDescription className="text-yellow-600">
            The SUPABASE_SERVICE_ROLE_KEY is required to bypass Row Level Security (RLS) policies for user management.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {envVariables.map((variable) => (
            <div key={variable.name} className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Key className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="font-mono text-sm">{variable.name}</span>
                  {variable.required && (
                    <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Required</span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(variable.name, variable.name)}
                  className="flex items-center gap-1"
                >
                  {copied === variable.name ? (
                    <>
                      <CheckCircle className="h-3 w-3" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-1">{variable.description}</p>
              <div className="mt-2 bg-gray-100 p-2 rounded font-mono text-xs">
                <code>{variable.example}</code>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">
          You can find these values in your Supabase project settings under API. The service role key is in the same
          section as the anon key.
        </p>
      </CardFooter>
    </Card>
  )
}

