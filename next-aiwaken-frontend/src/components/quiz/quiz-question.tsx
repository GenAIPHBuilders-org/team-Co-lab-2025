import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Coins } from "lucide-react"
import { useCompanion } from "@/contexts/companion-context"
import { useAuthentication } from "@/contexts/auth-context"

interface QuizQuestionProps {
  question: {
    question_text: string
    options: string[]
    correct_answer: string
  }
  selectedAnswer: string | null
  isCorrect: boolean | null
  onAnswerSelect: (answer: string) => void
  onNextQuestion: () => void
  currentQuestionIndex: number
  totalQuestions: number
  courseData?: {
    course_title?: string
    subject?: string
    difficulty?: string
  }
}

export function QuizQuestion({
  question,
  selectedAnswer,
  isCorrect,
  onAnswerSelect,
  onNextQuestion,
  currentQuestionIndex,
  totalQuestions,
  courseData,
}: QuizQuestionProps) {
  const { user } = useAuthentication();
  const {
    handleShowHint,
    handleShowTips,
    isHintLoading,
    isTipsLoading
  } = useCompanion()

  return (
    <Card className="bg-purple-950/80 border-purple-500 text-white mb-6 max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center">{question.question_text}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`justify-start text-left h-auto py-3 px-4 border-2 ${selectedAnswer === option
                ? isCorrect
                  ? "border-green-500 bg-green-900/20"
                  : "border-red-500 bg-red-900/20"
                : "border-purple-600 bg-purple-900/40 hover:bg-purple-800/40"
                } ${selectedAnswer !== null &&
                option === question.correct_answer &&
                "border-green-500 bg-green-900/20"
                }`}
              onClick={() => onAnswerSelect(option)}
              disabled={selectedAnswer !== null}
            >
              <div className="flex items-center gap-2 w-full">
                <div
                  className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${selectedAnswer === option
                    ? isCorrect
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-purple-700"
                    } ${selectedAnswer !== null && option === question.correct_answer && "bg-green-500"
                    }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-grow">{option}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="w-full flex flex-col">
        <div className="flex w-full justify-between gap-2">
          <Button
            onClick={() =>
              handleShowHint({
                quiz_question: question.question_text,
                topic_title: courseData?.course_title as string,
              })
            }
            disabled={user?.stats.coins as number < 5}
            loading={isHintLoading}
            variant="outline"
            className="border-purple-500 text-purple-300 hover:bg-purple-900/20"
          >
            <Coins className="mr-2 h-4 w-4" />
            Get Hint (-3 coins)
          </Button>
          <Button
            onClick={() =>
              handleShowTips({
                topic_title: courseData?.course_title as string,
                subject: courseData?.subject as string,
                difficulty: courseData?.difficulty as string,
                step_title: question.question_text,
              })
            }
            disabled={user?.stats.coins as number < 5}
            loading={isTipsLoading}
            variant="outline"
            className="border-green-500 text-green-300 hover:bg-green-900/20"
          >
            <Coins className="mr-2 h-4 w-4" />
            Get Tips (-5 coins)
          </Button>
        </div>

        {selectedAnswer && (
          <Button
            onClick={onNextQuestion}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
          >
            {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "See Results"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 