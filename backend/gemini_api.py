import google.generativeai as genai
from dotenv import load_dotenv
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Configure Gemini API
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    raise ValueError("Please set your GEMINI_API_KEY in the .env file")

genai.configure(api_key=api_key)

app = FastAPI(title="Prompt Enhancement API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    text: str

class PromptResponse(BaseModel):
    response: str

def get_fallback_response(user_input):
    """Provide a fallback response if Gemini fails."""
    return f"Here's a prompt about {user_input}: [Your prompt will be generated here]"

def get_ai_response(user_input):
    """Get response from Gemini."""
    try:
        logger.info(f"Received input: {user_input}")
        
        # Initialize the model
        model = genai.GenerativeModel('gemini-1.5-flash')
        logger.info("Model initialized successfully")
        
        # Create a focused prompt with formatting instructions
        prompt = f"""Create a single, concise, and more detailed prompt for this user query: {user_input}

Requirements:
1. Create ONE clear, specific prompt
2. Make it more detailed than the original query
3. Include key aspects to consider
4. Keep it under 2-3 lines
5. Focus on getting a comprehensive answer

Example format:
Original: "Tell me about Python"
Enhanced: "Explain Python programming language, its key features, and common applications in software development"

Original: "What is machine learning?"
Enhanced: "Describe machine learning, its core concepts, and real-world applications in modern technology" """
        
        logger.info(f"Generated prompt: {prompt}")
        
        # Generate response with retry logic
        max_retries = 2
        for attempt in range(max_retries):
            try:
                logger.info(f"Attempt {attempt + 1} of {max_retries}")
                response = model.generate_content(prompt)
                
                if response and response.text:
                    logger.info(f"Raw response: {response.text}")
                    cleaned_response = response.text.strip()
                    logger.info(f"Cleaned response: {cleaned_response}")
                    return cleaned_response
                else:
                    logger.warning(f"Empty response received on attempt {attempt + 1}")
                    
            except Exception as e:
                logger.error(f"Error on attempt {attempt + 1}: {str(e)}")
                if attempt == max_retries - 1:
                    logger.warning("Using fallback response")
                    return get_fallback_response(user_input)
                logger.warning(f"Retrying... (Attempt {attempt + 1} failed)")
                continue
        
        logger.warning("Using fallback response after all retries")
        return get_fallback_response(user_input)
        
    except Exception as e:
        logger.error(f"Error in Gemini API: {str(e)}")
        logger.warning("Using fallback response due to error")
        return get_fallback_response(user_input)

@app.post("/enhance", response_model=PromptResponse)
async def enhance_prompt_endpoint(request: PromptRequest):
    try:
        logger.info(f"Received request with text: {request.text}")
        
        if not request.text or not request.text.strip():
            logger.warning("Empty prompt provided")
            raise HTTPException(status_code=400, detail="Empty prompt provided")
            
        response = get_ai_response(request.text)
        
        if not response:
            logger.error("Empty response from API")
            raise HTTPException(status_code=500, detail="Empty response from API")
            
        logger.info(f"Successfully generated response: {response}")
        return PromptResponse(response=response)
        
    except HTTPException as he:
        logger.error(f"HTTP Exception: {str(he)}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        fallback = get_fallback_response(request.text)
        return PromptResponse(response=fallback)

if __name__ == "__main__":
    logger.info("Starting Gemini API server...")
    logger.info(f"API Key status: {'Configured' if api_key else 'Not configured'}")
    uvicorn.run(app, host="0.0.0.0", port=8001) 