"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Award, RefreshCcw, Sparkles, X, HelpCircle } from "lucide-react"
import { TokenStorage } from "@/lib/token-storage"
import { useQuizState, QuizQuestion } from "@/hooks/use-quiz-state"
import { QuizBoss } from "@/components/quiz/quiz-boss"
import { QuizQuestion as QuizQuestionComponent } from "@/components/quiz/quiz-question"
import { QuizExplanation } from "@/components/quiz/quiz-explanation"
import { IncorrectExplanation } from "@/components/quiz/incorrect-explanation"
import { CompanionProvider, useCompanion } from "@/contexts/companion-context"
import { CompanionAvatar } from "@/components/companion-avatar"
import { motion, AnimatePresence } from "framer-motion"
import { MouseEvent, useCallback, useEffect, useState, useRef } from "react"
import { useGetMotivation } from "@/(features)/companion-action"
import { useIdleDetection } from "@/hooks/use-idle-detection"
import { TypingAnimation } from "./magicui/typing-animation"
import { useAuthentication } from "@/contexts/auth-context"

export function LearningStepQuiz({ quizData }: { quizData: QuizQuestion[] }) {
  const { user } = useAuthentication();
  const companion = user?.preferences.companion
  if (!quizData || !companion) return null
  return (
    <CompanionProvider>
      <LearningStepQuizContent quizData={quizData} companion={companion as string} />
    </CompanionProvider>
  )
}

export function LearningStepQuizContent({ quizData, companion }: { quizData: QuizQuestion[]; companion: string }) {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    isCorrect,
    bossHealth,
    showExplanation,
    gameState,
    score,
    damageAnimation,
    handleAnswerSelect,
    handleNextQuestion,
    startQuiz,
    restartQuiz,
    getBossState,
    closeExplanation,
  } = useQuizState({ quizData })
  const [motivationText, setMotivationText] = useState<string>("")
  const [showMotivation, setShowMotivation] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout>()
  const isIdle = useIdleDetection(15000);
  const isCallingRef = useRef<boolean>(false)

  const {
    showHint,
    showTips,
    hintText,
    tipsText,
    closeMotivation,
    closeHint,
    closeTips,
  } = useCompanion()

  const { getMotivationAsync } = useGetMotivation()

  const courseData = TokenStorage.getCourseData()
  const courseInfo = courseData ? {
    course_title: courseData.course_title,
    subject: courseData.subject,
    difficulty: courseData.difficulty
  } : undefined

  const showMotivationPopup = useCallback(async () => {
    if (isCallingRef.current || !gameState || isIdle) return
    isCallingRef.current = true

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
    } finally {
      isCallingRef.current = false
    }
  }, [getMotivationAsync, companion, courseData, gameState, isIdle])

  useEffect(() => {
    let mounted = true
    let timeoutId: NodeJS.Timeout

    const debouncedShowMotivation = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        if (mounted && gameState === "playing") {
          showMotivationPopup()
        }
      }, 20000)
    }

    if (gameState === "playing" && mounted) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      debouncedShowMotivation()

      intervalRef.current = setInterval(() => {
        if (mounted) {
          debouncedShowMotivation()
        }
      }, 20000)
    }

    return () => {
      mounted = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [gameState, showMotivationPopup])

  return (
    <div className="w-full min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {gameState === "intro" && (
          <Card className="bg-violet-950/80 glow-border border-slate-500 text-white">
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
            <div className="w-[45rem] mx-auto ">
              {currentQuestion.monster_intro && (
                <div className="mb-4">
                  <Card className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border-purple-400 text-white shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        Your AI Opponent is here!
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-purple-100 text-md">
                        <TypingAnimation duration={20} className="text-blue-100 text-md">
                          {currentQuestion.monster_intro}
                        </TypingAnimation>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              <QuizBoss
                bossHealth={bossHealth}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                damageAnimation={damageAnimation}
                getBossState={getBossState}
              />
              <QuizQuestionComponent
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                isCorrect={isCorrect}
                onAnswerSelect={handleAnswerSelect}
                onNextQuestion={handleNextQuestion}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                courseData={courseInfo}
              />
              {isCorrect === false ? (
                <IncorrectExplanation
                  incorrectExplanation={currentQuestion.incorrect_explanation}
                  selectedAnswer={selectedAnswer as string}
                  companion={companion}
                  showExplanation={showExplanation}
                  onClose={closeExplanation}
                />
              ) : (
                <QuizExplanation
                  explanation={currentQuestion.explanation}
                  companion={companion}
                  showExplanation={showExplanation}
                  onClose={closeExplanation}
                />
              )}
            </div>
            <AnimatePresence>
              {showMotivation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="fixed bottom-6 right-6 z-50 max-w-md"
                >
                  <Card className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 border-purple-400 text-white shadow-2xl">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CompanionAvatar name={companion} size="sm" className="border-2 border-purple-400" />
                          <div>
                            <CardTitle className="text-sm font-bold">{companion}</CardTitle>
                            <p className="text-xs text-purple-200">Motivation Boost!</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={closeMotivation}
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
                  onClick={closeHint}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e: MouseEvent) => e.stopPropagation()}
                    className="max-w-md w-full"
                  >
                    <Card className="w-[40rem] bg-gradient-to-br from-blue-900/95 to-indigo-900/95 border-blue-400 text-white">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CompanionAvatar name={companion} size="md" className="border-2 border-blue-400" />
                            <div>
                              <CardTitle className="text-lg">{companion}</CardTitle>
                              <p className="text-sm text-blue-200">Here&apos;s a helpful hint!</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={closeHint}
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
                          onClick={closeHint}
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
                  onClick={closeTips}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e: MouseEvent) => e.stopPropagation()}
                    className="max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                  >
                    <Card className="bg-gradient-to-br from-green-900/95 to-emerald-900/95 border-green-400 text-white">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CompanionAvatar name={companion} size="md" className="border-2 border-green-400" />
                            <div>
                              <CardTitle className="text-lg">{companion}</CardTitle>
                              <p className="text-sm text-green-200">Here are some helpful tips!</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={closeTips}
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
                                const formattedTip: string = tip
                                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                  .replace(
                                    /`(.*?)`/g,
                                    '<code class="bg-green-700/50 px-1 py-0.5 rounded text-green-200">$1</code>',
                                  )
                                  .replace(/\*(.*?)\*/g, "<em>$1</em>")

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
                          onClick={closeTips}
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
    </div>
  )
}
