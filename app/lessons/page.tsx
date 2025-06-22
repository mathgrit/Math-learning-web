import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Users } from "lucide-react"
import Link from "next/link"

const lessons = [
  {
    id: "aljabar-dasar",
    title: "Aljabar Dasar",
    description: "Pelajari konsep dasar aljabar, variabel, dan persamaan linear",
    duration: "45 menit",
    students: 234,
    level: "Pemula",
    topics: ["Variabel", "Persamaan Linear", "Sistem Persamaan"],
  },
  {
    id: "geometri-bidang",
    title: "Geometri Bidang",
    description: "Memahami bentuk-bentuk geometri 2D dan perhitungan luas",
    duration: "60 menit",
    students: 189,
    level: "Menengah",
    topics: ["Segitiga", "Lingkaran", "Bangun Datar"],
  },
  {
    id: "trigonometri",
    title: "Trigonometri",
    description: "Konsep sin, cos, tan dan aplikasinya dalam kehidupan sehari-hari",
    duration: "75 menit",
    students: 156,
    level: "Lanjutan",
    topics: ["Fungsi Trigonometri", "Identitas", "Grafik"],
  },
  {
    id: "kalkulus-diferensial",
    title: "Kalkulus Diferensial",
    description: "Pengenalan limit, turunan, dan aplikasinya",
    duration: "90 menit",
    students: 98,
    level: "Lanjutan",
    topics: ["Limit", "Turunan", "Aplikasi Turunan"],
  },
  {
    id: "statistika-dasar",
    title: "Statistika Dasar",
    description: "Memahami data, distribusi, dan analisis statistik sederhana",
    duration: "50 menit",
    students: 167,
    level: "Pemula",
    topics: ["Mean", "Median", "Modus", "Distribusi"],
  },
  {
    id: "kombinatorika",
    title: "Kombinatorika",
    description: "Permutasi, kombinasi, dan prinsip pencacahan",
    duration: "55 menit",
    students: 123,
    level: "Menengah",
    topics: ["Permutasi", "Kombinasi", "Prinsip Pencacahan"],
  },
]

export default function LessonsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Materi Pembelajaran</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pilih materi yang ingin Anda pelajari. Setiap materi dilengkapi dengan penjelasan detail dan contoh soal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{lesson.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lesson.level === "Pemula"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : lesson.level === "Menengah"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {lesson.level}
                      </span>
                    </div>
                  </div>
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardDescription className="text-base">{lesson.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{lesson.students} siswa</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Topik yang dipelajari:</p>
                  <div className="flex flex-wrap gap-1">
                    {lesson.topics.map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-muted rounded-md text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/lessons/${lesson.id}`}>Mulai Belajar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
