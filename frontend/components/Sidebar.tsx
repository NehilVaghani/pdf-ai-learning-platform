"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/dashboard", icon: "🏠" },
    { name: "My PDFs", href: "/my-pdfs", icon: "📄" },
    { name: "Progress", href: "/progress", icon: "📊" },
    { name: "Favorites", href: "/favorites", icon: "⭐" },
    { name: "Profile", href: "/profile", icon: "👤" },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 shadow-xl">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          📚 PDF AI
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Learning Platform
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              pathname === item.href
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}