# backend/schemas.py
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from models import LeadStatus

# --- Entrée : création d'un lead ---
class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=5)

# --- Sortie : lead complet ---
class LeadResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    ai_reply: str
    status: LeadStatus
    created_at: datetime

    model_config = {"from_attributes": True}  # Permet de lire depuis l'ORM

# --- Mise à jour du statut ---
class LeadStatusUpdate(BaseModel):
    status: LeadStatus