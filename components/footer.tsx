import Link from "next/link"
import { Calculator, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-primary" />
              <span className="font-bold">MathGrit</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Platform pembelajaran matematika modern untuk siswa SMA dan mahasiswa.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Pembelajaran</h3>
            <div className="space-y-2 text-sm">
              <Link href="/lessons" className="block hover:text-primary transition-colors">
                Materi
              </Link>
              <Link href="/quizzes" className="block hover:text-primary transition-colors">
                Kuis
              </Link>
              <Link href="/topics" className="block hover:text-primary transition-colors">
                Topik
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Informasi</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block hover:text-primary transition-colors">
                Tentang Kami
              </Link>
              <Link href="/contact" className="block hover:text-primary transition-colors">
                Kontak
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Kontak</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@mathgrit.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+62 859-7532-0496</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 MathGrit. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
