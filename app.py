from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load AI model
generator = pipeline("text-generation", model="gpt2")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/summarize", methods=["POST"])
def summarize():

    text = request.form["text"]

    if len(text) < 20:
        return jsonify({"summary": "Please enter more text."})

    prompt = "Summarize this text: " + text

    result = generator(prompt, max_length=120, num_return_sequences=1)

    summary = result[0]["generated_text"]

    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True)