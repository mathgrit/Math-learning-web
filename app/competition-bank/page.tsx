"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Kita akan definisikan tipe data untuk satu soal
type Question = {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
};

export default function BankSoalPage() {
  // State untuk menyimpan daftar soal dari database
  const [questions, setQuestions] = useState<Question[]>([]);
  // State untuk menandakan proses loading
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  // useEffect untuk mengambil data dari Supabase saat halaman dimuat
  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching questions:", error);
      } else {
        setQuestions(data);
      }
      setLoading(false);
    };

    getQuestions();
  }, [supabase]); // Jalankan efek ini setiap kali supabase client berubah (cukup sekali)

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bank Soal</h1>

      {loading ? (
        <p className="text-center">Memuat soal...</p>
      ) : questions.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Belum ada soal yang ditambahkan.
        </p>
      ) : (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <Card key={q.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Soal #{index + 1}</CardTitle>
                  <Badge variant="secondary">ID: {q.id}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">{q.question_text}</p>
                <div className="space-y-2 text-muted-foreground">
                  <p>A. {q.option_a}</p>
                  <p>B. {q.option_b}</p>
                  <p>C. {q.option_c}</p>
                  <p>D. {q.option_d}</p>
                  <p className="mt-4">
                    <span className="font-semibold text-foreground">
                      Jawaban Benar:
                    </span>{" "}
                    {q.correct_answer.toUpperCase()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
