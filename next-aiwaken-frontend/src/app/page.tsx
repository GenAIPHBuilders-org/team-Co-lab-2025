import Link from "next/link"
import { ArrowRight, Brain, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="flex w-full h-screen p-16 flex-col ">
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
            <Link href="/register" passHref>
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
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
              <div className="bg-gray-900 p-6 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Hunter Rank</h3>
                        <p className="text-sm text-gray-400">E-Rank Hunter</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30">Level 5</Badge>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Experience</span>
                        <span className="text-gray-300">250/500 XP</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-500 w-1/2"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-gray-300">Intelligence</span>
                        </div>
                        <span className="text-2xl font-bold text-white">42</span>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-gray-300">Wisdom</span>
                        </div>
                        <span className="text-2xl font-bold text-white">38</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Current Quest</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Advanced AI Concepts</span>
                        <span className="text-sm text-gray-400">3/5 completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>
    </div >
  )
}
