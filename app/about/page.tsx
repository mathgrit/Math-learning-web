import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Users, Award, Heart } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold">Tentang MathGrit</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            MathGrit adalah platform pembelajaran matematika modern yang dirancang khusus untuk membantu siswa SMA dan
            mahasiswa tahun pertama menguasai konsep matematika dengan cara yang menyenangkan dan interaktif.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Visi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi platform pembelajaran matematika terdepan yang membuat matematika mudah dipahami dan
                menyenangkan untuk dipelajari, sehingga setiap siswa dapat mencapai potensi maksimal mereka dalam bidang
                matematika.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Misi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Menyediakan materi pembelajaran yang berkualitas dan mudah dipahami</li>
                <li>• Mengembangkan metode pembelajaran interaktif dan engaging</li>
                <li>• Membantu siswa membangun kepercayaan diri dalam matematika</li>
                <li>• Menciptakan komunitas belajar yang supportif dan kolaboratif</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Nilai-Nilai Kami</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi fondasi dalam setiap aspek pengembangan platform MathGrit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle>Inklusivitas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Kami percaya bahwa setiap orang memiliki kemampuan untuk belajar matematika, terlepas dari latar
                  belakang atau tingkat kemampuan awal mereka.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle>Kualitas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Setiap materi dan fitur yang kami kembangkan melalui proses review yang ketat untuk memastikan
                  kualitas pembelajaran yang terbaik.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-purple-500" />
                </div>
                <CardTitle>Inovasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Kami terus berinovasi dalam metode pembelajaran dan teknologi untuk memberikan pengalaman belajar yang
                  lebih baik dan efektif.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Tim Kami</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dibalik MathGrit ada tim yang berdedikasi untuk menciptakan pengalaman pembelajaran matematika yang
              luar biasa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Angga"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle>Dr. Angga Nurohman</CardTitle>
                <CardDescription>Founder & Lead Educator</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  PhD Matematika dari MIT dengan 15 tahun pengalaman mengajar. Passionate dalam mengembangkan metode
                  pembelajaran inovatif.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Agyl"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle>Agyl Ridwan Hakim, M.Kom.</CardTitle>
                <CardDescription>CTO & Lead Developer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lulusan Teknik Informatika ITB dengan expertise dalam educational technology dan user experience
                  design.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Willy"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle>Willy Moch. Shabrin K., M.Pd.</CardTitle>
                <CardDescription>Content Specialist</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Master Pendidikan Matematika dengan pengalaman 10 tahun dalam pengembangan kurikulum dan materi
                  pembelajaran.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Pencapaian Kami</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold">1000+</div>
                <div className="text-sm opacity-90">Siswa Aktif</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">50+</div>
                <div className="text-sm opacity-90">Materi Pembelajaran</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">30+</div>
                <div className="text-sm opacity-90">Kuis Interaktif</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">95%</div>
                <div className="text-sm opacity-90">Tingkat Kepuasan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
