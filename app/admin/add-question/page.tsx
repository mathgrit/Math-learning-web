// app/admin/add-question/page.tsx

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AddQuestionPage() {
  const supabase = createServerComponentClient({ cookies });

  // 1. Ambil data sesi user
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Jika tidak login, tendang ke halaman login
  if (!session) {
    redirect("/login");
  }

  // 2. Ambil data profil untuk cek peran
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  // Jika bukan admin, tampilkan pesan error
  if (profile?.role !== "admin") {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-destructive">Akses Ditolak</h1>
        <p>Halaman ini hanya untuk Admin.</p>
      </div>
    );
  }

  // 3. Server Action untuk menangani form submission
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const question_text = formData.get("question_text") as string;
    const option_a = formData.get("option_a") as string;
    const option_b = formData.get("option_b") as string;
    const option_c = formData.get("option_c") as string;
    const option_d = formData.get("option_d") as string;
    const correct_answer = formData.get("correct_answer") as string;

    const supabase = createServerComponentClient({ cookies });

    const { error } = await supabase.from("questions").insert({
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
    });

    if (error) {
      console.error("Error inserting question:", error);
      // Nanti bisa ditambahkan notifikasi error
    } else {
      console.log("Question added successfully");
      // Nanti bisa ditambahkan notifikasi sukses & redirect
    }
  };

  // Jika lolos semua pengecekan, tampilkan form
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-6">Tambah Soal Baru</h1>
      <form action={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="question_text">Teks Pertanyaan</Label>
          <Textarea
            id="question_text"
            name="question_text"
            required
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="option_a">Pilihan A</Label>
            <Input id="option_a" name="option_a" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="option_b">Pilihan B</Label>
            <Input id="option_b" name="option_b" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="option_c">Pilihan C</Label>
            <Input id="option_c" name="option_c" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="option_d">Pilihan D</Label>
            <Input id="option_d" name="option_d" required className="mt-1" />
          </div>
        </div>
        <div>
          <Label htmlFor="correct_answer">
            Jawaban Benar (a, b, c, atau d)
          </Label>
          <Input
            id="correct_answer"
            name="correct_answer"
            required
            maxLength={1}
            className="mt-1"
          />
        </div>
        <Button type="submit">Simpan Soal</Button>
      </form>
    </div>
  );
}
