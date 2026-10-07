from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel,EmailStr
from ai_service import generate_reply

app = FastAPI(
    title="AutoReplay IA",
    description="API d'automatisation de réponses clients par IA",
    version="1.0.0",
)

# CORS pour autoriser le frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schémas
class LeadRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

class LeadResponse(BaseModel):
    email: str
    message: str
    ai_reply: str

# Routes
@app.get("/")
def root():
    return {"status": "ok", "message": "AutoReply AI API is running 🚀"}

@app.post("/generate", response_model=LeadResponse)
def generate(data: LeadRequest):
    if not data.message.strip():
        raise HTTPException(status_code=400, detail="Le message ne peut pas être vide")

    ai_reply = generate_reply(data.message, data.name)
    
    return LeadResponse(
        name=data.name,
        email=data.email,
        message=data.message,
        ai_reply=ai_reply
    )