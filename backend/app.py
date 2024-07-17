# backend/app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
from config.openai_config import OPENAI_API_KEY
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv('OPENAI_API_KEY')  # Use the environment variable

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the LLM-Powered Personal Finance Advisor API"})

@app.route('/get_advice', methods=['POST'])
def get_advice():
    data = request.get_json()
    user_input = data.get('user_input')

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=user_input,
            max_tokens=150
        )
        advice = response.choices[0].text.strip()
        return jsonify({"advice": advice})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)