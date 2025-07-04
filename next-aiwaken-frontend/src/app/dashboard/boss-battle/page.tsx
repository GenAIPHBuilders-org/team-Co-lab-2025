"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Heart, BookOpen, Brain } from "lucide-react"
import { motion } from "framer-motion"
import { RobotGuide } from "@/components/robot-guide"
import { IBossBattleQuestionTypeResponse } from "./constant"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { TokenStorage } from "@/lib/token-storage"
import { useAuthentication } from "@/contexts/auth-context"
import { useLatestCourse } from "@/contexts/latest-course-context"
import { useUpdateCourseProgress } from "@/(features)/topic-action"
import { AnimatedModal } from "@/components/dialog/animated-modal"
import { LottieAnimation } from "@/components/ui/lottie"
import yoCelebration from "@/components/lottie-json/yo.json"

export default function Component() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "gameOver">("intro")
  const { user } = useAuthentication()
  const [currentDifficulty, setCurrentDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const quizData = TokenStorage.getSummaryConclusion()
  const [hearts, setHearts] = useState<number>(quizData?.hearts || 0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set())
  const [userAnswer, setUserAnswer] = useState("")
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0)
  const [showFeedback, setShowFeedback] = useState<boolean>(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  const { latestCourse } = useLatestCourse()
  const rewards = latestCourse?.rewards || []
  const { updateCourseProgress } = useUpdateCourseProgress();
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [lastAnsweredQuestion, setLastAnsweredQuestion] = useState<IBossBattleQuestionTypeResponse | null>(null)

  const MAX_QUESTIONS = 10;
  const PASSING_RATE = 0.8;
  const passed = correctAnswers >= Math.ceil(PASSING_RATE * MAX_QUESTIONS)

  useEffect(() => {
    if (gameState === "gameOver" && passed && latestCourse?.id) {
      updateCourseProgress({ topic_id: latestCourse.id, completion_percentage: 100 })
    }
    if (gameState === "gameOver" && passed) {
      setShowRewardModal(true)
    } else {
      setShowRewardModal(false)
    }
    // Only run when gameState, passed, or latestCourse.id changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, passed, latestCourse?.id])

  const getCurrentQuestionPool = () => {
    switch (currentDifficulty) {
      case "easy":
        return quizData?.easy_questions || []
      case "medium":
        return quizData?.medium_questions || []
      case "hard":
        return quizData?.hard_questions || []
    }
  }

  if (!quizData) {
    return null
  }

  const getAvailableQuestions = () => {
    const pool = getCurrentQuestionPool()
    const remaining = pool.filter((q) => !usedQuestions.has(q.id))
    if (questionsAnswered >= MAX_QUESTIONS) return []
    if (questionsAnswered + remaining.length > MAX_QUESTIONS) {
      return remaining.slice(0, MAX_QUESTIONS - questionsAnswered)
    }
    return remaining
  }

  const getCurrentQuestion = () => {
    const availableQuestions = getAvailableQuestions()
    if (availableQuestions.length === 0) return null
    return availableQuestions[currentQuestionIndex % availableQuestions.length]
  }

  const adjustDifficulty = (correct: boolean) => {
    if (correct) {
      if (currentDifficulty === "medium") {
        setCurrentDifficulty("hard")
      } else if (currentDifficulty === "easy") {
        setCurrentDifficulty("medium")
      }
    } else {
      if (currentDifficulty === "medium") {
        setCurrentDifficulty("easy")
      } else if (currentDifficulty === "hard") {
        setCurrentDifficulty("medium")
      }
    }
  }

  const handleAnswer = () => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion || !userAnswer.trim()) return

    setLastAnsweredQuestion(currentQuestion)
    const correct = userAnswer.toLowerCase().trim() === currentQuestion.correct_answer.toLowerCase().trim()
    setIsCorrect(correct)
    setShowFeedback(true)

    if (!correct) {
      setHearts((prev) => prev - 1)
    } else {
      setCorrectAnswers((prev) => prev + 1)
    }
    adjustDifficulty(correct)
    setUsedQuestions((prev) => new Set([...prev, currentQuestion.id]))
    setQuestionsAnswered((prev) => prev + 1)

    setTimeout(() => {
      setShowFeedback(false)
      setUserAnswer("")

      if ((hearts <= 1 && !correct) || questionsAnswered + 1 >= MAX_QUESTIONS) {
        setGameState("gameOver")
      } else {
        const availableQuestions = getAvailableQuestions().filter((q) => q.id !== currentQuestion.id)
        if (availableQuestions.length === 0) {
          setUsedQuestions(new Set())
          setCurrentQuestionIndex(0)
        } else {
          setCurrentQuestionIndex(Math.floor(Math.random() * availableQuestions.length))
        }
      }
    }, 5000)
  }

  const startGame = () => {
    setGameState("playing")
    setCurrentQuestionIndex(Math.floor(Math.random() * quizData.medium_questions.length))
  }

  const resetGame = () => {
    setGameState("intro")
    setCurrentDifficulty("medium")
    setHearts(quizData.hearts)
    setCurrentQuestionIndex(0)
    setUsedQuestions(new Set())
    setUserAnswer("")
    setQuestionsAnswered(0)
    setShowFeedback(false)
    setCorrectAnswers(0)
  }

  const renderQuestion = (question: IBossBattleQuestionTypeResponse) => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <RadioGroup value={userAnswer} onValueChange={setUserAnswer} className="space-y-3">
            {question.options.map((optionObj, index) => {
              // Each option is an object like {A.: "try-except blocks"}
              const [optionKey, optionValue] = Object.entries(optionObj)[0]
              return (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={optionKey} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer text-sm">
                    <span className="font-semibold">{optionKey}</span> {optionValue}
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
        )

      case "true_false":
        return (
          <RadioGroup value={userAnswer} onValueChange={setUserAnswer} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="true" />
              <Label htmlFor="true" className="cursor-pointer text-sm">
                True
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="false" />
              <Label htmlFor="false" className="cursor-pointer text-sm">
                False
              </Label>
            </div>
          </RadioGroup>
        )

      case "fill_blank":
        return (
          <div className="py-4 px-0">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className=" border-2 border-purple-700/50  rounded-lg text-sm focus:outline-none"
              onKeyPress={(e) => e.key === "Enter" && handleAnswer()}
            />
          </div>
        )
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "hard":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <BookOpen className="w-4 h-4" />
      case "medium":
        return <Brain className="w-4 h-4" />
      case "hard":
        return <Brain className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  if (gameState === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl rounded-2xl border border-purple-700/40 p-0 shadow-2xl bg-gradient-to-br from-gray-900/80 to-[#9F8DFC]/10 backdrop-blur-lg relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-gradient-to-br from-purple-500/30 to-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-gradient-to-tr from-blue-500/20 to-purple-500/30 rounded-full blur-3xl pointer-events-none" />
          <CardHeader className="text-center space-y-4 pt-10 pb-4">
            <CardTitle className="text-3xl font-extrabold text-slate-100 drop-shadow-sm">{quizData.quiz_title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-10">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 p-6 rounded-xl border-l-4 border-purple-700/70 shadow-inner">
              <TypingAnimation
                duration={30}
                delay={500}
                className="text-lg text-gray-200 italic leading-relaxed"
              >
                {quizData.boss_intro}
              </TypingAnimation>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-3 bg-gray-800/60 rounded-lg px-4 py-3 shadow">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-gray-100 font-medium">Required Hearts: <span className="font-bold text-red-400">10</span></span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/60 rounded-lg px-4 py-3 shadow">
                <Brain className="w-5 h-5 text-blue-500" />
                <span className="text-gray-100 font-medium">Adaptive Difficulty</span>
              </div>
              <div className="col-span-1 sm:col-span-2 flex flex-col items-center mt-2">
                <span className="text-white font-semibold mb-1">Boss Rewards:</span>
                <ul className="text-purple-300 text-base space-y-1">
                  {rewards.map((reward, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-purple-400">•</span> {reward}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1 sm:col-span-2 flex flex-col items-center mt-2">
                <span className="text-white font-semibold">Passing Rate: <span className="text-yellow-400 font-bold">80%</span> <span className="text-gray-300">(8/10 correct)</span></span>
              </div>
            </div>
            <Button
              onClick={startGame}
              className="w-full h-14 z-10 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-bold rounded-xl shadow-lg transition-all duration-200"
            >
              Begin the Challenge
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "gameOver") {
    return (
      <>
        <AnimatedModal
          isOpen={showRewardModal}
          onClose={() => setShowRewardModal(false)}
          title="Victory Rewards!"
          description="You conquered the Boss Battle!"
          size="md"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <LottieAnimation animationData={yoCelebration} height={180} width={180} />
            <div className="text-lg font-bold text-purple-400">You earned:</div>
            <ul className="text-purple-300 text-base space-y-1">
              {rewards.map((reward, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-purple-400">•</span> {reward}
                </li>
              ))}
            </ul>
            <div className="mt-4 px-4 py-2 rounded-lg bg-green-900/60 border border-green-500 flex items-center gap-2">
              <span className="text-green-400 font-bold text-lg">✅</span>
              <span className="text-green-200 font-semibold">
                Topic Completed! You have finished <span className="text-white">{latestCourse?.name || "this topic"}</span>.
              </span>
            </div>
          </div>
        </AnimatedModal>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950  flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-gray-800/95 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl font-bold text-gray-200">Game Over</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="bg-gray-700 p-6 rounded-lg">
                <p className="text-lg text-gray-300 mb-4">
                  &quot;Well fought, {user?.user.username}! &quot;
                </p>
                <div className="text-2xl font-bold text-purple-600">Questions Answered: {questionsAnswered}</div>
                <div className="text-2xl font-bold text-green-400 mt-2">Correct Answers: {correctAnswers} / {MAX_QUESTIONS}</div>
                <div className={`text-xl font-bold mt-2 ${passed ? "text-green-400" : "text-red-400"}`}>
                  {passed ? "Congratulations! You passed the Boss Battle!" : "You did not pass. Try again!"}
                </div>
                {passed && (
                  <div className="mt-4">
                    <span className="text-white font-semibold">Rewards:</span>
                    <ul className="text-purple-300 mt-1">
                      {rewards.map((reward, idx) => (
                        <li key={idx}>• {reward}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  const currentQuestion = getCurrentQuestion()
  if (!currentQuestion) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center flex-col p-4">
      {!showFeedback && (
        <>
          <RobotGuide
            message={currentQuestion.question_text}
          />
          <Card className="w-full h-auto max-w-4xl rounded-xl border border-[#9F8DFC]/50 p-6 shadow-xl bg-gradient-to-br from-black/40 to-[#9F8DFC]/10 backdrop-blur-md relative overflow-hidden">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-between items-center mb-4 z-5">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 ${getDifficultyColor(currentDifficulty)}`}
                  >
                    {getDifficultyIcon(currentDifficulty)}
                    <span className="text-sm font-medium capitalize">{currentDifficulty}</span>
                  </div>
                  <span className="text-sm text-gray-400">Question {questionsAnswered + 1}</span>
                </div>
              </div>
              <div className="text-sm text-white bg-purple-900/50 px-3 py-3 rounded-lg inline-block">
                Topic: {currentQuestion.topic}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 z-100">
              {renderQuestion(currentQuestion)}
              <Button
                onClick={handleAnswer}
                disabled={!userAnswer.trim()}
                className="w-full h-14 bg-[#9600ff] hover:bg-[#9600ff] hover:scale-105 hover:glow-border cursor-pointer text-white py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                Submit Answer
              </Button>
            </CardContent>
          </Card>
        </>
      )}
      {showFeedback && lastAnsweredQuestion && (
        <>
          <RobotGuide
            message={
              isCorrect
                ? lastAnsweredQuestion.explanation
                : lastAnsweredQuestion.question_text
            }
          />
          <Card className={`w-full max-w-4xl rounded-xl border-l-4 ${isCorrect ? "bg-green-700 border-green-600" : "bg-transparent border-red-600"}`}>
            <CardContent className="p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className={`text-lg font-semibold mb-2 ${isCorrect ? "text-green-200" : "text-red-200"}`}>
                  {isCorrect ? "Excellent work!" : "Not quite right."}
                </div>
                <div className="text-sm text-gray-100">
                  <strong>Correct answer:</strong> {lastAnsweredQuestion.correct_answer}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
