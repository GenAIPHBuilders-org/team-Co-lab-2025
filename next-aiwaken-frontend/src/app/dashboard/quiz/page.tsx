"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Award, RefreshCcw } from "lucide-react"
import { TokenStorage } from "@/lib/token-storage"
import { useIdleDetection } from "@/hooks/use-idle-detection"
import { MotivationalModal } from "@/components/dialog/motivational-dialog"
import { useQuizState, QuizData } from "@/hooks/use-quiz-state"
import { QuizBoss } from "@/components/quiz/quiz-boss"
import { QuizQuestion } from "@/components/quiz/quiz-question"
import { QuizExplanation } from "@/components/quiz/quiz-explanation"
import { CompanionProvider } from "@/contexts/companion-context"

export default function BossQuiz() {
  const isIdle = useIdleDetection(10000)
  const companion = TokenStorage.getUserCompanion()
  const quizData = TokenStorage.getSummaryConclusion()

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

  return (
    <CompanionProvider>
      <BossQuizContent
        quizData={{ quiz: { quiz: quizData.quiz } }}
        companion={companion as string}
        isIdle={isIdle}
      />
    </CompanionProvider>
  )
}

function BossQuizContent({ quizData, companion, isIdle }: { quizData: QuizData; companion: string; isIdle: boolean }) {
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
  } = useQuizState({ quizData })

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 p-4 md:p-6">
      <div className="mt-24">
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
                {quizData.summary && (
                  <p className="text-purple-100 leading-relaxed">{quizData.summary.split("\n\n")[0]}</p>
                )}
                {quizData.topics_covered && (
                  <div className="p-4 rounded-lg">
                    <h3 className="font-bold text-lg flex items-center gap-2 mb-2">Topics Covered:</h3>
                    <div className="flex flex-wrap gap-2">
                      {quizData.topics_covered.map((topic: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-700 hover:bg-purple-600 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
            <MotivationalModal isOpen={isIdle} title="You've Been Idle for a While!" actionText="I'm Ready!" />
            <QuizBoss
              bossHealth={bossHealth}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              damageAnimation={damageAnimation}
              getBossState={getBossState}
            />
            <QuizQuestion
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              onAnswerSelect={handleAnswerSelect}
              onNextQuestion={handleNextQuestion}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
            />
            <QuizExplanation
              explanation={currentQuestion.explanation}
              companion={companion}
              showExplanation={showExplanation}
            />
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

                {quizData.summary && (
                  <p className="text-purple-100 leading-relaxed">{quizData.summary.split("\n\n")[1]}</p>
                )}
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
