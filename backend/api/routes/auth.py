from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from jose import jwt, JWTError
from slowapi import Limiter
from slowapi.util import get_remote_address
import psycopg2

from api.core.security import (
    get_password_hash, verify_password, create_access_token,
    ALGORITHM, _get_secret_key
)
from api.db.database import get_db_connection

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class SignupRequest(BaseModel):
    name: str
    company: str
    email: EmailStr
    password: str


@router.post("/signup")
@limiter.limit("5/minute")
def signup(request: Request, req: SignupRequest):
    if len(req.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE email = %s", (req.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(req.password)
    try:
        cursor.execute(
            "INSERT INTO users (email, name, company, hashed_password) VALUES (%s, %s, %s, %s) RETURNING id",
            (req.email, req.name, req.company, hashed_password)
        )
        user_id = cursor.fetchone()["id"]
        conn.commit()
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

    conn.close()

    token = create_access_token(subject=req.email)
    return {
        "message": "Account created successfully",
        "token": token,
        "user": {"id": user_id, "name": req.name, "email": req.email, "company": req.company}
    }


@router.post("/login")
@limiter.limit("10/minute")
def login(request: Request, req: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (req.email,))
    user = cursor.fetchone()
    conn.close()

    if not user or not verify_password(req.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(subject=user["email"])
    return {
        "token": token,
        "user": {"id": user["id"], "name": user["name"], "email": user["email"], "company": user["company"]}
    }


def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """JWT dependency — inject this into any protected route."""
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        secret = _get_secret_key()
        payload = jwt.decode(token, secret, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, email, name, company FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    conn.close()

    if user is None:
        raise credentials_exception

    return {"id": user["id"], "name": user["name"], "email": user["email"], "company": user["company"]}


@router.get("/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
