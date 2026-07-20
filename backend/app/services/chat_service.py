import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

pdf_text = ""

def set_pdf_text(text):
    global pdf_text
    pdf_text = text

def ask_pdf(question: str):
    prompt = f"""
Answer the user's question only from the PDF content.

PDF:

{pdf_text}

Question:
{question}
"""

    model = genai.GenerativeModel("gemini-3.5-flash")
    response = model.generate_content(prompt)

    return response.text