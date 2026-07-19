from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.pdf import router as pdf_router
from app.routers.chat import router as chat_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://pdf-ai-learning-platform-git-main-nehil-projects.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_router, prefix="/pdf", tags=["PDF"])
app.include_router(chat_router, prefix="/chat", tags=["Chat"])

@app.get("/")
def home():
    return {"message": "Backend is running successfully!"}