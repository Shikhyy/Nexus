from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
import uvicorn
import requests
import threading
import time

app = FastAPI()

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred."},
    )

@app.get("/")
def read_root():
    raise HTTPException(status_code=400, detail="This is a bad request")

def run_server():
    uvicorn.run(app, host="127.0.0.1", port=8002)

threading.Thread(target=run_server, daemon=True).start()
time.sleep(2)
print(requests.get("http://127.0.0.1:8002/").text)
