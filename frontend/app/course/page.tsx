"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function CoursePage() {
  const [course, setCourse] = useState("");

  useEffect(() => {
    const savedCourse = localStorage.getItem("ai_course");

    if (savedCourse) {
      setCourse(savedCourse);
    }
  }, []);

  const chapters = [
    {
      title: "Chapter 1 - Introduction",
      lessons: ["Lesson 1", "Lesson 2", "Lesson 3"],
    },
    {
      title: "Chapter 2 - Core Concepts",
      lessons: ["Lesson 4", "Lesson 5"],
    },
    {
      title: "Chapter 3 - Practical Examples",
      lessons: ["Lesson 6", "Lesson 7"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold">
            📚 AI Generated Course
          </h1>

          <p className="text-gray-500 mt-2">
            Learn chapter by chapter with AI
          </p>

          <div className="grid grid-cols-4 gap-6 mt-8">
            {/* Left Sidebar */}
            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="text-xl font-bold mb-4">
                Chapters
              </h2>

              {chapters.map((chapter, index) => (
                <div key={index} className="mb-5">
                  <h3 className="font-semibold text-blue-600">
                    {chapter.title}
                  </h3>

                  <ul className="mt-2 space-y-2">
                    {chapter.lessons.map((lesson, i) => (
                      <li
                        key={i}
                        className="cursor-pointer hover:text-blue-600"
                      >
                        📖 {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right Content */}
            <div className="col-span-3">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-3xl font-bold">
                  Lesson Content
                </h2>

                <pre className="whitespace-pre-wrap mt-6 text-gray-700">
                  {course ||
                    "No AI course generated yet. Please upload a PDF first."}
                </pre>

                <div className="mt-8">
                  <h3 className="font-bold text-xl">
                    Progress
                  </h3>

                  <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
                    <div className="bg-green-500 h-4 rounded-full w-1/4"></div>
                  </div>

                  <p className="mt-2 font-semibold">
                    25% Completed
                  </p>
                </div>

                <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                  ✅ Mark Lesson Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}