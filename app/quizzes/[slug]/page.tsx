"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, Trophy, RotateCcw } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample quiz data
const quizzes = {
  "aljabar-quiz-1": {
    title: "Kuis Aljabar Dasar",
    description: "Uji pemahaman Anda tentang konsep dasar aljabar",
    duration: 20,
    questions: [
      {
        id: 1,
        question: "Jika x = 3, berapakah nilai dari 2x + 5?",
        options: ["8", "11", "13", "16"],
        correct: 1,
        explanation: "2x + 5 = 2(3) + 5 = 6 + 5 = 11",
      },
      {
        id: 2,
        question: "Selesaikan persamaan: 3x - 7 = 14",
        options: ["x = 5", "x = 7", "x = 9", "x = 11"],
        correct: 1,
        explanation: "3x - 7 = 14 → 3x = 21 → x = 7",
      },
      {
        id: 3,
        question: "Manakah yang merupakan persamaan linear?",
        options: ["x² + 2x = 5", "3x + 4 = 10", "x³ - 1 = 0", "2/x = 4"],
        correct: 1,
        explanation: "Persamaan linear memiliki variabel berpangkat satu, yaitu 3x + 4 = 10",
      },
    ],
  },
}

export default function QuizDetailPage({ params }: { params: { slug: string } }) {
  const quiz = quizzes[params.slug as keyof typeof quizzes]
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (isStarted && timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && isStarted) {
      handleFinishQuiz()
    }
  }, [timeLeft, isStarted, isFinished])

  if (!quiz) {
    notFound()
  }

  const startQuiz = () => {
    setIsStarted(true)
    setTimeLeft(quiz.duration * 60)
    setSelectedAnswers(new Array(quiz.questions.length).fill(-1))
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleFinishQuiz = () => {
    const correctAnswers = quiz.questions.filter((q, index) => selectedAnswers[index] === q.correct).length
    setScore(Math.round((correctAnswers / quiz.questions.length) * 100))
    setIsFinished(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setTimeLeft(0)
    setIsStarted(false)
    setIsFinished(false)
    setScore(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!isStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/quizzes">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Kuis
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">{quiz.title}</CardTitle>
              <CardDescription className="text-lg">{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">{quiz.questions.length}</div>
                  <div className="text-sm text-muted-foreground">Soal</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">{quiz.duration}</div>
                  <div className="text-sm text-muted-foreground">Menit</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">100</div>
                  <div className="text-sm text-muted-foreground">Poin Maksimal</div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Petunjuk:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Pilih satu jawaban yang paling tepat untuk setiap soal</li>
                  <li>• Anda dapat mengubah jawaban sebelum menyelesaikan kuis</li>
                  <li>• Kuis akan berakhir otomatis ketika waktu habis</li>
                  <li>• Pastikan koneksi internet stabil selama mengerjakan</li>
                </ul>
              </div>

              <Button onClick={startQuiz} className="w-full" size="lg">
                Mulai Kuis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">Kuis Selesai!</CardTitle>
              <CardDescription>Berikut adalah hasil kuis Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-primary">{score}%</div>
                <div className="text-lg text-muted-foreground">
                  {quiz.questions.filter((q, index) => selectedAnswers[index] === q.correct).length} dari{" "}
                  {quiz.questions.length} soal benar
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Pembahasan:</h3>
                {quiz.questions.map((question, index) => (
                  <Card
                    key={question.id}
                    className={`border-l-4 ${
                      selectedAnswers[index] === question.correct ? "border-l-green-500" : "border-l-red-500"
                    }`}
                  >
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <p className="font-medium">
                          {index + 1}. {question.question}
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Jawaban Anda: </span>
                          <span
                            className={selectedAnswers[index] === question.correct ? "text-green-600" : "text-red-600"}
                          >
                            {selectedAnswers[index] >= 0 ? question.options[selectedAnswers[index]] : "Tidak dijawab"}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Jawaban Benar: </span>
                          <span className="text-green-600">{question.options[question.correct]}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{question.explanation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-4">
                <Button onClick={resetQuiz} variant="outline" className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Ulangi Kuis
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/quizzes">Kuis Lainnya</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQ = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentQuestion + 1} dari {quiz.questions.length}
          </div>
        </div>

        {/* Progress */}
        <Progress value={progress} className="w-full" />

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Sebelumnya
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button onClick={handleFinishQuiz}>Selesai</Button>
          ) : (
            <Button onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}>
              Selanjutnya
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
