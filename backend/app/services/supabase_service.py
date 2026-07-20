import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(url, key)


def save_pdf(user_id, filename, summary, quiz, flashcards, course):
    data = {
        "user_id": user_id,
        "filename": filename,
        "summary": summary,
        "quiz": quiz,
        "flashcards": flashcards,
        "course": course,
    }

    return supabase.table("pdfs").insert(data).execute()