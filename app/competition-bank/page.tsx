"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Eye, Trophy, Calendar, BookOpen, Target } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Sample data for competitions and problems
const competitionData = [
  {
    id: "osn-2024",
    competition: "Olimpiade Sains Nasional (OSN)",
    year: "2024",
    totalProblems: 15,
    problems: [
      {
        id: 1,
        title: "Soal #1 - Tingkat Kabupaten",
        topic: "Aljabar",
        difficulty: "Sedang",
        question:
          "Diberikan persamaan kuadrat x² - (2a+1)x + a² + a = 0. Tentukan nilai a agar persamaan tersebut memiliki akar-akar yang berbeda dan kedua akarnya positif.",
        solution:
          "Langkah 1: Agar persamaan memiliki akar berbeda, diskriminan D > 0\nD = (2a+1)² - 4(a² + a) = 4a² + 4a + 1 - 4a² - 4a = 1 > 0 ✓\n\nLangkah 2: Agar kedua akar positif, gunakan teorema Vieta:\n- Jumlah akar = (2a+1) > 0 → a > -1/2\n- Hasil kali akar = a² + a > 0 → a(a+1) > 0 → a < -1 atau a > 0\n\nLangkah 3: Gabungkan syarat:\na > -1/2 dan (a < -1 atau a > 0)\nKarena a > -1/2, maka syarat a < -1 tidak mungkin.\nJadi a > 0.\n\nJawaban: a > 0",
      },
      {
        id: 2,
        title: "Soal #2 - Tingkat Provinsi",
        topic: "Geometri",
        difficulty: "Sulit",
        question:
          "Dalam segitiga ABC, titik D terletak pada sisi BC sehingga BD:DC = 2:3. Jika luas segitiga ABD adalah 12 cm², tentukan luas segitiga ABC.",
        solution:
          "Langkah 1: Gunakan sifat perbandingan luas segitiga\nKarena D terletak pada BC dengan BD:DC = 2:3, maka BD:BC = 2:5\n\nLangkah 2: Hitung luas segitiga ABC\nLuas △ABD : Luas △ABC = BD : BC = 2 : 5\n12 : Luas △ABC = 2 : 5\nLuas △ABC = (12 × 5) ÷ 2 = 30 cm²\n\nJawaban: 30 cm²",
      },
      {
        id: 3,
        title: "Soal #3 - Tingkat Nasional",
        topic: "Kombinatorika",
        difficulty: "Sangat Sulit",
        question:
          "Berapa banyak cara untuk menyusun huruf-huruf dalam kata 'MATEMATIKA' sehingga tidak ada dua huruf A yang berdekatan?",
        solution:
          "Langkah 1: Analisis kata MATEMATIKA\nHuruf: M(2), A(3), T(2), E(1), I(1), K(1)\nTotal: 10 huruf\n\nLangkah 2: Hitung total susunan tanpa batasan\nTotal = 10!/(2!×3!×2!) = 151,200\n\nLangkah 3: Hitung susunan dengan A berdekatan\nAnggap 3 A sebagai satu blok, sisa 8 posisi\nSusunan = 8!/(2!×2!) × 1 = 10,080\n\nLangkah 4: Hitung susunan dengan tepat 2 A berdekatan\nMenggunakan prinsip inklusi-eksklusi...\n\nJawaban: 50,400 cara",
      },
    ],
  },
  {
    id: "ksm-2023",
    competition: "Kompetisi Sains Madrasah (KSM)",
    year: "2023",
    totalProblems: 12,
    problems: [
      {
        id: 1,
        title: "Soal #1 - Tingkat Kabupaten",
        topic: "Teori Bilangan",
        difficulty: "Mudah",
        question: "Tentukan sisa pembagian 2²⁰²³ ketika dibagi 7.",
        solution:
          "Langkah 1: Cari pola sisa pembagian 2ⁿ terhadap 7\n2¹ ≡ 2 (mod 7)\n2² ≡ 4 (mod 7)\n2³ ≡ 1 (mod 7)\n\nLangkah 2: Pola berulang setiap 3 pangkat\n2²⁰²³ = 2^(3×674+1) = (2³)^674 × 2¹ ≡ 1^674 × 2 ≡ 2 (mod 7)\n\nJawaban: 2",
      },
      {
        id: 2,
        title: "Soal #2 - Tingkat Provinsi",
        topic: "Aljabar",
        difficulty: "Sedang",
        question: "Jika x + y = 5 dan xy = 6, tentukan nilai x³ + y³.",
        solution:
          "Langkah 1: Gunakan identitas aljabar\nx³ + y³ = (x + y)³ - 3xy(x + y)\n\nLangkah 2: Substitusi nilai yang diketahui\nx³ + y³ = 5³ - 3(6)(5) = 125 - 90 = 35\n\nJawaban: 35",
      },
    ],
  },
  {
    id: "imo-2023",
    competition: "International Mathematical Olympiad (IMO)",
    year: "2023",
    totalProblems: 6,
    problems: [
      {
        id: 1,
        title: "Problem #1",
        topic: "Kombinatorika",
        difficulty: "Sangat Sulit",
        question:
          "Determine all composite integers n > 1 that satisfy the following property: if d₁, d₂, ..., dₖ are all the positive divisors of n with 1 = d₁ < d₂ < ... < dₖ = n, then d₂ + d₃ + ... + dₖ₋₁ divides n.",
        solution:
          "This is a complex problem requiring deep number theory analysis.\n\nStep 1: Let σ(n) be the sum of all divisors of n.\nWe need d₂ + d₃ + ... + dₖ₋₁ | n\nThis equals σ(n) - 1 - n | n\n\nStep 2: Since σ(n) - 1 - n | n, we have σ(n) - 1 - n | σ(n) - 1\nTherefore σ(n) - 1 - n | (σ(n) - 1) - (σ(n) - 1 - n) = n\n\nStep 3: Analysis shows the only solutions are n = 6, 12, 18, 20, 28, 88, 104, 272, 304, 350, 368, 464, 490, 496, 550, 572, 650, 748, 770, 910, 945, 1184, 1190, 1312, 1330, 1376, 1430, 1504, 1575, 1696, 1870, 1888, 1952, 2002, 2090, 2205, 2210, 2470, 2530, 2584, 2590, 2650, 2695, 2752, 2870, 2990, 3010, 3164, 3230, 3410, 3496, 3770, 3944, 4030, 4070, 4180, 4216, 4270, 4288, 4408, 4510, 4544, 4576, 4730, 4774, 4810, 4928, 5005, 5170, 5236, 5270, 5290, 5434, 5456, 5530, 5590, 5610, 5650, 5830, 5890, 6020, 6050, 6118, 6188, 6230, 6370, 6394, 6460, 6496, 6532, 6650, 6670, 6710, 6760, 6790, 6820, 6860, 6890, 6916, 6970, 7030, 7150, 7192, 7210, 7280, 7310, 7330, 7370, 7390, 7420, 7462, 7480, 7540, 7546, 7570, 7630, 7690, 7750, 7810, 7820, 7840, 7930, 7960, 8008, 8030, 8050, 8092, 8170, 8190, 8200, 8230, 8290, 8320, 8350, 8470, 8530, 8590, 8650, 8680, 8710, 8740, 8770, 8830, 8890, 8920, 8950, 9010, 9030, 9070, 9130, 9190, 9230, 9250, 9310, 9350, 9370, 9430, 9490, 9520, 9550, 9610, 9670, 9730, 9790, 9850, 9910, 9970.\n\nAnswer: The complete list requires extensive computation and verification.",
      },
    ],
  },
]

const competitions = [
  "Semua Kompetisi",
  "Olimpiade Sains Nasional (OSN)",
  "Kompetisi Sains Madrasah (KSM)",
  "International Mathematical Olympiad (IMO)",
]
const years = ["Semua Tahun", "2024", "2023", "2022", "2021", "2020"]
const topics = ["Semua Topik", "Aljabar", "Geometri", "Kombinatorika", "Teori Bilangan"]

export default function CompetitionBankPage() {
  const [selectedCompetition, setSelectedCompetition] = useState("Semua Kompetisi")
  const [selectedYear, setSelectedYear] = useState("Semua Tahun")
  const [selectedTopic, setSelectedTopic] = useState("Semua Topik")
  const [filteredData, setFilteredData] = useState(competitionData)

  const applyFilters = () => {
    let filtered = competitionData

    if (selectedCompetition !== "Semua Kompetisi") {
      filtered = filtered.filter((item) => item.competition === selectedCompetition)
    }

    if (selectedYear !== "Semua Tahun") {
      filtered = filtered.filter((item) => item.year === selectedYear)
    }

    if (selectedTopic !== "Semua Topik") {
      filtered = filtered
        .map((item) => ({
          ...item,
          problems: item.problems.filter((problem) => problem.topic === selectedTopic),
          totalProblems: item.problems.filter((problem) => problem.topic === selectedTopic).length,
        }))
        .filter((item) => item.problems.length > 0)
    }

    setFilteredData(filtered)
  }

  const resetFilters = () => {
    setSelectedCompetition("Semua Kompetisi")
    setSelectedYear("Semua Tahun")
    setSelectedTopic("Semua Topik")
    setFilteredData(competitionData)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Sedang":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Sulit":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Sangat Sulit":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case "Aljabar":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Geometri":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Kombinatorika":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
      case "Teori Bilangan":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold">Bank Soal Kompetisi Matematika</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Temukan dan pelajari soal-soal dari Olimpiade Sains Nasional (OSN), Kompetisi Sains Madrasah (KSM), dan
            kompetisi bergengsi lainnya dari tahun ke tahun.
          </p>
        </div>

        {/* Filter Section */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-primary" />
              <span>Filter Soal</span>
            </CardTitle>
            <CardDescription>Gunakan filter di bawah ini untuk menemukan soal sesuai kebutuhan Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span>Pilih Kompetisi</span>
                </label>
                <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kompetisi" />
                  </SelectTrigger>
                  <SelectContent>
                    {competitions.map((competition) => (
                      <SelectItem key={competition} value={competition}>
                        {competition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Pilih Tahun</span>
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Pilih Topik</span>
                </label>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih topik" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={applyFilters} className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4 mr-2" />
                Terapkan Filter
              </Button>
              <Button onClick={resetFilters} variant="outline" className="flex-1 sm:flex-none">
                Reset Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Hasil Pencarian</h2>
            <div className="text-sm text-muted-foreground">
              Ditemukan {filteredData.reduce((total, item) => total + item.totalProblems, 0)} soal dari{" "}
              {filteredData.length} kompetisi
            </div>
          </div>

          {filteredData.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="space-y-4">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">Tidak ada soal ditemukan</h3>
                    <p className="text-muted-foreground">
                      Coba ubah filter atau reset untuk melihat semua soal yang tersedia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Accordion type="multiple" className="space-y-4">
              {filteredData.map((competitionItem) => (
                <AccordionItem key={competitionItem.id} value={competitionItem.id} className="border rounded-lg px-6">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center space-x-3">
                        <Trophy className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <div className="font-semibold">
                            {competitionItem.competition} - {competitionItem.year}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Kompetisi matematika tingkat nasional/internasional
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {competitionItem.totalProblems} Soal
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-4">
                      {competitionItem.problems.map((problem) => (
                        <Card key={problem.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg">{problem.title}</CardTitle>
                              <div className="flex space-x-2">
                                <Badge className={getTopicColor(problem.topic)}>{problem.topic}</Badge>
                                <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium mb-2">Pertanyaan:</h4>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                  {problem.question}
                                </p>
                              </div>

                              <Collapsible>
                                <CollapsibleTrigger asChild>
                                  <Button variant="outline" size="sm" className="w-full">
                                    <Eye className="h-4 w-4 mr-2" />
                                    Tampilkan Pembahasan
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-4">
                                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                                    <h4 className="font-medium flex items-center space-x-2">
                                      <Target className="h-4 w-4 text-primary" />
                                      <span>Pembahasan:</span>
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                      {problem.solution}
                                    </p>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {/* Statistics Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold">Statistik Bank Soal</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {competitionData.reduce((total, item) => total + item.totalProblems, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Soal</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">{competitionData.length}</div>
                  <div className="text-sm text-muted-foreground">Kompetisi</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">Tahun Terakhir</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">4</div>
                  <div className="text-sm text-muted-foreground">Topik Utama</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>Tips Menggunakan Bank Soal</CardTitle>
            <CardDescription>Maksimalkan pembelajaran Anda dengan tips berikut</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center space-x-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span>Strategi Belajar</span>
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Mulai dari soal tingkat mudah untuk membangun kepercayaan diri</li>
                  <li>• Fokus pada satu topik dalam satu sesi belajar</li>
                  <li>• Coba selesaikan soal sendiri sebelum melihat pembahasan</li>
                  <li>• Catat pola dan teknik yang sering muncul</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Persiapan Kompetisi</span>
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Latih soal dari tahun-tahun sebelumnya</li>
                  <li>• Perhatikan tingkat kesulitan yang meningkat setiap tahun</li>
                  <li>• Pelajari berbagai pendekatan untuk satu masalah</li>
                  <li>• Berlatih dengan batasan waktu seperti kondisi kompetisi</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
