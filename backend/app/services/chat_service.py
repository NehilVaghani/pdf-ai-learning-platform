import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

pdf_text = ""


def set_pdf_text(text):
    global pdf_text
    pdf_text = text


def ask_pdf(question: str):
    prompt = f"""
Answer only using the PDF.

PDF:

{pdf_text}

Question:

{question}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.2,
    )

    return response.choices[0].message.content