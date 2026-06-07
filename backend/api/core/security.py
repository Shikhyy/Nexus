from datetime import datetime, timedelta, timezone
from typing import Any, Union
from jose import jwt
import bcrypt

# Security Constants — SECRET_KEY must be set in .env
def _get_secret_key() -> str:
    from config import settings
    key = settings.secret_key
    if not key:
        raise RuntimeError("SECRET_KEY is not set in environment. Add it to your .env file.")
    return key

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def create_access_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:
    secret = _get_secret_key()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {"exp": expire, "sub": str(subject)}
    return jwt.encode(to_encode, secret, algorithm=ALGORITHM)
