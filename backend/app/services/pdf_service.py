import fitz
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def extract_text_from_pdf(file_path: str):
    doc = fitz.open(file_path)
    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()
    return text


def ask_ai(prompt: str):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.3,
    )

    return response.choices[0].message.content


def summarize_text(text: str):
    prompt = f"""
Summarize this PDF in simple bullet points.

{text}
"""

    return ask_ai(prompt)


def generate_quiz(text: str):
    prompt = f"""
Generate 10 MCQs from this PDF.

Format:

Q1
A
B
C
D
Answer

{text}
"""

    return ask_ai(prompt)


def generate_flashcards(text: str):
    prompt = f"""
Generate 10 flashcards.

Format:

Question
Answer

{text}
"""

    return ask_ai(prompt)


def generate_course(text: str):
    prompt = f"""
Create a complete structured learning course.

Include:

Course Title

Description

Objectives

Prerequisites

Estimated Time

Difficulty

Chapters

Lessons

Examples

Summary

PDF:

{text}
"""

    return ask_ai(prompt)