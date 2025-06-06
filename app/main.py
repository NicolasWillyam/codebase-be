"""
Hà Giang Travel Chatbot API using FastAPI and Gemini
"""

import io
from typing import List

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from loguru import logger
from PIL import Image

from app.services.chatbot_service import get_response, reset_conversation

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/chat")
async def chat(
    message: str = Form(...),
):
    """
    Get a response from the chatbot based on text and image inputs.
    """
    print(f"Received message: {message}")
    return StreamingResponse(
        get_response(message=message),
        media_type="text/event-stream",
    )


@app.post("/api/reset")
async def reset():
    """
    Reset the conversation history.
    """
    reset_conversation()
    return {"status": "success", "message": "Conversation reset successfully"}
