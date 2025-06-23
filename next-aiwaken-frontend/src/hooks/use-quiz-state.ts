import { useState, useCallback } from "react";
import confetti from "canvas-confetti";

export type QuizState = "intro" | "playing" | "completed";

export interface QuizQuestion {
  monster_intro: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  incorrect_explanation: Record<string, string>;
}

export interface UseQuizStateProps {
  quizData: QuizQuestion[];
  onComplete?: (score: number, totalQuestions: number) => void;
}

export function useQuizState({ quizData, onComplete }: UseQuizStateProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [bossHealth, setBossHealth] = useState(100);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameState, setGameState] = useState<QuizState>("intro");
  const [score, setScore] = useState(0);
  const [damageAnimation, setDamageAnimation] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];
  const totalQuestions = quizData.length;

  const handleAnswerSelect = useCallback(
    (answer: string) => {
      if (selectedAnswer !== null) return;

      setSelectedAnswer(answer);
      const correct = answer === currentQuestion.correct_answer;
      setIsCorrect(correct);

      if (correct) {
        const damage = 100 / totalQuestions;
        setDamageAnimation(true);
        setTimeout(() => {
          setBossHealth((prev) => Math.max(0, prev - damage));
          setDamageAnimation(false);
          setScore((prev) => prev + 1);
        }, 500);
      }

      setTimeout(() => {
        setShowExplanation(true);
      }, 1000);
    },
    [currentQuestion, selectedAnswer, totalQuestions]
  );

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
    } else {
      setGameState("completed");
      if (score >= 3) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      onComplete?.(score, totalQuestions);
    }
  }, [currentQuestionIndex, totalQuestions, score, onComplete]);

  const startQuiz = useCallback(() => {
    setGameState("playing");
  }, []);

  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setBossHealth(100);
    setShowExplanation(false);
    setGameState("playing");
    setScore(0);
  }, []);

  const getBossState = useCallback(() => {
    if (bossHealth > 60) return "strong";
    if (bossHealth > 20) return "weakened";
    return "critical";
  }, [bossHealth]);

  return {
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
  };
}
