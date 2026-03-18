from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/summarize", methods=["POST"])
def summarize():
    text = request.form["text"]

    if len(text.strip()) == 0:
        return jsonify({"summary": "Please enter some text"})

    # Simple summarization (first 2 sentences)
    sentences = text.split(".")
    summary = ".".join(sentences[:2]).strip()

    if not summary.endswith("."):
        summary += "."

    return jsonify({"summary": summary})

if __name__ == "__main__":
    app.run(debug=True)