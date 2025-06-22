import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Shapes, BarChart3, Zap, BookOpen, Brain } from "lucide-react"
import Link from "next/link"

const topics = [
  {
    id: "algebra",
    title: "Aljabar",
    description: "Pelajari konsep variabel, persamaan, dan sistem persamaan linear maupun non-linear",
    icon: Calculator,
    lessons: 12,
    quizzes: 8,
    level: "Pemula - Lanjutan",
    color: "bg-blue-500",
    subtopics: ["Persamaan Linear", "Sistem Persamaan", "Fungsi", "Polinomial"],
  },
  {
    id: "geometry",
    title: "Geometri",
    description: "Memahami bentuk, ukuran, dan sifat-sifat bangun datar maupun bangun ruang",
    icon: Shapes,
    lessons: 15,
    quizzes: 10,
    level: "Pemula - Menengah",
    color: "bg-green-500",
    subtopics: ["Bangun Datar", "Bangun Ruang", "Transformasi", "Koordinat"],
  },
  {
    id: "statistics",
    title: "Statistika",
    description: "Analisis data, distribusi probabilitas, dan interpretasi hasil statistik",
    icon: BarChart3,
    lessons: 10,
    quizzes: 6,
    level: "Pemula - Menengah",
    color: "bg-purple-500",
    subtopics: ["Deskriptif", "Probabilitas", "Distribusi", "Inferensi"],
  },
  {
    id: "calculus",
    title: "Kalkulus",
    description: "Konsep limit, turunan, integral, dan aplikasinya dalam berbagai bidang",
    icon: Zap,
    lessons: 18,
    quizzes: 12,
    level: "Lanjutan",
    color: "bg-red-500",
    subtopics: ["Limit", "Turunan", "Integral", "Aplikasi"],
  },
  {
    id: "trigonometry",
    title: "Trigonometri",
    description: "Fungsi trigonometri, identitas, dan penerapannya dalam geometri",
    icon: BookOpen,
    lessons: 8,
    quizzes: 5,
    level: "Menengah - Lanjutan",
    color: "bg-orange-500",
    subtopics: ["Fungsi Trigonometri", "Identitas", "Persamaan", "Grafik"],
  },
  {
    id: "combinatorics",
    title: "Kombinatorika",
    description: "Prinsip pencacahan, permutasi, kombinasi, dan teori graf dasar",
    icon: Brain,
    lessons: 6,
    quizzes: 4,
    level: "Menengah",
    color: "bg-teal-500",
    subtopics: ["Permutasi", "Kombinasi", "Prinsip Inklusi-Eksklusi", "Teori Graf"],
  },
]

export default function TopicsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Topik Matematika</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Jelajahi berbagai topik matematika yang tersusun secara sistematis. Setiap topik dilengkapi dengan materi
            dan kuis yang komprehensif.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => {
            const IconComponent = topic.icon
            return (
              <Card key={topic.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className={`w-12 h-12 ${topic.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                        <div className="text-sm text-muted-foreground mt-1">{topic.level}</div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">{topic.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{topic.lessons} materi</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Brain className="h-4 w-4" />
                      <span>{topic.quizzes} kuis</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Sub-topik:</p>
                    <div className="flex flex-wrap gap-1">
                      {topic.subtopics.map((subtopic) => (
                        <span key={subtopic} className="px-2 py-1 bg-muted rounded-md text-xs">
                          {subtopic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/topics/${topic.id}`}>Jelajahi Topik</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Pembelajaran Terstruktur</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Setiap topik dirancang dengan pendekatan pembelajaran yang sistematis, mulai dari konsep dasar hingga
            aplikasi lanjutan. Ikuti urutan pembelajaran yang direkomendasikan untuk hasil optimal.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto">
                1
              </div>
              <h4 className="font-semibold">Pelajari Konsep</h4>
              <p className="text-sm text-muted-foreground">Pahami teori dan konsep dasar</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto">
                2
              </div>
              <h4 className="font-semibold">Latihan Soal</h4>
              <p className="text-sm text-muted-foreground">Kerjakan kuis untuk menguji pemahaman</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto">
                3
              </div>
              <h4 className="font-semibold">Evaluasi</h4>
              <p className="text-sm text-muted-foreground">Tinjau hasil dan perbaiki kelemahan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
