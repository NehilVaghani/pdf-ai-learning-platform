"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="bg-white shadow p-5 flex justify-between items-center rounded-xl">
      <h2 className="text-2xl font-bold">
        PDF AI Learning Platform
      </h2>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
      >
        Logout
      </button>
    </header>
  );
}