from flask import Flask, request, jsonify
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch
import os
from dotenv import load_dotenv
from flask_cors import CORS
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

try:
    # Load model and tokenizer from Hugging Face or custom directory
    model_dir = os.getenv("MODEL_DIR", "./epoch-2")  # Set this to your actual model directory
    logger.info(f"Loading model from {model_dir}")
    
    tokenizer = AutoTokenizer.from_pretrained(model_dir, use_fast=False)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_dir)

    # Move the model to GPU if available for faster inference
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    logger.info(f"Using device: {device}")
    
    model.to(device)
    model.eval()
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    raise

@app.route('/generate', methods=['POST'])
def generate_prompt():
    try:
        data = request.get_json()  # Extract user input from the request
        input_text = data.get('prompt')

        # Check for empty input
        if not input_text:
            return jsonify({'error': 'No prompt provided'}), 400

        # Preprocess input: Strip extra spaces and ensure it's a valid input
        input_text = input_text.strip()
        logger.info(f"Processing input: {input_text}")

        # Tokenize and process the input
        inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True, max_length=128)

        # Move input tensors to the same device as the model
        inputs = {key: value.to(device) for key, value in inputs.items()}

        # Ensure the model does not use gradients during inference
        with torch.no_grad():
            outputs = model.generate(
                inputs['input_ids'],
                max_length=128,  # Increased max_length
                num_beams=5,     # Beam search for better results
                early_stopping=True,
                no_repeat_ngram_size=2  # Prevent repeated n-grams
            )

        prediction = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()
        logger.info(f"Generated response: {prediction}")

        # Return the response in the format expected by the frontend
        return jsonify({
            'response': prediction,
            'output': prediction  # Adding both formats for compatibility
        })

    except Exception as e:
        # Log the error and return a generic error message
        logger.error(f"Error during prompt generation: {str(e)}")
        return jsonify({'error': f'Error during prompt generation: {str(e)}'}), 500

if __name__ == "__main__":
    logger.info("Starting ML Model server...")
    app.run(host='0.0.0.0', port=5000, debug=False)



