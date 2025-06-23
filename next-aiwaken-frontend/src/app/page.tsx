"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Brain, BookOpen, Star, Sparkles, Trophy, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Header */}
      <header className="relative z-20 w-full">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-purple-400" size={24} />
              <span className="text-xl font-bold text-white">AIWaken</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10" asChild>
                <a href="/login">Login</a>
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                <a href="/registration">Sign Up</a>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-purple-500/30 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-pink-500/30 rounded-lg opacity-60"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 bg-orange-500/30 rounded-full opacity-60"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fillOpacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="absolute -top-10 -left-10 text-purple-400"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Brain size={32} />
          </motion.div>

          <motion.div
            className="absolute top-20 -right-10 text-pink-400"
            animate={{
              y: [0, 10, 0],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <BookOpen size={28} />
          </motion.div>

          <motion.div
            className="absolute -bottom-5 left-10 text-orange-400"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Trophy size={24} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Sparkles className="text-purple-500" size={24} />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AIWaken
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Your Personalized{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              AI Learning
            </span>{" "}
            Companion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Generate custom courses, tackle interactive quizzes, and conquer epic boss fights while your AI companion
            evolves alongside your learning journey.
            <span className="text-purple-600 font-semibold ml-2">Level up your knowledge!</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <Button
              onClick={() => router.push("/registration")}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="bg-slate-900 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Custom Courses</h3>
              <p className="text-gray-400 text-sm">Tailored learning paths that adapt to your pace and interests</p>
            </div>

            <div className="bg-slate-900 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="text-pink-600" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Interactive Quizzes</h3>
              <p className="text-gray-400 text-sm">Engaging challenges that make learning fun and memorable</p>
            </div>

            <div className="bg-slate-900  backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Trophy className="text-orange-600" size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Epic Boss Fights</h3>
              <p className="text-gray-400 text-sm">Conquer challenging scenarios to prove your mastery</p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 fill-gray-900">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>
    </div>
  )
}
