from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel, EmailStr
import asyncio

router = APIRouter()

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class SignupRequest(BaseModel):
    name: str
    company: str
    email: EmailStr
    password: str

@router.post("/login")
async def login(req: LoginRequest):
    await asyncio.sleep(1.0) # Simulate DB lookup latency
    
    # Simple mock validation for hackathon
    if req.email == "test@nexus.ai" and req.password == "password":
        return {
            "token": "mock-jwt-token-12345",
            "user": {
                "name": "Alex Admin",
                "email": req.email,
                "company": "Nexus Corp"
            }
        }
    
    # Generic success for any other well-formed request during demo
    if len(req.password) >= 6:
        return {
            "token": f"mock-jwt-token-{hash(req.email)}",
            "user": {
                "name": req.email.split('@')[0].capitalize(),
                "email": req.email,
                "company": "Enterprise Inc."
            }
        }
        
    raise HTTPException(status_code=401, detail="Invalid email or password")


@router.post("/signup")
async def signup(req: SignupRequest):
    await asyncio.sleep(1.2) # Simulate DB insertion latency
    
    if len(req.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
        
    return {
        "message": "Account created successfully",
        "token": f"mock-jwt-token-{hash(req.email)}",
        "user": {
            "name": req.name,
            "email": req.email,
            "company": req.company
        }
    }
