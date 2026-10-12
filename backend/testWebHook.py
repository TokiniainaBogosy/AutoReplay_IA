# backend/test_webhook.py
import urllib.request
import json

url = "http://localhost:5678/webhook-test/new-lead"

data = {
    "name": "Test User",
    "email": "test@example.com",
    "message": "Bonjour, je teste mon webhook n8n"
}

req = urllib.request.Request(
    url,
    data=json.dumps(data).encode('utf-8'),
    headers={'Content-Type': 'application/json'},
    method='POST'
)

try:
    with urllib.request.urlopen(req) as response:
        print(f"✅ Status: {response.status}")
        print(f"📨 Réponse: {response.read().decode()}")
except urllib.error.HTTPError as e:
    print(f"❌ Erreur HTTP {e.code}: {e.read().decode()}")
except Exception as e:
    print(f"❌ Erreur: {e}")