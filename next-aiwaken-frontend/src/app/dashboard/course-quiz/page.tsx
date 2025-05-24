"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calculator, Brain, Zap, Award, ArrowRight, RefreshCcw, Hash } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

// Math Quiz data - Updated to match payload structure
const mathQuizData = {
  summary:
    "Welcome to the Number Cruncher Challenge! This fundamental math quiz will test your basic arithmetic and number recognition skills. You'll practice counting, simple addition and subtraction, number comparison, and basic problem-solving. These are essential building blocks for all future mathematical learning!",
  quiz: {
    quiz: [
      {
        question_text: "The number cruncher wonders, 'Which number comes after 37?'",
        options: ["36", "38", "39", "40"],
        correct_answer: "38",
        explanation: "Counting in sequence: 37 is followed by 38.",
      },
      {
        question_text:
          "The number cruncher challenges you, 'What number is represented by this image?' (Imagine a picture of 6 apples here)",
        options: ["5", "6", "7", "8"],
        correct_answer: "6",
        explanation: "Counting objects: The image shows six apples.",
      },
      {
        question_text: "The number cruncher growls, 'What is 50 less than 75?'",
        options: ["15", "25", "35", "45"],
        correct_answer: "25",
        explanation: "Simple subtraction: Subtracting 50 from 75 gives 25.",
      },
      {
        question_text: "The number cruncher asks, 'Which of these numbers is the smallest?'",
        options: ["12", "21", "1", "99"],
        correct_answer: "1",
        explanation: "Number comparison: 1 is smaller than 12, 21, and 99.",
      },
      {
        question_text:
          "The number cruncher challenges you, 'If you have 10 fingers and you lose 3, how many are left?'",
        options: ["13", "7", "8", "10"],
        correct_answer: "7",
        explanation: "Subtraction word problem: 10 - 3 = 7.",
      },
    ],
  },
  topics_covered: [
    "Number Sequences",
    "Counting Objects",
    "Basic Subtraction",
    "Number Comparison",
    "Word Problems",
    "Mental Math",
  ],
}

export default function MathQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [bossHealth, setBossHealth] = useState(100)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameState, setGameState] = useState<"intro" | "playing" | "completed">("intro")
  const [score, setScore] = useState(0)
  const [damageAnimation, setDamageAnimation] = useState(false)

  const currentQuestion = mathQuizData.quiz.quiz[currentQuestionIndex]
  const totalQuestions = mathQuizData.quiz.quiz.length

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
          colors: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"],
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

  const getBossState = () => {
    if (bossHealth > 60) return "calculating"
    if (bossHealth > 20) return "confused"
    return "defeated"
  }

  const renderApples = () => {
    if (currentQuestionIndex === 1) {
      return (
        <div className="flex justify-center my-4">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="text-4xl">
                🍎
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-red-400 to-pink-500 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {gameState === "intro" && (
          <Card className="bg-orange-950/80 border-orange-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center flex items-center justify-center gap-2">
                <Calculator className="h-6 w-6 text-yellow-400" />
                Number Cruncher Challenge
                <Calculator className="h-6 w-6 text-yellow-400" />
              </CardTitle>
              <CardDescription className="text-orange-200 text-center text-lg">
                Test your basic math and number skills!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-orange-100 leading-relaxed">{mathQuizData.summary}</p>
                <div className="bg-orange-800/50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                    <Hash className="h-5 w-5 text-orange-300" /> Skills You&apos;ll Practice:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mathQuizData.topics_covered.map((topic, index) => (
                      <Badge key={index} className="bg-orange-700 hover:bg-orange-600">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-yellow-600/20 p-4 rounded-lg border border-yellow-500/30">
                  <p className="text-yellow-100 text-sm">
                    💡 <strong>Tip:</strong> Take your time and think through each problem step by step!
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={startQuiz}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white"
              >
                Start Crunching Numbers! <Zap className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {gameState === "playing" && (
          <>
            {/* Boss Health Bar */}
            <div className="mb-6 bg-orange-950/80 rounded-lg p-4 border border-orange-500">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Avatar
                    className={`h-10 w-10 border-2 ${getBossState() === "defeated" ? "border-red-500 animate-pulse" : getBossState() === "confused" ? "border-yellow-500" : "border-orange-400"}`}
                  >
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Number Cruncher" />
                    <AvatarFallback className="bg-orange-800 text-white">
                      <Calculator className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">Number Cruncher</h3>
                    <p className="text-xs text-orange-300">
                      {getBossState() === "defeated"
                        ? "Numbers defeated!"
                        : getBossState() === "confused"
                          ? "Getting confused..."
                          : "Ready to crunch numbers!"}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-bold">
                  Problem {currentQuestionIndex + 1}/{totalQuestions}
                </div>
              </div>
              <div className="relative">
                <Progress
                  value={bossHealth}
                  className={`h-4 ${damageAnimation ? "animate-pulse" : ""}`}
                  style={
                    {
                      background: "rgba(154, 52, 18, 0.3)",
                      "--tw-progress-fill":
                        bossHealth > 60
                          ? "linear-gradient(90deg, #ea580c, #dc2626)"
                          : bossHealth > 20
                            ? "linear-gradient(90deg, #eab308, #f97316)"
                            : "linear-gradient(90deg, #ef4444, #b91c1c)",
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                  }
                />
                <span className="absolute top-0 right-2 text-xs font-bold text-white">{Math.round(bossHealth)}%</span>
              </div>
            </div>

            <Card className="bg-orange-950/80 border-orange-500 text-white mb-6">
              <CardHeader>
                <CardTitle className="text-xl text-center">{currentQuestion.question_text}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderApples()}
                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`justify-start text-left h-auto py-3 px-4 border-2 ${selectedAnswer === option
                        ? isCorrect
                          ? "border-green-500 bg-green-900/20"
                          : "border-red-500 bg-red-900/20"
                        : "border-orange-600 bg-orange-900/40 hover:bg-orange-800/40"
                        } ${selectedAnswer !== null &&
                        option === currentQuestion.correct_answer &&
                        "border-green-500 bg-green-900/20"
                        }`}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div
                          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-lg font-bold ${selectedAnswer === option ? (isCorrect ? "bg-green-500" : "bg-red-500") : "bg-orange-700"
                            } ${selectedAnswer !== null && option === currentQuestion.correct_answer && "bg-green-500"}`}
                        >
                          {option}
                        </div>
                        <span className="flex-grow text-lg">{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                {selectedAnswer && (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500"
                  >
                    {currentQuestionIndex < totalQuestions - 1 ? "Next Problem" : "See Results"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Explanation Bot */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-blue-950/80 border-blue-500 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Avatar className="h-8 w-8 border-2 border-blue-400">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Math Helper" />
                          <AvatarFallback className="bg-blue-700 text-white">
                            <Brain className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        Math Helper
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-100">{currentQuestion.explanation}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {gameState === "completed" && (
          <Card className="bg-orange-950/80 border-orange-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center flex items-center justify-center gap-2">
                <Award className="h-6 w-6 text-yellow-400" />
                Math Challenge Complete!
                <Award className="h-6 w-6 text-yellow-400" />
              </CardTitle>
              <CardDescription className="text-orange-200 text-center text-lg">
                You solved {score} out of {totalQuestions} problems correctly!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-orange-900 stroke-current"
                        strokeWidth="10"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-yellow-500 stroke-current"
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

                <div className="bg-orange-800/50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    Your Math Achievement:
                  </h3>
                  <p className="text-orange-100">
                    {score === totalQuestions
                      ? "Perfect score! You're a math superstar! 🌟"
                      : score >= Math.ceil(totalQuestions * 0.8)
                        ? "Excellent work! You have strong number skills! 🎯"
                        : score >= Math.ceil(totalQuestions * 0.6)
                          ? "Good job! Keep practicing and you'll get even better! 👍"
                          : "Nice try! Math takes practice - keep working at it! 💪"}
                  </p>
                </div>

                <div className="bg-yellow-600/20 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="font-bold text-yellow-100 mb-2">Keep Learning!</h4>
                  <p className="text-yellow-100 text-sm">
                    {score >= Math.ceil(totalQuestions * 0.7)
                      ? "You're ready for more challenging math problems! Try addition and multiplication next."
                      : "Practice counting, comparing numbers, and simple subtraction to improve your skills."}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                onClick={restartQuiz}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white"
              >
                Try Again <RefreshCcw className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
                className="flex-1 border-orange-500 text-orange-100 hover:bg-orange-800/40"
              >
                Quantum Quiz <Calculator className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
