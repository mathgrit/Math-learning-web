"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Hubungi Kami</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ada pertanyaan atau saran? Kami siap membantu Anda. Jangan ragu untuk menghubungi tim MathGrit.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">info@mathgrit.com</p>
                <p className="text-muted-foreground">support@mathgrit.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Telepon</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">+62 859-7532-0496</p>
                <p className="text-sm text-muted-foreground mt-1">Senin - Jumat: 09:00 - 17:00 WIB</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Alamat</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Jl. Siliwangi No. 24
                  <br />
                  Tasikmalaya 46115
                  <br />
                  Indonesia
                </p>
              </CardContent>
            </Card>

            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold">Waktu Respon</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📧 Email: 1-2 hari kerja</p>
                <p>📱 WhatsApp: 2-4 jam</p>
                <p>📞 Telepon: Langsung saat jam kerja</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Kirim Pesan</CardTitle>
                <CardDescription>Isi form di bawah ini dan kami akan merespon secepat mungkin</CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                      <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">Pesan Terkirim!</h3>
                    <p className="text-muted-foreground">
                      Terima kasih atas pesan Anda. Tim kami akan segera merespon dalam 1-2 hari kerja.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Kirim Pesan Lain
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nama Lengkap *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Masukkan nama lengkap Anda"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="nama@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subjek *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Topik pesan Anda"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Pesan *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tulis pesan Anda di sini..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Kirim Pesan
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-muted-foreground">Mungkin pertanyaan Anda sudah terjawab di bawah ini</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Apakah MathGrit gratis?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ya, sebagian besar fitur MathGrit dapat diakses secara gratis. Kami juga menyediakan paket premium
                  dengan fitur tambahan untuk pembelajaran yang lebih mendalam.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bagaimana cara memulai belajar?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Anda dapat langsung mengakses materi pembelajaran tanpa perlu registrasi. Namun, untuk menyimpan
                  progress belajar, kami sarankan untuk membuat akun terlebih dahulu.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Apakah ada sertifikat setelah menyelesaikan materi?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Saat ini kami sedang mengembangkan sistem sertifikat digital. Fitur ini akan segera tersedia untuk
                  pengguna yang menyelesaikan seluruh materi dalam suatu topik.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bagaimana jika saya kesulitan memahami materi?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Anda dapat menghubungi tim support kami melalui email atau WhatsApp. Kami juga menyediakan forum
                  diskusi di mana Anda dapat bertanya kepada sesama pengguna.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
