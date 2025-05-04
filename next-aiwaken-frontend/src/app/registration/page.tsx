"use client"

import { OnboardingStepper } from "@/components/on-boarding-stepper"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <OnboardingStepper />
      </div>
    </main>
  )
}
