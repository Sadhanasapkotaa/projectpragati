import hmac
import hashlib
import base64

def generate_signature(secret_key: str, message: str) -> str:
    key = secret_key.encode('utf-8')
    message = message.encode('utf-8')
    hmac_digest = hmac.new(key, message, hashlib.sha256).digest()
    return base64.b64encode(hmac_digest).decode('utf-8')