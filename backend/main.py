from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.pdf import router as pdf_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_router, prefix="/pdf", tags=["PDF"])

@app.get("/")
def home():
    return {"message": "Backend is running successfully!"}