from fastapi import FastAPI,HTTPException,Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from ai_service import generate_reply
from database import engine,get_db,Base
from models import Lead, LeadStatus
from schemas import LeadCreate,LeadResponse,LeadStatusUpdate
from auth import verify_api_key

Base.metadata.create_all(bind=engine)

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

# --- Route publique : génération IA ---
@app.get("/")
def root():
    return {"status": "ok", "message": "AutoReply AI API is running 🚀"}

@app.post("/generate",response_model=LeadResponse,status_code = 201 )
def generate_and_save(data:LeadCreate,db:Session = Depends(get_db)):
    """Génère une réponse IA et enregistre le lead en base."""
    if not data.message.strip():
        raise HTTPException(status_code = 400,detail="Le message ne peut pas être vide")

    ai_reply = generate_reply(data.message,data.name)

    lead = Lead(
        name = data.name,
        email = data.email,
        message = data.message,
        ai_reply = ai_reply,
        status=LeadStatus.REPONDU
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead

# --- Routes protégées par clé API ---
@app.get("/leads",response_model=List[LeadResponse])
def list_leads(db:Session = Depends(get_db),_: bool = Depends(verify_api_key)):
    """Liste tous les leads (protection par clé API)."""
    return db.query(Lead).order_by(Lead.created_at.desc()).all()

@app.get("/leads/{lead_id}",response_model=LeadResponse)
def get_lead(lead_id:int,db:Session = Depends(get_db),_: bool = Depends(verify_api_key)):
    """Récupère un lead par son ID (protection par clé API)."""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404,detail="Lead non trouvé")
    return lead

@app.patch("/leads/{lead_id}/status",response_model=LeadResponse)
def update_lead_status(lead_id:int,data:LeadStatusUpdate,db:Session = Depends(get_db),_:bool = Depends(verify_api_key)):
    """Met à jour le statut d'un lead (protection par clé API)."""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404,detail="Lead non trouvé")
    
    lead.status = data.status
    db.commit()
    db.refresh(lead)
    return lead

@app.delete("/leads/{lead_id}",status_code=204)
def delete_lead(lead_id:int,db:Session = Depends(get_db),_:bool = Depends(verify_api_key)):
    """Supprime un lead (protection par clé API)."""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404,detail="Lead non trouvé")
    db.delete(lead)
    db.commit()
