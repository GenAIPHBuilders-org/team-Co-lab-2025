"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Brain, Zap, Award, ArrowRight, RefreshCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { TokenStorage } from "@/lib/token-storage"
import { CompanionAvatar } from "@/components/companion-avatar"

export default function Quiz() {
  const companion = TokenStorage.getUserCompanion();
  const quizData = TokenStorage.getSummaryConclusion();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [bossHealth, setBossHealth] = useState(100)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameState, setGameState] = useState<"intro" | "playing" | "completed">("intro")
  const [score, setScore] = useState(0)
  const [damageAnimation, setDamageAnimation] = useState(false)

  if (!quizData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
        <Card className="bg-purple-950/80 border-purple-500 text-white">
          <CardContent>
            <p className="text-center">Loading quiz data...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = quizData.quiz[currentQuestionIndex]
  const totalQuestions = quizData.quiz.length

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answer)
    const correct = answer === currentQuestion.correct_answer
    setIsCorrect(correct)

    if (correct) {
      const damage = 100 / totalQuestions
      setDamageAnimation(true)
      setTimeout(() => {
        setBossHealth((prev) => Math.max(0, prev - damage))
        setDamageAnimation(false)
        setScore((prev) => prev + 1)
      }, 500)
    }

    setTimeout(() => {
      setShowExplanation(true)
    }, 1000)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
      setShowExplanation(false)
    } else {
      setGameState("completed")
      if (score >= 3) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }
  }

  const startQuiz = () => {
    setGameState("playing")
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setBossHealth(100)
    setShowExplanation(false)
    setGameState("playing")
    setScore(0)
  }

  // Determine boss state based on health
  const getBossState = () => {
    if (bossHealth > 60) return "strong"
    if (bossHealth > 20) return "weakened"
    return "critical"
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 p-4 md:p-6">
      <div className=" mt-24">
        {gameState === "intro" && (
          <Card className="bg-transparent glow-border text-white">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-400" />
                Quantum Computing Challenge
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </CardTitle>
              <CardDescription className="text-purple-200 text-center text-lg">
                Test your knowledge of quantum computing concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-purple-100 leading-relaxed">{quizData.summary.split("\n\n")[0]}</p>
                <div className=" p-4 rounded-lg">
                  <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-purple-300" /> Topics Covered:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {quizData.topics_covered.map((topic, index) => (
                      <Badge key={index} className="bg-purple-700 hover:bg-purple-600">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={startQuiz}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white"
              >
                Begin Challenge <Zap className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {gameState === "playing" && (
          <>
            <div className="mb-6 bg-purple-950/80 rounded-lg p-4 border border-purple-500">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Avatar
                    className={`h-10 w-10 border-2 ${getBossState() === "critical" ? "border-red-500 animate-pulse" : getBossState() === "weakened" ? "border-yellow-500" : "border-purple-400"}`}
                  >
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Quizmaster" />
                    <AvatarFallback className="bg-purple-800 text-white">QM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">Cunning Quizmaster</h3>
                    <p className="text-xs text-purple-300">
                      {getBossState() === "critical"
                        ? "Nearly defeated!"
                        : getBossState() === "weakened"
                          ? "Weakening..."
                          : "Full of quantum tricks"}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-bold">
                  Question {currentQuestionIndex + 1}/{totalQuestions}
                </div>
              </div>
              <div className="relative">
                <Progress
                  value={bossHealth}
                  className={`h-4 ${damageAnimation ? "animate-pulse" : ""}`}
                  style={
                    {
                      background: "rgba(88, 28, 135, 0.3)",
                      "--tw-progress-fill":
                        bossHealth > 60
                          ? "linear-gradient(90deg, #9333ea, #6366f1)"
                          : bossHealth > 20
                            ? "linear-gradient(90deg, #eab308, #f97316)"
                            : "linear-gradient(90deg, #ef4444, #b91c1c)",
                    } as React.CSSProperties
                  }
                />
                <span className="absolute top-0 right-2 text-xs font-bold text-white">{Math.round(bossHealth)}%</span>
              </div>
            </div>

            {/* Question Card */}
            <Card className="bg-purple-950/80 border-purple-500 text-white mb-6">
              <CardHeader>
                <CardTitle className="text-xl text-center">{currentQuestion.question_text}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`justify-start text-left h-auto py-3 px-4 border-2 ${selectedAnswer === option
                        ? isCorrect
                          ? "border-green-500 bg-green-900/20"
                          : "border-red-500 bg-red-900/20"
                        : "border-purple-600 bg-purple-900/40 hover:bg-purple-800/40"
                        } ${selectedAnswer !== null &&
                        option === currentQuestion.correct_answer &&
                        "border-green-500 bg-green-900/20"
                        }`}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div
                          className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${selectedAnswer === option ? (isCorrect ? "bg-green-500" : "bg-red-500") : "bg-purple-700"
                            } ${selectedAnswer !== null && option === currentQuestion.correct_answer && "bg-green-500"}`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-grow">{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                {selectedAnswer && (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
                  >
                    {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "See Results"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>

            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-6 w-full">
                    <div className="relative">
                      <CompanionAvatar
                        name={companion as string}
                        size="lg"
                        className="shadow-lg border-2 border-[#9F8DFC]"
                      />
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#9F8DFC] text-white text-xs px-2 py-0.5 rounded-full shadow">
                        Guide
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-white">{companion}</span>
                      <span className="text-xs text-gray-400">Your AI Learning Companion</span>
                      <span className="text-xs text-[#9F8DFC] mt-1 font-semibold">Level 1</span>
                    </div>
                  </div>
                  <Card className="bg-indigo-950/80 border-indigo-500 text-white">
                    <CardContent>
                      <p className="text-indigo-100">{currentQuestion.explanation}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {gameState === "completed" && (
          <Card className="bg-purple-950/80 border-purple-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center flex items-center justify-center gap-2">
                <Award className="h-6 w-6 text-yellow-400" />
                Challenge Complete!
                <Award className="h-6 w-6 text-yellow-400" />
              </CardTitle>
              <CardDescription className="text-purple-200 text-center text-lg">
                You scored {score} out of {totalQuestions}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-purple-900 stroke-current"
                        strokeWidth="10"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-indigo-500 stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${(score / totalQuestions) * 251.2} 251.2`}
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute text-3xl font-bold">{Math.round((score / totalQuestions) * 100)}%</div>
                  </div>
                </div>

                <div className="bg-purple-800/50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Your Achievement:</h3>
                  <p className="text-purple-100">
                    {score === totalQuestions
                      ? "Perfect score! You've mastered quantum computing concepts!"
                      : score >= Math.ceil(totalQuestions * 0.7)
                        ? "Great job! You have a strong understanding of quantum computing."
                        : score >= Math.ceil(totalQuestions * 0.5)
                          ? "Good effort! You're on your way to understanding quantum computing."
                          : "Keep learning! Quantum computing is a complex subject."}
                  </p>
                </div>

                <p className="text-purple-100 leading-relaxed">{quizData.summary.split("\n\n")[1]}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={restartQuiz}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white"
              >
                Try Again <RefreshCcw className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
