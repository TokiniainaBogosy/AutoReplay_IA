import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """Tu es un assistant commercial professionnel et chaleureux.
Tu réponds aux messages de prospects de manière personnalisée, concise et engageante.
Ta réponse doit :
- Faire maximum 5 phrases
- Être personnalisée selon le message reçu
- Se terminer par une question ouverte ou une proposition de rendez-vous
- Rester professionnelle et courtoise
- Être en français
"""

def generate_reply (user_message: str,sender_name: str) -> str:
    "Generer une reponse IA personnalisée à un message de prospect"

    try:
        response = client.chat.completions.create(
            model = "openai/gpt-oss-120b",
            messages = [
                {"role": "system","content": SYSTEM_PROMPT},
                {"role": "user","content": f"message de {sender_name}: \n\n{user_message}"}
            ],
            temperature=0.7,
            max_tokens=300,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Erreur lors de la génération : {str(e)}"
