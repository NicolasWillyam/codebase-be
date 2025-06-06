import os
from typing import List, Optional

from dotenv import load_dotenv
from loguru import logger
from PIL import Image

from app.models.chatbot import GeminiHaGiangChatbot

load_dotenv()
# Khởi tạo chatbot
chatbot = GeminiHaGiangChatbot(
    api_key=os.getenv("GEMINI_API_KEY"),
)


async def get_response(message: str):
    try:

        async for text_chunk in chatbot.get_travel_response(
            prompt=message
        ):
            if "[LỖI_STREAM_GEMINI]:" in text_chunk:
                logger.error(f"Lỗi từ chatbot stream: {text_chunk}")
                yield f"data: {text_chunk}\n\n"
                return

            processed_chunk = text_chunk.replace("\n", "\\n")
            yield f"data: {processed_chunk}\n\n"

        yield "data: [DONE]\n\n"

    except Exception as e:
        logger.error(f"Lỗi không mong muốn trong get_response_streaming_sse: {e}")
        yield f"data: Lỗi server khi xử lý stream: {str(e)}\n\n"
        yield "data: [ERROR]\n\n"


def reset_conversation():
    chatbot.reset_chat()
    chatbot.reset_chat()
