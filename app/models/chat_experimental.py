from langchain_google_genai import ChatGoogleGenerativeAI
import os 
from dotenv import load_dotenv

load_dotenv()

llm_chat = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash", 
    temperature=0.7, 
    max_tokens=500,
    top_k=0.55
)
response = llm_chat.invoke("Hà Giang có điều gì đặc biệt ?")
print(response)

