"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ControlledInput, Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, User, Lock } from "lucide-react"
import { RegistrationFormValues, registrationSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false)


    const methods = useForm<RegistrationFormValues>({
        mode: "all",
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const { control } = methods


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
          <div className="mx-auto mb-4 h-12 w-12 overflow-hidden rounded-full border-2 border-purple-500 bg-purple-950 flex items-center justify-center">
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
              className="text-purple-400"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Awaken your skills</CardTitle>
          <CardDescription className="text-purple-300">
            Register to join the ranks of hunters and level up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-purple-300">
                  Hunter Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
                  <Input
                    id="username"
                    placeholder="Sung Jin-Woo"
                    required
                    className="pl-10 bg-gray-800 border-[#7b2cbf] text-white focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                              <ControlledInput
                                  control={control}
                                  name="email"
                                  label="Email"
                                  type="email"
                              
                              />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-purple-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
                  <Input
                    id="password"
                    type="password"
                    required
                    className="pl-10 bg-gray-800 border-purple-800 text-white focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? "Registering..." : "Register"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </CardFooter>
      </Card>

      <div
        id="system-notification"
        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-900 border border-blue-500 text-blue-100 px-6 py-3 rounded shadow-lg transition-opacity duration-300 opacity-0 flex items-center"
      >
        <div className="mr-3 text-blue-300 text-xl font-bold">!</div>
        <div>
          <div className="text-sm font-semibold text-blue-300">SYSTEM</div>
          <div className="text-white">Hunter registration complete. You can now log in.</div>
        </div>
      </div>
    </>
  )
}
