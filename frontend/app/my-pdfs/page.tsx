"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type PDF = {
  id: number;
  filename: string;
  created_at: string;
};

export default function MyPDFs() {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPDFs();
  }, []);

  async function fetchPDFs() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("pdfs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setPdfs(data || []);
  }

  async function deletePDF(id: number) {
    const ok = window.confirm("Delete this PDF?");

    if (!ok) return;

    const { error } = await supabase
      .from("pdfs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Delete failed");
      return;
    }

    fetchPDFs();
  }

  const filtered = pdfs.filter((pdf) =>
    pdf.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-6">
          My PDFs
        </h1>

        <input
          type="text"
          placeholder="Search PDF..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3 mb-8"
        />

        {filtered.length === 0 ? (
          <p>No PDFs Found.</p>
        ) : (
          <div className="space-y-5">

            {filtered.map((pdf) => (

              <div
                key={pdf.id}
                className="border rounded-lg p-5 shadow-sm"
              >

                <Link href={`/pdf/${pdf.id}`}>
                  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-2">

                    <h2 className="text-xl font-semibold">
                      {pdf.filename}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Uploaded:
                      {" "}
                      {new Date(pdf.created_at).toLocaleString()}
                    </p>

                  </div>
                </Link>

                <button
                  onClick={() => deletePDF(pdf.id)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Delete PDF
                </button>

              </div>

            ))}

          </div>
        )}

      </div>
    </main>
  );
}