import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

pdf_text = ""

def set_pdf_text(text: str):
    global pdf_text
    pdf_text = text

def ask_pdf(question: str):
    prompt = f"""
You are an AI tutor.

Use ONLY the following PDF content to answer.

PDF:

{pdf_text}

Question:
{question}

Answer in simple language.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return response.text