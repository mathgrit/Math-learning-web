import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Clock, Trophy, Target } from "lucide-react"
import Link from "next/link"

const quizzes = [
  {
    id: "aljabar-quiz-1",
    title: "Kuis Aljabar Dasar",
    description: "Uji pemahaman Anda tentang konsep dasar aljabar",
    questions: 15,
    duration: 20,
    difficulty: "Mudah",
    attempts: 342,
    averageScore: 85,
  },
  {
    id: "geometri-quiz-1",
    title: "Kuis Geometri Bidang",
    description: "Latihan soal tentang bangun datar dan perhitungan luas",
    questions: 12,
    duration: 25,
    difficulty: "Sedang",
    attempts: 256,
    averageScore: 78,
  },
  {
    id: "trigonometri-quiz-1",
    title: "Kuis Trigonometri",
    description: "Soal-soal tentang fungsi trigonometri dan identitas",
    questions: 18,
    duration: 30,
    difficulty: "Sulit",
    attempts: 189,
    averageScore: 72,
  },
  {
    id: "kalkulus-quiz-1",
    title: "Kuis Kalkulus Diferensial",
    description: "Uji kemampuan dalam menyelesaikan soal limit dan turunan",
    questions: 20,
    duration: 35,
    difficulty: "Sulit",
    attempts: 134,
    averageScore: 69,
  },
  {
    id: "statistika-quiz-1",
    title: "Kuis Statistika Dasar",
    description: "Latihan soal tentang analisis data dan distribusi",
    questions: 14,
    duration: 22,
    difficulty: "Mudah",
    attempts: 298,
    averageScore: 82,
  },
  {
    id: "kombinatorika-quiz-1",
    title: "Kuis Kombinatorika",
    description: "Soal permutasi, kombinasi, dan prinsip pencacahan",
    questions: 16,
    duration: 28,
    difficulty: "Sedang",
    attempts: 167,
    averageScore: 75,
  },
]

export default function QuizzesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Kuis & Latihan Soal</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uji pemahaman Anda dengan berbagai kuis interaktif. Dapatkan feedback langsung dan tingkatkan kemampuan
            matematika Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{quiz.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          quiz.difficulty === "Mudah"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : quiz.difficulty === "Sedang"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {quiz.difficulty}
                      </span>
                    </div>
                  </div>
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardDescription className="text-base">{quiz.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Target className="h-4 w-4" />
                    <span>{quiz.questions} soal</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{quiz.duration} menit</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rata-rata skor:</span>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{quiz.averageScore}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{quiz.attempts} siswa telah mengerjakan</div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/quizzes/${quiz.id}`}>Mulai Kuis</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
          <h3 className="text-xl font-semibold">Tips Mengerjakan Kuis</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <strong>Baca dengan teliti</strong>
              <br />
              Pastikan Anda memahami soal sebelum menjawab
            </div>
            <div>
              <strong>Kelola waktu</strong>
              <br />
              Perhatikan timer dan jangan terlalu lama di satu soal
            </div>
            <div>
              <strong>Pelajari pembahasan</strong>
              <br />
              Setelah selesai, baca pembahasan untuk memahami konsep
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
