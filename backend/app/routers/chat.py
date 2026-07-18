from fastapi import APIRouter
from pydantic import BaseModel
from app.services.chat_service import ask_pdf

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

@router.post("/ask")
def ask(req: ChatRequest):

    answer = ask_pdf(req.question)

    return {
        "answer": answer
    }