import asyncio
from typing import AsyncGenerator, List, Optional

import google.generativeai as genai
from loguru import logger
from PIL import Image


class GeminiHaGiangChatbot:
    """
    A class to provide intelligent responses about Hà Giang travel using Google's Gemini API.
    """

    def __init__(
        self,
        model_name: str = "gemini-2.0-flash",
        api_key: str = "AIzaSyCfJQx24s-A9hLO9uH3dCn2IWlV4j3W--0",
        system_prompt: str = None,
    ):
        """
        Initialize the Hà Giang chatbot with Gemini API.

        Args:
            model (str): The Gemini model to use
            api_key (str): The Gemini API key
            system_prompt (str): Optional system prompt to provide context
        """
        self.api_key = api_key

        if not self.api_key:
            raise ValueError(
                "Gemini API key is required. Please provide it as an argument or set GEMINI_API_KEY environment variable."
            )

        # Configure the Gemini API
        genai.configure(api_key=self.api_key)

        # Default system prompt if none provided
        if system_prompt is None:
            system_prompt = """
            You are a helpful travel assistant specialized in Hà Giang province, Vietnam. 
            Your role is to provide detailed, accurate, and engaging information about Hà Giang's 
            attractions, culture, local cuisine, transportation, accommodation options, best times to visit,
            and suggested itineraries. Keep your responses focused on Hà Giang tourism."""

        # Set up the generative model with the system prompt
        generation_config = {
            "temperature": 1,
            "max_output_tokens": 2048,
        }

        safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
        ]

        # Initialize the chat model with history
        self.chat = genai.GenerativeModel(
            model_name,
            generation_config=generation_config,
            safety_settings=safety_settings,
        ).start_chat(history=[{"role": "user", "parts": [system_prompt]}])

    async def get_travel_response(
        self,
        prompt: str,
    ) -> AsyncGenerator[str, None]:
        """
        Generate a response about Hà Giang travel based on the provided prompt and optional images.

        Args:
            prompt (str): User query about Hà Giang travel
            images (List[Image.Image], optional): A list of images to include in the request
            conversation_id (str, optional): ID to maintain conversation context

        Returns:
            str: The generated response about Hà Giang travel
        """
        try:
            # Enhance the prompt to focus on Hà Giang travel
            enhanced_prompt = f"**Answer in Vietnamese** the following query about traveling in Hà Giang, Vietnam : {prompt}"

            content = [enhanced_prompt]
            response = self.chat.send_message(content, stream=True)
            for chunk in response:
                if chunk.parts:
                    for part in chunk.parts:
                        if hasattr(part, "text") and part.text:
                            logger.debug(f"Streaming chunk: {part.text}")
                            yield part.text  # Yield chỉ phần text
                            await asyncio.sleep(0.01)  # Cho phép tác vụ khác chạy

        except Exception as e:
            error_message = f"Error calling Gemini API for streaming: {str(e)}"
            logger.error(error_message)
            yield f"[LỖI_STREAM]: {error_message}"  # Yield lỗi như một phần của stream

    def reset_chat(self, system_prompt: str = None) -> None:
        """
        Reset the chat history but maintain the system prompt.
        """
        if system_prompt is None:
            system_prompt = """
            You are a helpful travel assistant specialized in Hà Giang province, Vietnam. 
            Your role is to provide detailed, accurate, and engaging information about Hà Giang's 
            attractions, culture, local cuisine, transportation, accommodation options, best times to visit,
            and suggested itineraries. Keep your responses focused on Hà Giang tourism."""

        generation_config = {
            "temperature": 1,
        }

        safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
        ]

        self.chat = genai.GenerativeModel(
            self.chat.model_name,
            generation_config=generation_config,
            safety_settings=safety_settings,
        ).start_chat(history=[{"role": "user", "parts": [system_prompt]}])
        logger.info("Chat history reset successfully.")
