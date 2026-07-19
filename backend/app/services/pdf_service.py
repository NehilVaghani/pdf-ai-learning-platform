import fitz
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def extract_text_from_pdf(file_path: str):
    doc = fitz.open(file_path)
    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()
    return text


def ask_gemini(prompt: str):
    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
        )

        return response.text

    except Exception as e:
        print("Gemini Error:", e)
        raise


def summarize_text(text: str):
    prompt = f"""
Summarize the following PDF in simple bullet points.

{text}
"""

    return ask_gemini(prompt)


def generate_quiz(text: str):
    prompt = f"""
Read the following PDF text and generate 10 Multiple Choice Questions.

Format:

Q1.
A.
B.
C.
D.
Answer:

PDF:

{text}
"""

    return ask_gemini(prompt)


def generate_flashcards(text: str):
    prompt = f"""
Read the following PDF and create 10 flashcards.

Format:

Question:
Answer:

PDF:

{text}
"""

    return ask_gemini(prompt)

    def generate_course(text: str):

        prompt = f"""
        
You are an expert course creator.

Convert the following PDF into a professional e-learning course.

Return the response in this format:

# Course Title

# Course Description

# Estimated Learning Time

# Difficulty Level

# Learning Objectives

# Prerequisites

# Table of Contents

## Chapter 1
### Lesson 1
Explanation

Key Takeaways

Real World Example

Summary

Repeat for all chapters.

PDF Content:

{text}
"""

    return ask_gemini(prompt)