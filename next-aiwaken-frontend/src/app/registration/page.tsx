"use client"

import RegistrationForm from "@/components/registration/registration-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <RegistrationForm />
      </div>
    </main>
  )
}
