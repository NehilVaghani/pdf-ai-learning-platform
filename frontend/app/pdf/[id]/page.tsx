"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function PDFDetails() {
  const { id } = useParams();

  const [pdf, setPdf] = useState<any>(null);

  useEffect(() => {
    fetchPDF();
  }, []);

  async function fetchPDF() {
    const { data, error } = await supabase
      .from("pdfs")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setPdf(data);
    }
  }

  if (!pdf) {
    return <h1 className="p-10">Loading...</h1>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          {pdf.filename}
        </h1>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-3">Summary</h2>
          <pre className="whitespace-pre-wrap">{pdf.summary}</pre>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-3">Quiz</h2>
          <pre className="whitespace-pre-wrap">{pdf.quiz}</pre>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">Flashcards</h2>
          <pre className="whitespace-pre-wrap">{pdf.flashcards}</pre>
        </div>

      </div>
    </main>
  );
}