"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const router = useRouter();

  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState("");
  const [flashcards, setFlashcards] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/");
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const uploadPDF = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("user_id", user.id);

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/pdf/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setSummary(data.summary);
        setQuiz(data.quiz);
        setFlashcards(data.flashcards);

        setQuestion("");
        setAnswer("");
      } else {
        alert("Upload Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Backend Error");
    }

    setLoading(false);
  };

  const askAI = async () => {
    if (!question.trim()) return;

    setChatLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/chat/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
          }),
        }
      );

      const data = await response.json();

      setAnswer(data.answer);
    } catch (error) {
      console.error(error);
      alert("Chat Error");
    }

    setChatLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-64 p-6">
        <Navbar />

        <div className="grid grid-cols-4 gap-5 mt-8">

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">PDFs</h2>
            <p className="text-3xl font-bold">📄</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Quiz</h2>
            <p className="text-3xl font-bold">❓</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Flashcards</h2>
            <p className="text-3xl font-bold">📝</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">AI Chat</h2>
            <p className="text-3xl font-bold">💬</p>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Upload PDF
          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={uploadPDF}
            className="border rounded-lg p-3"
          />

          {loading && (
            <div className="mt-6 text-blue-600 text-lg font-semibold">
              🤖 AI is reading your PDF...
            </div>
          )}
        </div>
                {summary && (
          <div className="bg-blue-50 rounded-xl shadow mt-8 p-6">

            <h2 className="text-3xl font-bold text-blue-700 mb-4">
              📄 AI Summary
            </h2>

            <pre className="whitespace-pre-wrap text-gray-800">
              {summary}
            </pre>

          </div>
        )}

        {quiz && (
          <div className="bg-green-50 rounded-xl shadow mt-8 p-6">

            <h2 className="text-3xl font-bold text-green-700 mb-4">
              ❓ AI Quiz
            </h2>

            <pre className="whitespace-pre-wrap text-gray-800">
              {quiz}
            </pre>

          </div>
        )}

        {flashcards && (
          <div className="bg-yellow-50 rounded-xl shadow mt-8 p-6">

            <h2 className="text-3xl font-bold text-yellow-700 mb-4">
              📝 AI Flashcards
            </h2>

            <pre className="whitespace-pre-wrap text-gray-800">
              {flashcards}
            </pre>

          </div>
        )}

        {summary && (
          <div className="bg-white rounded-xl shadow mt-8 p-6">

            <h2 className="text-3xl font-bold mb-5">
              💬 Chat With PDF
            </h2>

            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about your PDF..."
              className="w-full border rounded-lg p-3"
            />

            <button
              onClick={askAI}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Ask AI
            </button>

            {chatLoading && (
              <p className="mt-4 text-blue-600">
                AI is thinking...
              </p>
            )}

            {answer && (
              <div className="mt-6 bg-gray-100 rounded-lg p-5">

                <h3 className="text-2xl font-bold mb-3">
                  🤖 AI Answer
                </h3>

                <pre className="whitespace-pre-wrap">
                  {answer}
                </pre>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}