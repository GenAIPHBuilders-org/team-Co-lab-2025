"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ControlledInput } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, User, Lock } from "lucide-react"
import { RegistrationFormValues, registrationSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { RegistrationIcon } from "../icons/registration-icon"

export default function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
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

  const { control, handleSubmit, watch } = methods;

  console.log(watch());


  async function onSubmit(values: RegistrationFormValues) {
    try {
      setIsSubmitted(true)
      console.log("Form submitted:", values)
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSubmitted(false)

    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }


  return (
    <FormProvider {...methods}>
      <Card className="border-[#9600ff] bg-gray-900 shadow-xl shadow-purple-[#9600ff20]">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 h-12 w-12 overflow-hidden rounded-full border-2 border-purple-500 bg-purple-950 flex items-center justify-center">
            <RegistrationIcon />
          </div>
          <CardTitle className="text-2xl font-bold text-[#9600ff]">Awaken your AI companion</CardTitle>
          <CardDescription className="text-slate-300">
            Learn with your AI companion by your side. Join us in this epic battle and unlock the power of AI to help you on your journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <ControlledInput
                control={control}
                name="username"
                label="Username"
                type="text"
                icon={<User className="h-4 w-4 text-purple-500" />}
                className="pl-10 bg-gray-800 border-[#7b2cbf] text-white focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <ControlledInput
                control={control}
                name="email"
                label="Email"
                type="email"
                icon={<User className="h-4 w-4 text-purple-500" />}
                className="pl-10 bg-gray-800 border-[#7b2cbf] text-white focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <ControlledInput
                control={control}
                name="password"
                label="Password"
                type="password"
                icon={<Lock className="h-4 w-4 text-purple-500" />}
                className="pl-10 bg-gray-800 border-[#7b2cbf] text-white focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <ControlledInput
                control={control}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                icon={<Lock className="h-4 w-4 text-purple-500" />}
                className="pl-10 bg-gray-800 border-[#7b2cbf] text-white focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitted}
            className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center">
              {isSubmitted ? "Registering..." : "Register"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </CardFooter>
      </Card>
      {isSubmitted && (
        <div
          className="fixed top-4 opacity-100 left-1/2 transform -translate-x-1/2 bg-blue-900 border border-blue-500 text-blue-100 px-6 py-3 rounded shadow-lg transition-opacity duration-300  flex items-center"
        >
          <div className="mr-3 text-blue-300 text-xl font-bold">!</div>
          <div>
            <div className="text-sm font-semibold text-blue-300">SYSTEM</div>
            <div className="text-white">Hunter registration complete. You can now log in.</div>
          </div>
        </div>
      )}

    </FormProvider>
  )
}
