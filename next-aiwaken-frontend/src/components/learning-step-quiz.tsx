"use client"
//Refactor In The Future hehehe (vibe coding check)
import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calculator, Zap, Award, ArrowRight, RefreshCcw, HelpCircle, X, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { CompanionAvatar } from "./companion-avatar"
import { TokenStorage } from "@/lib/token-storage"
import { TypingAnimation } from "./magicui/typing-animation"
import { useGetHint, useGetMotivation, useGetTips } from "@/(features)/companion-action"

export function LearningStepQuiz() {
  const { getHintAsync, isPending: hintPending } = useGetHint()
  const quizData = TokenStorage.getLearningStepQuiz()
  const companion = TokenStorage.getUserCompanion()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [bossHealth, setBossHealth] = useState(100)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameState, setGameState] = useState<"intro" | "playing" | "completed">("intro")
  const [score, setScore] = useState(0)
  const [damageAnimation, setDamageAnimation] = useState(false)
  const [showMotivation, setShowMotivation] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [motivationText, setMotivationText] = useState("")
  const [hintText, setHintText] = useState("")
  const courseData = TokenStorage.getCourseData()
  const { getMotivationAsync } = useGetMotivation()
  const [showTips, setShowTips] = useState(false)
  const [tipsText, setTipsText] = useState("")
  const { getTipsAsync, isPending: tipsPending } = useGetTips()

  const showMotivationPopup = useCallback(async () => {
    try {
      const motivationResponse = await getMotivationAsync({
        companion_name: companion as string,
        subject: courseData?.course_title as string,
      })
      setMotivationText(motivationResponse.motivation)
      setShowMotivation(true)

      setTimeout(() => {
        setShowMotivation(false)
      }, 5000)
    } catch (error) {
      console.error("Error fetching motivation:", error)
    }
  }, [getMotivationAsync, companion, courseData])

  const debouncedMotivation = useCallback(() => {
    let timeoutId: NodeJS.Timeout

    const debounced = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(showMotivationPopup, 100)
    }

    return debounced
  }, [showMotivationPopup])

  useEffect(() => {
    if (gameState === "playing") {
      const interval = setInterval(() => {
        debouncedMotivation()()
      }, 15000)

      return () => clearInterval(interval)
    }
  }, [gameState, debouncedMotivation])

  if (!quizData) return null

  const currentQuestion = quizData.quiz.quiz[currentQuestionIndex]
  const totalQuestions = quizData.quiz.quiz.length

  async function handleShowHint(params: { quiz_question: string; topic_title: string }) {
    try {
      const response = await getHintAsync(params)
      setHintText(response.hint)
      setShowHint(true)
    } catch (error) {
      console.error("Error fetching hint:", error)
    }
  }

  async function handleShowTips(params: CompanionTipsParams) {
    try {
      const response = await getTipsAsync(params)
      setTipsText(response.tips)
      setShowTips(true)
    } catch (error) {
      console.error("Error fetching tips:", error)
    }
  }

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

  const getBossState = () => {
    if (bossHealth > 60) return "strong"
    if (bossHealth > 20) return "weakened"
    return "defeated"
  }

  return (
    <div className="w-full min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {gameState === "intro" && (
          <Card className="bg-violet-950/80 glow-border  border-slate-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center flex items-center justify-center gap-2">
                Quiz Challenge
              </CardTitle>
              <CardDescription className="text-slate-200 text-center text-lg">
                Test your knowledge and defeat the boss!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-100 leading-relaxed text-center">
                  Answer questions correctly to damage the boss. Get ready for the challenge!
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={startQuiz}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
              >
                Start Challenge <Zap className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {gameState === "playing" && (
          <>
            <div className="w-[45rem] glow-border mb-6 bg-slate-950/80 rounded-lg p-4 border border-slate-500">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Avatar
                    className={`h-10 w-10 border-2 ${getBossState() === "defeated" ? "border-red-500 animate-pulse" : getBossState() === "weakened" ? "border-yellow-500" : "border-blue-400"}`}
                  >
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Boss" />
                    <AvatarFallback className="bg-slate-800 text-white">
                      <Calculator className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">Mischievous Goblin</h3>
                    <p className="text-xs text-slate-300">
                      {getBossState() === "defeated"
                        ? "Nearly defeated!"
                        : getBossState() === "weakened"
                          ? "Weakening..."
                          : "Ready to challenge you!"}
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
                      background: "rgba(51, 65, 85, 0.3)",
                      "--tw-progress-fill":
                        bossHealth > 60
                          ? "linear-gradient(90deg, #3b82f6, #8b5cf6)"
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

            <Card className="bg-slate-950/80 border-slate-500 glow-border text-white mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-center">{currentQuestion.question_text}</CardTitle>
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
                        : "border-slate-600 bg-slate-900/40 hover:bg-slate-800/40"
                        } ${selectedAnswer !== null &&
                        option === currentQuestion.correct_answer &&
                        "border-green-500 bg-green-900/20"
                        }`}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div
                          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-md font-bold ${selectedAnswer === option ? (isCorrect ? "bg-green-500" : "bg-red-500") : "bg-slate-700"
                            } ${selectedAnswer !== null && option === currentQuestion.correct_answer && "bg-green-500"}`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-grow text-sm">{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  loading={hintPending}
                  disabled={hintPending}
                  onClick={() =>
                    handleShowHint({
                      quiz_question: currentQuestion.question_text,
                      topic_title: courseData?.course_title as string,
                    })
                  }
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-900/20"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Get Hint
                </Button>
                <Button
                  loading={tipsPending}
                  disabled={tipsPending}
                  onClick={() =>
                    handleShowTips({
                      topic_title: courseData?.course_title as string,
                      subject: courseData?.subject as string,
                      difficulty: courseData?.difficulty as string,
                      step_title: currentQuestion.question_text,
                    })
                  }
                  variant="outline"
                  className="border-green-500 text-green-300 hover:bg-green-900/20"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Tips
                </Button>
                {selectedAnswer && (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
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
                  <Card className="bg-blue-950/80 border-blue-500 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
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
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`inline-flex items-center justify-center rounded-full p-2 bg-gradient-to-r from-blue-500 to-purple-500`}
                        >
                          <Zap className="h-5 w-5 text-white-300 animate-bounce" />
                        </span>
                        <span className="font-semibold text-blue-200 text-lg">Guide</span>
                      </div>
                      <div className="relative bg-blue-900/60 border-l-4 border-blue-400 rounded-md p-4 shadow-lg">
                        <div className="absolute -left-3 top-4">
                          <span className="inline-block h-3 w-3 rounded-full bg-blue-400 animate-pulse"></span>
                        </div>
                        <TypingAnimation duration={20} className="text-blue-100 text-md">
                          {currentQuestion.explanation}
                        </TypingAnimation>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {gameState === "completed" && (
          <Card className="bg-slate-950/80 border-slate-500 text-white glow-border w-[45rem] mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center flex items-center justify-center gap-2">
                <Award className="h-6 w-6 text-yellow-400" />
                Challenge Complete!
                <Award className="h-6 w-6 text-yellow-400" />
              </CardTitle>
              <CardDescription className="text-slate-200 text-center text-lg">
                You scored {score} out of {totalQuestions}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-slate-700 stroke-current"
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

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    Your Result:
                  </h3>
                  <p className="text-slate-100">
                    {score === totalQuestions
                      ? "Perfect score! Excellent work!"
                      : score >= Math.ceil(totalQuestions * 0.8)
                        ? "Great job! You did very well!"
                        : score >= Math.ceil(totalQuestions * 0.6)
                          ? "Good effort! Keep practicing!"
                          : "Nice try! Practice makes perfect!"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                onClick={restartQuiz}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
              >
                Try Again <RefreshCcw className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      <AnimatePresence>
        {showMotivation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
          >
            <Card className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 border-purple-400 text-white shadow-2xl">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CompanionAvatar name={companion as string} size="sm" className="border-2 border-purple-400" />
                    <div>
                      <CardTitle className="text-sm font-bold">{companion}</CardTitle>
                      <p className="text-xs text-purple-200">Motivation Boost!</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMotivation(false)}
                    className="h-6 w-6 p-0 text-purple-200 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0 animate-pulse" />
                  <p className="text-sm text-purple-100 leading-relaxed">{motivationText}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowHint(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
              className="max-w-md w-full"
            >
              <Card className="w-[40rem] bg-gradient-to-br from-blue-900/95 to-indigo-900/95 border-blue-400 text-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CompanionAvatar name={companion as string} size="md" className="border-2 border-blue-400" />
                      <div>
                        <CardTitle className="text-lg">{companion}</CardTitle>
                        <p className="text-sm text-blue-200">Here&apos;s a helpful hint!</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHint(false)}
                      className="text-blue-200 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-800/40 border-l-4 border-blue-400 rounded-md p-4">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                      <p className="text-blue-100 leading-relaxed">{hintText}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setShowHint(false)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                  >
                    Got it, thanks!
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTips(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <Card className="bg-gradient-to-br from-green-900/95 to-emerald-900/95 border-green-400 text-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CompanionAvatar name={companion as string} size="md" className="border-2 border-green-400" />
                      <div>
                        <CardTitle className="text-lg">{companion}</CardTitle>
                        <p className="text-sm text-green-200">Here are some helpful tips!</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTips(false)}
                      className="text-green-200 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-800/40 border-l-4 border-green-400 rounded-md p-4">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                      <div className="text-green-100 leading-relaxed space-y-4">
                        {tipsText.split("\n\n").map((tip: string, index: number) => {
                          // Parse the tip text to handle formatting
                          const formattedTip: string = tip
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
                            .replace(
                              /`(.*?)`/g,
                              '<code class="bg-green-700/50 px-1 py-0.5 rounded text-green-200">$1</code>',
                            ) // Inline code
                            .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic text

                          return (
                            <div key={index} className="border-b border-green-700/30 pb-3 last:border-b-0 last:pb-0">
                              <div dangerouslySetInnerHTML={{ __html: formattedTip }} />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setShowTips(false)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                  >
                    Thanks for the tips!
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
