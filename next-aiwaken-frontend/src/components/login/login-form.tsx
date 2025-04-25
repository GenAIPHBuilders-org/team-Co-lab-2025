"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, User, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      // Show success notification
      const notification = document.getElementById("system-notification")
      if (notification) {
        notification.classList.remove("opacity-0")
        notification.classList.add("opacity-100")

        setTimeout(() => {
          notification.classList.remove("opacity-100")
          notification.classList.add("opacity-0")
        }, 3000)
      }
    }, 1500)
  }

  return (
    <>
      <Card className="border-purple-900 bg-gray-900 shadow-xl shadow-purple-900/20">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 h-12 w-12 overflow-hidden rounded-full border-2 border-blue-500 bg-blue-950 flex items-center justify-center">
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
              className="text-blue-400"
            >
              <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
              <line x1="16" x2="22" y1="19" y2="19" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Hunter Login</CardTitle>
          <CardDescription className="text-blue-300">
            Access your hunter profile and continue your journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-blue-300">
                  Hunter ID
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input
                    id="username"
                    placeholder="Email or username"
                    required
                    className="pl-10 bg-gray-800 border-blue-800 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input
                    id="password"
                    type="password"
                    required
                    className="pl-10 bg-gray-800 border-blue-800 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Link href="#" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? "Logging in..." : "Login"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
          <div className="text-center text-sm text-gray-400">
            Don&apos;t have a hunter account?{" "}
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>

      <div
        id="system-notification"
        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-900 border border-blue-500 text-blue-100 px-6 py-3 rounded shadow-lg transition-opacity duration-300 opacity-0 flex items-center"
      >
        <div className="mr-3 text-blue-300 text-xl font-bold">!</div>
        <div>
          <div className="text-sm font-semibold text-blue-300">SYSTEM</div>
          <div className="text-white">Login successful. Welcome back, Hunter.</div>
        </div>
      </div>
    </>
  )
}
