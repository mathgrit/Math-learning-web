import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Users, BookOpen, CheckCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample lesson data - in real app, this would come from a database
const lessons = {
  "aljabar-dasar": {
    title: "Aljabar Dasar",
    description: "Pelajari konsep dasar aljabar, variabel, dan persamaan linear",
    duration: "45 menit",
    students: 234,
    level: "Pemula",
    content: [
      {
        type: "section",
        title: "Pengenalan Variabel",
        content:
          "Variabel adalah simbol yang mewakili nilai yang tidak diketahui. Biasanya dilambangkan dengan huruf seperti x, y, atau z.",
      },
      {
        type: "example",
        title: "Contoh Variabel",
        content: "Jika x = 5, maka 2x = 2 × 5 = 10",
      },
      {
        type: "section",
        title: "Persamaan Linear",
        content: "Persamaan linear adalah persamaan yang variabelnya berpangkat satu. Bentuk umum: ax + b = c",
      },
    ],
  },
}

export default function LessonDetailPage({ params }: { params: { slug: string } }) {
  const lesson = lessons[params.slug as keyof typeof lessons]

  if (!lesson) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/lessons">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Materi
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{lesson.title}</h1>
              <p className="text-xl text-muted-foreground">{lesson.description}</p>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{lesson.students} siswa</span>
                </div>
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

            {/* Lesson Content */}
            <div className="space-y-6">
              {lesson.content.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {item.type === "example" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-primary" />
                      )}
                      <span>{item.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Pembelajaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Kemajuan</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "0%" }}></div>
                  </div>
                </div>
                <Button className="w-full">Mulai Belajar</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Materi Terkait</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/lessons/geometri-bidang" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                  <div className="font-medium">Geometri Bidang</div>
                  <div className="text-sm text-muted-foreground">Bangun datar dan perhitungan luas</div>
                </Link>
                <Link href="/lessons/trigonometri" className="block p-3 rounded-lg hover:bg-muted transition-colors">
                  <div className="font-medium">Trigonometri</div>
                  <div className="text-sm text-muted-foreground">Fungsi sin, cos, dan tan</div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
