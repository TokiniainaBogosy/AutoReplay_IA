import enum
from datetime import datetime
from sqlalchemy import String,Text,DateTime,func,Enum
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

class LeadStatus(str, enum.Enum):
    """Statuts possibles d'un lead."""
    NOUVEAU = "nouveau"
    REPONDU = "repondu"
    CONVERTI = "converti"
    ARCHIVE = "archive" 

class Lead(Base):
    """Représente un lead dans la base de données."""
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    ai_reply : Mapped[str] = mapped_column(Text, nullable=True)
    status : Mapped[LeadStatus] = mapped_column(Enum(LeadStatus), default=LeadStatus.NOUVEAU, nullable=False,server_default=LeadStatus.NOUVEAU.value)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self):
        return f"<Lead(id={self.id}, name={self.name}, status={self.status.value})>"