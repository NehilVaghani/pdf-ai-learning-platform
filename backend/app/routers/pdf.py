from fastapi import APIRouter, UploadFile, File, Form
import shutil
import os

from app.services.pdf_service import (
    extract_text_from_pdf,
    summarize_text,
    generate_quiz,
    generate_flashcards,
    generate_course,
)

from app.services.chat_service import set_pdf_text
from app.services.supabase_service import save_pdf

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    user_id: str = Form(...)
):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save uploaded PDF
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    text = extract_text_from_pdf(file_path)

    # Save text for Chat
    set_pdf_text(text)

    # Generate AI content
    summary = summarize_text(text)

    quiz = generate_quiz(text)
    flashcards = generate_flashcards(text)
    course = generate_course(text)
    
    # Save to Supabase
    save_pdf(
        user_id=user_id,
        filename=file.filename,
        summary=summary,
        quiz=quiz,
        flashcards=flashcards,
        course=course,
    )

    return {
        "success": True,
        "filename": file.filename,
        "summary": summary,
        "quiz": quiz,
        "flashcards": flashcards,
        "course": course,
    }