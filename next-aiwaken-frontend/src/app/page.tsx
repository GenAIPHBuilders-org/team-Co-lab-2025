"use client"
import Link from "next/link"
import { ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserCard } from "@/components/user-card"

export default function HomePage() {
  return (
    <div className="flex w-full h-screen p-14 flex-col ">
      <header className="z-40 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-purple-500" />
            <span className="text-2xl font-bold tracking-tighter text-white">
              AI<span className="text-purple-500">WAKEN</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" passHref>
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/registration" passHref>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header >


      <section className=" py-24 md:py-32 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-900/20 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-900/20 blur-3xl"></div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="bg-purple-600 text-white hover:bg-purple-700">Level Up Your Education</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                Arise from the <span className="text-purple-500">Shadow</span> of Ignorance
              </h1>
              <p className="text-xl text-gray-300 max-w-[600px]">
                A gamified learning platform inspired by Solo Leveling. Gain knowledge, complete quests, and level up
                with our AI-powered educational system.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
              >
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">10K+</span>
                <span className="text-gray-400">Students</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">200+</span>
                <span className="text-gray-400">Courses</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">95%</span>
                <span className="text-gray-400">Success Rate</span>
              </div>
            </div>
          </div>
          {/* <UserCard /> */}
        </div>
      </section>
    </div >
  )
}
